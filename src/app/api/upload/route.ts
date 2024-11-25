import { v2 as cloudinary } from 'cloudinary';

console.log('cloudinary secret ', process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET)

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any)  {
    console.log('mage url called S')
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' });
  }

  try {
    const file = req.body.file;
    const result = await cloudinary.uploader.upload(file, {
      folder: "uploads",
    });

    console.log('resoult ', result);
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Upload Error:', error);
    return Response.json({ error: 'Failed to upload image' });
  }
}

// export async function GET() {
//   return Response.json({ message: 'Hello World' })
// }