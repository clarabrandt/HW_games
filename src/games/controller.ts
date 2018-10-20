import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError, BadRequestError} from 'routing-controllers'
import {Game} from './entity'


@JsonController()
export default class GameController {

  @Get('/games')
  async allGames() {
    const games = await Game.find()
    return { games }
  }

  @Post('/games')
  @HttpCode(201)
  createGame(@Body() game: Game) {
    const colors=['red', 'blue', 'green', 'yellow', 'magenta'];
    game.color = colors[Math.floor(Math.random()*colors.length)]
    const defaultBoard = [
      ['o', 'o', 'o'],
      ['o', 'o', 'o'],
      ['o', 'o', 'o']
    ];
    game.board = defaultBoard;
 
    return game.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body({validate: true}) update: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    
    const currentBoard = game.board
    const nextBoard = update.board;

    if(moves(currentBoard, nextBoard) === 0){
      throw new BadRequestError('You should make one move')
    }else if(moves(currentBoard, nextBoard) === 1){
      return Game.merge(game, update).save()
    } else {
      throw new BadRequestError('You can only make one move')
    }
  }

  @Get('/games/:id')
  async getGame(
    @Param('id') id: number
    ): Promise< Game | undefined> {
    return await Game.findOne(id)
    }
}

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length