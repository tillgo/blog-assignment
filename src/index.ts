import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'

dotenv.config()

const app = express()
const hbs = create({
    defaultLayout: 'main',
})

// expose css as static files
app.use(express.static('public'))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.get('/', (req, res) => {
    res.render('home')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[server]: Server running on port ${port}`)
})
