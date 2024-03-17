import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Duy Quan",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Anh Thu",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Duc Viet",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Ngan Truc",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Nhat Minh",
            "role": "INTERN"
        }
    ]

    findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
        if(role) {
            return this.users.filter(u => u.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(u => u.id === id)
        return user
    }

    create(user: {name: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: {name?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        this.users = this.users.map(u => {
            if(u.id === id)
                return {...u, ...updatedUser}
            return u
        })
        
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(u => u.id != id)

        return removedUser
    }

}
