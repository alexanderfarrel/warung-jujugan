import { deleteImage, uploadImage } from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";

  try {
    await verifyToken(token, true);
    const request: any = await req.formData();
    const file = request.get("image");
    const name = request.get("name");
    const res: any = await uploadImage(name, file);
    return new NextResponse(JSON.stringify({ ...res, status: true }));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ status: false }));
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";

  try {
    await verifyToken(token, true);
    const fileName = req.nextUrl.searchParams.get("fileName");
    if (fileName) {
      const res: any = await deleteImage(fileName);
      return new NextResponse(JSON.stringify({ ...res, status: true }));
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ status: false }));
  }
}
