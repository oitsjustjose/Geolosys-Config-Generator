import bcrypt from 'bcrypt'
import { Document, model, Schema, Types } from 'mongoose'

const UserSchema = new Schema({
    username: String,
    password: String,
    configs: [{
        type: String
    }]
})

UserSchema.methods.generateHash = function (password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

UserSchema.methods.validPassword = function (password: string) {
    return bcrypt.compareSync(password, String(this.password))
}

UserSchema.methods.changePassword = function (password: string, newPassword: string) {
    if (bcrypt.compareSync(password, this.password)) {
        this.password = newPassword
    }
}

export type UserModel = Document & {
    username: string,
    password: string,
    configs: Array<String>,
    generateHash: Function,
    validPassword: Function,
    changePassword: Function
}

export default model<UserModel>('users', UserSchema, 'users')