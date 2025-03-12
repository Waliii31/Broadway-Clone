import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUD_NAME, // Use environment variable
      api_key: process.env.API_KEY, // Use environment variable
      api_secret: process.env.API_SECRET, // Use environment variable
    });
  },
};