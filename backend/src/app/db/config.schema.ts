import { Document, model, Schema, Types } from 'mongoose'
import shortid from 'shortid'

const ConfigSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: {
        type: String,
        default: "Unnamed"
    },
    json: Object,
}, {
    timestamps: true
})

export type ConfigModel = Document & {
    _id: string
    name: string
    json: object
    createdAt: Date
    updatedAt: Date
}

export default model<ConfigModel>('configs', ConfigSchema, 'configs')