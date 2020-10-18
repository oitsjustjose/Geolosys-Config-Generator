import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { loginPostHandler } from './app/controllers/loginPostHandler'
import { registerPostHandler } from './app/controllers/registerPostHandler'
import { configGetHandler, configGetSpecificHandler } from './app/controllers/configGetHandler'
import { configPutHandler } from './app/controllers/configPutHandler'
import { UserModel } from './app/db/user.schema'
import { auth } from './app/middleware'

interface AuthReq {
    user: UserModel | null
}

declare global {
    namespace Express {
        interface Request extends AuthReq { }
    }
}

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/api/configs', auth, configGetHandler)
app.put('/api/configs', auth, configPutHandler)
app.get('/api/configs/:id', configGetSpecificHandler)
app.post('/api/users/login', loginPostHandler)
app.post('/api/users/register', registerPostHandler)

export default app