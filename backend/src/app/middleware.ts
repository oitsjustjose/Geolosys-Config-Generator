import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import UserSchema from './db/user.schema'
import moment from 'moment'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token')

    if (!token) {
        return res.status(403).send('Access Denied')
    }

    try {
        const { _id, expiresAt } = (jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string, expiresAt: string })

        if (moment(moment()).isAfter(expiresAt)) {
            return res.status(400).send('Token expired')
        }

        const user = await UserSchema.findById(_id)

        if (!user) {
            return res.status(404).send("User not found")
        } else {
            req.user = user
        }

        next()
    } catch (err) {
        return res.status(400).send(`Invalid Token: ${err}`)
    }
}