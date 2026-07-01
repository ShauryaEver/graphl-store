import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    console.log("Upload route hit!");
    console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY);

    const { image } = await request.json();
    console.log("Image received, length:", image?.length);

    const result = await cloudinary.uploader.upload(image, {
      folder: "graphl-designs",
      resource_type: "image",
    });

    console.log("Upload success:", result.secure_url);

    return Response.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}