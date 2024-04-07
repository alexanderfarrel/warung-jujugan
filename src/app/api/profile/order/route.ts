import { addOrder, deleteOrder } from "@/services/addData/services";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token);
    const req: any = await request.json();
    let data;
    if ("product" in req) {
      data = req.product;
    }
    const result: any = await addOrder(
      req.email,
      req.dataResult || data,
      req.update
    );
    if (result.statusCode === 204) {
      return new NextResponse(JSON.stringify({ result, status: true }));
    } else if (result.status) {
      return new NextResponse(JSON.stringify({ result, status: true }));
    } else {
      return new NextResponse(JSON.stringify({ result, status: false }));
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ status: false, message: err.message })
    );
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token);
    const req: any = await request.json();
    const result: any = await deleteOrder(req.email, req.product);
    if (result.status) {
      return new NextResponse(JSON.stringify({ result, status: true }));
    } else {
      return new NextResponse(JSON.stringify({ result, status: false }));
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ status: false, message: err.message })
    );
  }
}
