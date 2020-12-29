import { Request, Response } from 'express'
import ConfigSchema from '../db/config.schema'

export const configPatchHandler = async (req: Request, res: Response) => {
    try {
        const config = await ConfigSchema.findById(req.params.id)

        if (!req.user?.configs.includes(config._id)) {
            return res.status(403).send()
        }

        config.json = req.body.json
        config.name = req.body.name

        await config.save()

        return res.status(200).send(config._id)
    } catch (ex) {
        console.error(ex)
        return res.status(500).send({ error: ex })
    }
}