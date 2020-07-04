import { Application } from "express"
import { PassportStatic } from "passport"
import UserDB from '../models/user.model'

export const init = (app: Application, passport: PassportStatic) => {
    app.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/')
        } else {
            if (req.query.origin) {
                req.session!.returnTo = req.query.origin
            }
            res.render('login')
        }
    })

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/login')
    })

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login?error'
    }), async (req, res) => {
        /* Don't keep the pass reset id if the user can log in... */
        if (req.session?.returnTo) {
            res.redirect(req.session.returnTo)
        } else {
            res.redirect('/')
        }
    })

    app.post('/register', async (req, res) => {
        const exUser = await UserDB.findOne({ 'email': req.body.email })
        if (exUser) {
            res.redirect('/register?exists')
        } else {
            let user = new UserDB()
            user.username = req.body.username
            user.password = user.generateHash(req.body.password)
            user.configs = Array()
            await user.save()
        }
    })
}