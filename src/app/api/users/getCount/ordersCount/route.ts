import { checkOrderCount } from "@/services/checkDataSession/services";
import verifyToken from "@/services/verifyToken/verifyToken";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "null";
  const path = req.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  try {
    await verifyToken(token);
    const { searchParams } = new URL(req.url);
    const email: string | null = searchParams.get("email");
    if (email != null) {
      const data = await checkOrderCount(email);
      return NextResponse.json({ status: true, count: data });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false });
  }
}
