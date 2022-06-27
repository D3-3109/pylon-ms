import { connect } from "mongoose";
import BannedUserModel from "../interfaces/banned_user";

export async function connectToBanDatabase(): Promise<void> {
    await connect(process.env.MONGODB_CONN_STRING);
}



// FALSE: operation did nothing
// TRUE: did something
export async function UpdateUserBanStatus(banned: boolean, oid?: number, ip?: string): Promise<boolean> {
    return new Promise<boolean>(async (ok, fail) => {
        try {
            const query = {};
            if (oid !== null) {
                query['oid'] = oid;
            }
            if (ip) {
                query['ip'] = ip;
            }
    
            const bannedUser = await BannedUserModel.findOne(query);
    
            if(bannedUser) {
                if(!banned) {
                    await bannedUser.remove();
                    ok(true);
                    return;
                } else {
                    ok(false);
                    return;
                }
            } else {
                if(banned) {
                    await BannedUserModel.create({
                        oid,
                        ip
                    });
                    ok(true);
                } else {
                    ok(false);
                }
            }
        } catch(err) {
            fail(err);
        }
    });
}

export async function IsUserBanned(oid?: number, ip?: string): Promise<boolean> {
    return new Promise<boolean>(async (ok, fail) => {
        try {
            const query = {};
            if (oid) {
                query['oid'] = oid;
            }
            if (ip) {
                query['ip'] = ip;
            }
    
            const bannedUser = await BannedUserModel.findOne(query);
    
            ok(bannedUser ? true : false);
        } catch(err) {
            fail(err);
        }
    });
}
