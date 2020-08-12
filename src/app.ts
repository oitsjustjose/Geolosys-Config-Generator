import { json as bpjson, urlencoded } from 'body-parser'
import session from 'cookie-session'
import { config as InitEnv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import path from 'path'
import UserDB, { UserModel } from './app/models/user.model'
import * as Routes from './app/routes/routes'
import * as Logging from './app/utils/logs'

InitEnv()

declare global {
    namespace Express {
        interface User extends UserModel { }
    }
}

const app = express()

app.set('json spaces', 2)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './app/views'))

app.use(express.static(__dirname + '/public'))
app.use(bpjson())
app.use(urlencoded({
    extended: true
}))
app.use(session({
    secret: '16ed0626a1d2b5-kc6zy6e8',
}))

mongoose.connect(`mongodb://${process.env.MONGO_URI}/GeolosysConfigGen`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connected')
}).catch((ex) => {
    console.log('DB Connection Failed')
    console.error(ex)
    process.exit(1)
})

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy((username: string, password: string, callback: Function) => {
    UserDB.findOne({
        'username': username
    }, (err, user) => {
        if (err) {
            return callback(err)
        } else if (!user) {
            return callback(null, false)
        } else if (!user.validPassword(password)) {
            return callback(null, false)
        }
        return callback(null, user)
    })
}))

passport.serializeUser((user: UserModel, callback: Function) => {
    callback(null, user.id)
})

passport.deserializeUser((id: mongoose.Types.ObjectId, callback: Function) => {
    UserDB.findById(id, (err, user) => {
        callback(err, user)
    })
})

Routes.init(app, passport)

if (app.get('env') == 'production') {
    Logging.init(`${__dirname}/..`)
}

const port = process.env.PORT

app.listen(port, () => {
    process.stdout.write(`Listening on port ${port}\n`)
})
