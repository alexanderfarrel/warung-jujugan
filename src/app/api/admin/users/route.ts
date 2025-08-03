import {
  deleteById,
  deleteImage,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const users = await retrieveData("users");
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return NextResponse.json(users);
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const body = await req.json();
    const res = await updateData("users", body.id, body);
    if (res) {
      return NextResponse.json(
        {
          status: res.status,
          message: res.message,
        },
        { status: res?.statusCode }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "Something went wrong",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "access denied",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";

  try {
    await verifyToken(token, true);
    const { id } = await req.json();
    const user: any = await retrieveDataById("users", id);
    if (user?.imageName?.length > 0) {
      await deleteImage(user.imageName);
    }
    const res = await deleteById("users", id);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json(
      {
        status: false,
        message: "access denied",
      },
      { status: 500 }
    );
  }
}
