"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let GameController = class GameController {
    async allGames() {
        const games = await entity_1.Game.find();
        return { games };
    }
    createGame(game) {
        const colors = ['red', 'blue', 'green', 'yellow', 'magenta'];
        game.color = colors[Math.floor(Math.random() * colors.length)];
        const defaultBoard = [
            ['o', 'o', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', 'o']
        ];
        game.board = defaultBoard;
        return game.save();
    }
    async updateGame(id, update) {
        const game = await entity_1.Game.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        const currentBoard = game.board;
        const nextBoard = update.board;
        console.log('currentBoard -> ', currentBoard);
        console.log('nextBoard -> ', nextBoard);
        if (nextBoard) {
            if (moves(currentBoard, nextBoard) < 1) {
                throw new routing_controllers_1.BadRequestError('You should make one move');
            }
            if (moves(currentBoard, nextBoard) > 1) {
                throw new routing_controllers_1.BadRequestError('You can only make one move');
            }
        }
        return entity_1.Game.update(game, update);
    }
    async getGame(id) {
        return await entity_1.Game.findOne(id);
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Game]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    routing_controllers_1.Get('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
const moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
//# sourceMappingURL=controller.js.map