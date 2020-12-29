import { Request, Response } from 'express'
import moment from 'moment'
import ConfigSchema from '../db/config.schema'

export const configGetHandler = async (req: Request, res: Response) => {
    try {
        const configs = []
        const newUserConfigs = []

        for (const _id of req.user?.configs) {
            const conf = await ConfigSchema.findById(_id)
            if (conf) {
                configs.push({ _id, name: conf.name, upd: conf.updatedAt })
                newUserConfigs.push(_id)
            }
        }
        // Update any deleted ones, this would be server-side but still.
        if (req.user && req.user.configs.length != newUserConfigs.length) {
            req.user.configs = newUserConfigs
            await req.user.save()
        }

        // Sort the configs by updated date
        const sorted = configs.sort((a, b) => {
            const dA = moment(a.upd)
            const dB = moment(b.upd)

            if (dA.diff(dB) === 0) {
                return 0
            }
            return dA.diff(dB) > 0 ? -1 : 1
        })

        return res.json(sorted)
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