import { Document, model, Schema, Types } from 'mongoose'

const ConfigSchema = new Schema({
    json: Object,
    name: String,
})

export type ConfigModel = Document & {
    json: object,
    name: string,
}

export default model<ConfigModel>('configs', ConfigSchema, 'configs')