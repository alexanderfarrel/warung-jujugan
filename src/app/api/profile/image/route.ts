import { deleteImage, uploadImage } from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] ?? "";

  try {
    await verifyToken(token);
    const req: any = await request.formData();
    const file = req.get("image");
    const name = req.get("name");
    const res: any = await uploadImage(name, file);
    return new NextResponse(JSON.stringify({ ...res, status: true }));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ status: false }));
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token);

    const req: any = await request.json();
    const res: any = await deleteImage(req.oldImage);
    return new NextResponse(JSON.stringify(res), { status: res?.statusCode });
  } catch (err) {
    return new NextResponse(JSON.stringify({ status: false }));
  }
}
