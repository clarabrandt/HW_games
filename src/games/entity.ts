import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    color: string;

    @Column('json', {nullable: true})
    board: object;

}