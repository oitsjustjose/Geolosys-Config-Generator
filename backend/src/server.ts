import { config as LoadDotenv } from 'dotenv'
import app from './app'
import connectDB from './db'

if(process.env.NODE_ENV !== "production") {
    LoadDotenv()
}

connectDB()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening at http://127.0.0.1:${port}`))