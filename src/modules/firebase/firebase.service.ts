import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

const config = new ConfigService();

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.get('FIREBASE_PROJECT_ID'),
        clientEmail: config.get('FIREBASE_CLIENT_EMAIL'),
        privateKey: config.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      }),
      storageBucket: config.get('FIREBASE_STORAGE_BUCKET'),
    });
    this.storage = admin.storage();
  }

  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }

  deleteFile(fileName: string) {
    return this.storage.bucket().file(fileName).delete();
  }

  deleteFileFromURL(imageURL: string) {
    const fileName = imageURL.split('/').pop().split('?')[0];
    return this.deleteFile(fileName);
  }
}
