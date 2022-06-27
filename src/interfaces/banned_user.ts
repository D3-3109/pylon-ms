import { Schema, model } from 'mongoose';


interface BannedUser {
    oid?: number,
    ip?: string,
}

const BannedUserSchema = new Schema({
    oid: Number,
    ip: String
});

const BannedUserModel = model<BannedUser>('BannedUser', BannedUserSchema);

export default BannedUserModel;
