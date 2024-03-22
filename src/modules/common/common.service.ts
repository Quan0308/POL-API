import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class CommonService {
    constructor(
        private readonly firebaseService: FirebaseService
    ) {}

    async uploadImage(file): Promise<string> {
        const storage = this.firebaseService.getStorageInstance();
        const bucket = storage.bucket();

        const fileName = `${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        return new Promise((resolve, reject) => {
            blobStream.on('finish', () => {
                const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                resolve(url);
            });

            blobStream.on('error', (error) => {
                reject(`Unable to upload image, something went wrong: ${error}`);
            });

            blobStream.end(file.buffer);
        });
    }
}