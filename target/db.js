"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("./games/entity");
exports.default = () => typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/games',
    entities: [
        entity_1.Game
    ],
    synchronize: true,
    logging: true,
})
    .then(_ => console.log('Connected to Postgres with TypeORM'));
//# sourceMappingURL=db.js.map