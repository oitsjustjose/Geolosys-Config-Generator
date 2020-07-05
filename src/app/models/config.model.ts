import { Document, model, Schema, Types } from 'mongoose'
import shortid from 'shortid'

const ConfigSchema = new Schema({
    json: Object,
    shortid: {
        type: String,
        unique: true,
        default: shortid.generate
    }
})

export type ConfigModel = Document & {
    json: object,
    shortid: string
}

export default model<ConfigModel>('configs', ConfigSchema, 'configs')