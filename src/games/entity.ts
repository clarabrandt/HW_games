import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import {IsIn} from 'class-validator';

@Entity()
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;
    
    @Column('text')
    @IsIn(['red', 'blue', 'green', 'yellow', 'magenta'])
    color: string;

    @Column('json', {nullable: true})
    board: object;

}