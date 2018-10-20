import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity';
// import {IsIn} from 'class-validator';

@Entity()
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;
    
    // @IsIn(['red', 'blue', 'green', 'yellow', 'magenta'])
    @Column('text')
    color: string;

    @Column('json', {nullable: true})
    board: object;

}