import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute'
import articlesRoute from './routes/articlesRoute'
import { authenticate } from './middleware/authenticate'
import cookieParser from 'cookie-parser'
import { activeLink } from './middleware/activeLink'

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
        styleActive: (activePath: string, linkPath: string, style: string) => {
            return activePath === linkPath ? style : ''
        },
    },
})

// connect to DB
mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log('[server]: Connected to MongoDB')
})

// expose css as static files
app.use(express.static('public'))
// setup handlebars template engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(authenticate)
app.use(activeLink)

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/about', (req, res) => {
    res.render('home')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/sign-up', (req, res) => {
    res.render('sign-up')
})
app.use('/auth', authRoute)
app.use('/articles', articlesRoute)

// start http server on specified port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[server]: Server running on port ${port}`)
})
