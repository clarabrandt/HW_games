import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError} from 'routing-controllers'
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
  createGame(@Body({validate: true}) game: Game) {
    const colors=['red', 'blue', 'green', 'yellow', 'magenta'];
    game.color = colors[Math.floor(Math.random()*colors.length)]
    return game.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body({validate: true}) update: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    
    return Game.merge(game, update).save()
  }
}