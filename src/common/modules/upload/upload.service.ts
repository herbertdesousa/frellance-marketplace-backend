import { Injectable } from '@nestjs/common';

import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

import * as firebaseStorage from 'firebase/storage';
import firebaseConfig from 'src/config/firebase-config';

interface UploadFileRequest {
  picture: {
    localpath: string;
    uploadpath: string;
    mimetype: string;
  };
  resize?: {
    height: number;
    width: number;
  };
}

function getPathStorageFromUrl(url: string) {
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/`;

  let imagePath: string = url.replace(baseUrl, '');

  const indexOfEndPath = imagePath.indexOf('?');

  imagePath = imagePath.substring(0, indexOfEndPath);

  imagePath = imagePath.replace('%2F', '/');

  return imagePath;
}

@Injectable()
export class UploadService {
  async uploadPicture({ picture, resize }: UploadFileRequest): Promise<string> {
    // read file from temp
    const buffer = fs.readFileSync(picture.localpath);

    // process image
    const img = sharp(buffer);
    if (resize) img.resize(resize.width, resize.height);
    await img.webp({ quality: 80 }).toFile(picture.localpath);

    const processedBuffer = fs.readFileSync(picture.localpath);

    // upload to firebase
    const imageRef = firebaseStorage.ref(
      firebaseConfig.client.storage,
      picture.uploadpath,
    );
    const snapshot = await firebaseStorage.uploadBytes(
      imageRef,
      processedBuffer,
      { contentType: picture.mimetype },
    );

    // unlink temp
    // fs.unlinkSync(path.resolve('temp', picture.filename));

    return await firebaseStorage.getDownloadURL(snapshot.ref);
  }

  async deletePicture(url: string) {
    const imageRef = firebaseStorage.ref(
      firebaseConfig.client.storage,
      getPathStorageFromUrl(url),
    );
    await firebaseStorage.deleteObject(imageRef);
  }
}
