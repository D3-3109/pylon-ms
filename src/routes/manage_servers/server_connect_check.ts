import rSrcClient from '../../utils/game_client_class.js';

export function CheckGameServerConnection(ipAddress: string, gamePort: number, encryptionKey: string): Promise<boolean> {
    return new Promise<boolean>((ok, fail) => {

        try {
            const client = new rSrcClient({
                encryptionKey,
                ip: ipAddress,
                port: gamePort,
                uid: 1000000001337n,
            });
    
            client.on("challenge", async (challenge) => {
                ok(true);
            });

            client.connect();
    
            setTimeout(() => ok(false), (Number.parseFloat(process.env.GS_CONNECT_CHECK_TIMEOUT)) * 1000);
        } catch(err) {
            fail(err);
            // this shouldn't happen but I'll cover it anyways
        }
        
    });

}