import {
  orderConfirmRequest,
  orderDeleteRequest,
  orderRejectedRequest,
} from "@/services/ordersStatusRequest/orderCancelRequest";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();
    if (id != null && body.request != null) {
      const result = await orderConfirmRequest(id, body.request);
      return new NextResponse(JSON.stringify({ status: result }));
    }
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
    const body = await req.json();
    if (body.data != null) {
      const result = await orderRejectedRequest(body.data);
      return NextResponse.json({ status: result });
    }
  } catch {
    return NextResponse.json({ status: false, message: "Unauthorized" });
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();
    if (id != null && body.request != null) {
      const result = await orderDeleteRequest(id, body.request);
      return NextResponse.json({ status: result });
    }
  } catch (error) {
    return NextResponse.json({ status: false, message: "Unauthorized" });
  }
}
