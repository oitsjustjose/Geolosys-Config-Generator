import { Request, Response } from 'express'
import ConfigSchema from '../db/config.schema'

export const configPutHandler = async (req: Request, res: Response) => {
    try {
        const config = new ConfigSchema()
        config.json = req.body.json
        await config.save()

        req.user?.configs.push(config._id)
        await req.user.save()

        return res.status(200).send(config)
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({ error: ex })
    }
}