import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from '../services/userService/users.service';
import { CreateUserDto } from '../model/users/create-user.dto'
import { UpdateUserDto } from '../model/users/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get() //GET /users or /users?role=value&age=18
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    @Get('interns') //GET /users/interns
    findAllInterns() {
        return []
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe: This will validate the param that it is a number or not.
        return this.userService.findOne(id)
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) newUser: CreateUserDto) {
        return this.userService.create(newUser)
    }

    @Patch(':id') //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
