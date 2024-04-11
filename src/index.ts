import 'express-async-errors' // This line is required to handle async errors in Express
import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute'
import articlesPages from './routes/articlesPages'
import { authenticate } from './middleware/authenticate'
import cookieParser from 'cookie-parser'
import { activeLink } from './middleware/activeLink'
import { dateToXMagnitudeAgo } from './lib/dateUtils'
import { eq, or, styleActive, youAndAuthorIndicator } from './lib/hbsHelpers'
import { errorHandler } from './middleware/errorHandler'
import { guardPage } from './middleware/guardPage'
import articlesRoute from './routes/articlesRoute'
import commentsRoute from './routes/commentsRoute'

// extend express Request interface to include custom properties
declare module 'express' {
    // @ts-ignore
    interface Request extends express.Request {
        userId?: string
        isAdmin?: boolean
    }
}

// load env variables (prod: env vars, dev: .env file)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// init express app
const app = express()
const hbs = create({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        styleActive,
        toXMagnitudeAgo: dateToXMagnitudeAgo,
        eq,
        or,
        youAndAuthorIndicator,
        uriEscape: encodeURIComponent,
    },
})

// connect to DB
mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log('[server]: Connected to MongoDB')
})

// expose css and js as static files
app.use(express.static('public/styles'))
app.use(express.static('public/scripts'))

// setup handlebars template engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// setup middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(authenticate)
app.use(activeLink)

// setup routes
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/sign-in', (req, res) => {
    res.render('sign-in')
})
app.get('/sign-up', (req, res) => {
    res.render('sign-up')
})
app.get('/admin-panel', guardPage(true), (req, res) => {
    res.render('admin-panel')
})
app.use('/articles', articlesPages)

// setup api routes
app.use('/api/auth', authRoute)
app.use('/api/articles', articlesRoute)
app.use('/api/comments', commentsRoute)

// handle all thrown errors with middleware at the end of the chain
app.use(errorHandler)

// start http server on specified port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[server]: Server running on port ${port}`)
})
