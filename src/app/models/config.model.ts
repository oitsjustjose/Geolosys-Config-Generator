import { Document, model, Schema, Types } from 'mongoose'

const ConfigSchema = new Schema({
    json: Object,
})

export type ConfigModel = Document & {
    json: object,
}

export default model<ConfigModel>('configs', ConfigSchema, 'configs')