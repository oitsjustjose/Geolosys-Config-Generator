import { Application } from "express"
import { PassportStatic } from "passport"
import * as Auth from './auth'

export const init = (app: Application, passport: PassportStatic) => {
    app.get('/', async (req, res) => {
        res.render('home', {
            user: req.isAuthenticated && req.user ? req.user : null
        })
    })

    app.put('/', async (req, res) => {
        if (req.isAuthenticated() && req.user) {
            req.user.configs.push({
                name: req.body.name,
                conf: req.body.config
            })
        } else {
            res.status(401).send({
                error: 'Not logged in!'
            })
        }
    })

    Auth.init(app, passport)
}