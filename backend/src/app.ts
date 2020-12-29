import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { configGetHandler, configGetSpecificHandler } from './app/controllers/configGetHandler'
import { configPatchHandler } from './app/controllers/configPatchHandler'
import { configPutHandler } from './app/controllers/configPutHandler'
import { loginPostHandler } from './app/controllers/loginPostHandler'
import { registerPostHandler } from './app/controllers/registerPostHandler'
import { UserModel } from './app/db/user.schema'
import { auth, optAuth } from './app/middleware'

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

app.put('/api/configs', optAuth, configPutHandler)
app.get('/api/configs', auth, configGetHandler)
app.patch('/api/configs/:id', auth, configPatchHandler)
app.get('/api/configs/:id', configGetSpecificHandler)
app.post('/api/users/login', loginPostHandler)
app.post('/api/users/register', registerPostHandler)

export default app