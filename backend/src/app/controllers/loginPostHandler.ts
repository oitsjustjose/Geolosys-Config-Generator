import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import UserSchema, { UserModel } from '../db/user.schema'
import moment from 'moment'

export const loginPostHandler = async (req: Request, res: Response) => {
    try {
        const user: UserModel | null = await UserSchema.findOne({
            username: req.body.username
        })

        if (!user) {
            return res.status(404).send("User not found")
        }

        if (!user.validPassword(req.body.password)) {
            return res.status(404).send("Password for User was Incorrect")
        }

        const token = jwt.sign({
            _id: user._id,
            username: user.username,
            expiresAt: moment().add(1, 'day').toISOString()
        }, process.env.JWT_SECRET as string)

        return res.status(200).send(token)
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({ error: ex })
    }
}