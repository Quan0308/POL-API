import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
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
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id) //Unary plus
    }

    @Post() //POST /users
    create(@Body() user: {name: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        return this.userService.create(user)
    }

    @Patch(':id') //PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {name?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        return this.userService.update(+id, userUpdate)
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.userService.delete(+id)
    }
}
