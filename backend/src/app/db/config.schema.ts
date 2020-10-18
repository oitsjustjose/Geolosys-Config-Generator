import { Document, model, Schema, Types } from 'mongoose'
import shortid from 'shortid'

const ConfigSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    json: Object
})

export type ConfigModel = Document & {
    _id: string,
    json: object,
}

export default model<ConfigModel>('configs', ConfigSchema, 'configs')