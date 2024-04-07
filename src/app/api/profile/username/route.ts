import { retrieveDataByField, updateData } from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req: NextRequest) {
  const token: string = req.headers?.get("authorization")?.split(" ")[1] ?? "";

  try {
    await verifyToken(token); // Wait for the token verification

    const body = await req.json();
    const user: any = await retrieveDataByField("users", "email", body.email);
    const dataUser = user[0];
    if ("username" in body) {
      dataUser.username = body.username;
    }
    const res:
      | { status: boolean; message: string; statusCode: number }
      | undefined = await updateData("users", user[0].id, dataUser);

    return new NextResponse(JSON.stringify(true));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(false));
  }
}
