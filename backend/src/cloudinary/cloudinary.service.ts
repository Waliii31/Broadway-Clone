import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'your_folder_name' }, // Optional: Organize images into folders
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result) {
              resolve(result.secure_url); // Return the secure URL of the uploaded image
            } else {
              reject(new Error('Upload failed, no result returned.'));
            }
          }
        },
      );

      // Convert the file buffer to a readable stream
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      // Pipe the stream to Cloudinary
      readableStream.pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}