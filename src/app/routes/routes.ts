import { Application } from "express"
import { PassportStatic } from "passport"
import * as Auth from './auth'
import ConfigDB from '../models/config.model'


export const init = (app: Application, passport: PassportStatic) => {
    app.get('/', async (req, res) => {
        res.render('home', {
            user: req.isAuthenticated && req.user ? req.user : null
        })
    })

    app.put('/', async (req, res) => {
        try {
            const conf = new ConfigDB()
            conf.json = req.body.json
            await conf.save()

            if (req.isAuthenticated() && req.user) {
                req.user.configs.push({
                    name: req.body.name,
                    conf: conf._id
                })
            }
            res.status(200).send(conf)
        } catch (ex) {
            res.status(500).send({
                error: ex
            })
        }
    })

    app.get('/configs/:id', async (req, res) => {
        const conf = await ConfigDB.findById(req.params.id)
        if (conf) {
            res.json(conf.json)
        } else {
            res.status(404).end()
        }
    })

    Auth.init(app, passport)
}