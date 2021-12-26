export interface GameMod {
    package: string,
    version: number,
    requiredForClients: boolean,
    downloadLink?: string,
};

export const GameModSchema = {
    $id: 'GameModSchema',
    type: 'object',
    properties: {
        package: { type: 'string' },
        version: { type: 'number' },
        requiredForClients: { type: 'boolean' },
        downloadLink: { type: 'string', nullable: true }
    }
};