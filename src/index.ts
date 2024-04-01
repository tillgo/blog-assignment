import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'
import mongoose from 'mongoose'
import authRoute from './routes/authRoute'
import articlesRoute from './routes/articlesRoute'
import { authenticate } from './middleware/authenticate'
import cookieParser from 'cookie-parser'

// load env variables (prod: env vars, dev: .env file)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

// init express app
const app = express()
const hbs = create({
    defaultLayout: 'main',
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

app.get('/', authenticate, (req, res) => {
    res.render('home')
})
app.get('/login', authenticate, (req, res) => {
    res.render('login')
})
app.get('/sign-up', authenticate, (req, res) => {
    res.render('sign-up')
})
app.use('/auth', authenticate, authRoute)
app.use('/articles', authenticate, articlesRoute)

// start http server on specified port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[server]: Server running on port ${port}`)
})
