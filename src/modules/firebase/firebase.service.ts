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

  async deleteFileFromURL(imageURL: string) {
    const fileName = imageURL.split('/').pop().split('?')[0];
    const file = this.storage.bucket().file(fileName);

    const [exists] = await file.exists();
    if (exists) {
      return file.delete();
    }
    return null;
  }

  pushNotification(token: string, message: { title: string; body: string }, data?: { [key: string]: string }) {
    try {
      return admin.messaging().send({
        notification: message,
        token,
        data
      });
    } catch (error) {
      console.log(error);
      throw new Error('Unable to send notification');
    }
  }
}
