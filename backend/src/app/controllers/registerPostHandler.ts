import { Request, Response } from 'express'
import UserSchema from '../db/user.schema'
import * as jwt from 'jsonwebtoken'
import moment from 'moment'

export const registerPostHandler = async (req: Request, res: Response) => {
    try {
        const exUser = await UserSchema.findOne({
            'username': req.body.username
        })

        if (exUser) {
            return res.status(409).send("USERNAME ALREADY EXISTS")
        }

        const user = new UserSchema()
        user.username = req.body.username
        user.password = user.generateHash(req.body.password)
        user.configs = Array()
        await user.save()

        // Log the user in
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
