import { Request, Response } from 'express'
import ConfigSchema from '../db/config.schema'

export const configGetHandler = async (req: Request, res: Response) => {
    try {
        return res.json(req.user?.configs)
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({ error: ex })
    }
}

export const configGetSpecificHandler = async (req: Request, res: Response) => {
    try {
        return res.json(await ConfigSchema.findById(req.params.id))
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({ error: ex })
    }
}