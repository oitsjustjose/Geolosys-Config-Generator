import bcrypt from 'bcryptjs'
import { Document, model, Schema, Types } from 'mongoose'

export type UserModel = Document & {
    username: string,
    password: string,
    configs: string[],
    generateHash: (password: string) => string,
    validPassword: (password: string) => string,
    changePassword: (password: string, newPassword: string) => void
}

const UserSchema: Schema<UserModel> = new Schema({
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

export default model<UserModel>('users', UserSchema, 'users')