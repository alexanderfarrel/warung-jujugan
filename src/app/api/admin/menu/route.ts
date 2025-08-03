import {
  addData,
  deleteById,
  deleteImage,
  retrieveData,
  updateData,
} from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const data = await retrieveData("menu");
    return new NextResponse(JSON.stringify({ status: true, data }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: false, message: "Unauthorized" }),
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const data = await req.json();
    const res: any = await addData("menu", data);
    return new NextResponse(JSON.stringify(res), { status: res.statusCode });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ status: false, message: "Unauthorized" }),
      { status: 401 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const data = await req.json();
    const res: any = await updateData("menu", data.id, data);
    return new NextResponse(JSON.stringify(res), { status: res.statusCode });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: false, message: "Unauthorized" }),
      { status: 401 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const id = req.nextUrl.searchParams.get("id");
    const imageName = req.nextUrl.searchParams.get("imageName");
    if (id || imageName) {
      await deleteImage(imageName!);
      const result = await deleteById("menu", id);
      return new NextResponse(JSON.stringify(result), {
        status: result?.statusCode,
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: false, message: "Unauthorized" }),
      { status: 401 }
    );
  }
}
