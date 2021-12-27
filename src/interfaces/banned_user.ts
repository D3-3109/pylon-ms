import { Schema, model } from 'mongoose';


interface BannedUser {
    oid?: number,
    ipAddress?: string,
}

const BannedUserSchema = new Schema({
    oid: Number,
    ipAddress: String
});

const BannedUserModel = model<BannedUser>('BannedUser', BannedUserSchema);

export default BannedUserModel;
