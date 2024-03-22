import { Injectable, NotFoundException } from "@nestjs/common";
import { CommonService } from "../common/common.service";

@Injectable()
export class PostService {
    constructor(
        private readonly commonService: CommonService
    ) {}

    async savePost(file) {
        const imageUrl = await this.commonService.uploadImage(file);
        return imageUrl;
    }
}