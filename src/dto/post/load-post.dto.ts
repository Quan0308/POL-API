import { Post } from "src/entities/post.entity"
import { Reaction } from "src/entities/reaction.entity"
export class LoadPost {
    authorId: number
    authorUsername: string
    postId: number
    caption: string
    imageUrl: string
    reactions: Reaction[]
    countComments: number

    constructor( data: Partial<Post> ) {
        Object.assign(this, data);
    }
}