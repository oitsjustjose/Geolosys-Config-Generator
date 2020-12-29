import { Request, Response } from 'express'
import ConfigSchema from '../db/config.schema'

export const configGetHandler = async (req: Request, res: Response) => {
    try {
        const configs = []

        for (const _id of req.user?.configs) {
            const { name } = await ConfigSchema.findById(_id)
            configs.push({ _id, name })
        }

        return res.json(configs)
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