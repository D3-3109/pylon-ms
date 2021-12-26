"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModSchema = void 0;
;
exports.GameModSchema = {
    $id: 'GameModSchema',
    type: 'object',
    properties: {
        package: { type: 'string' },
        version: { type: 'number' },
        requiredForClients: { type: 'boolean' },
        downloadLink: { type: 'string', nullable: true }
    }
};
//# sourceMappingURL=GameMod.js.map