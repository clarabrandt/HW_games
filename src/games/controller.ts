import { JsonController, Get, Post, HttpCode, Body } from 'routing-controllers'
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
    return game.save()
  }

  


}