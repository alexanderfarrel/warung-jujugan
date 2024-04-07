import { retrieveDataById } from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "null";
  try {
    await verifyToken(token);
    const { searchParams } = new URL(req.url);
    const userId: string | null = searchParams.get("id");
    if (userId === null) {
      return NextResponse.json({ status: false });
    }
    const data = await retrieveDataById("users", userId);
    return NextResponse.json({ status: true, data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false });
  }
}
