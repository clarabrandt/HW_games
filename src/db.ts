import { createConnection } from 'typeorm'
import {Game} from './games/entity'


export default () =>
  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/games',
    entities: [
      Game
    ],
    synchronize: true,
    logging: true,
   
  })
  .then(_ => console.log('Connected to Postgres with TypeORM'))