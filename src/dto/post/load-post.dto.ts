import { Post } from "src/entities/post.entity"
export class LoadPost {
    authorId: number
    authorUsername: string
    postId: number
    caption: string
    imageUrl: string
    countComments: number

    constructor( data: Partial<Post> ) {
        Object.assign(this, data);
    }
}