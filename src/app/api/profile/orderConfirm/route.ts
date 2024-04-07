import addOrderConfirm from "@/services/addData/services";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token);
    const req = await request.json();
    const res: any = await addOrderConfirm(req.id, req.menu, req?.note);
    if (res?.status) {
      return new NextResponse(
        JSON.stringify({ status: true, message: "Success" })
      );
    } else {
      return new NextResponse(
        JSON.stringify({ status: false, message: "Failed" })
      );
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ status: false, message: "Unauthorized" })
    );
  }
}
