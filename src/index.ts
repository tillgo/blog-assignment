import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'
import mongoose from 'mongoose'

// load env variables
dotenv.config()

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

app.get('/', (req, res) => {
    res.render('home')
})

// start http server on specified port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[server]: Server running on port ${port}`)
})
