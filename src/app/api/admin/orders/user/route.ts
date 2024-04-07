import { retrieveDataById } from "@/libs/firebase/service";
import verifyToken from "@/services/verifyToken/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] ?? "";
  try {
    await verifyToken(token, true);
    const data = await req.json();

    const result = await Promise.all(
      data.map(async (item: any) => {
        const name = await retrieveDataById("users", item.userId);
        return { ...item, name: name?.username, email: name?.email };
      })
    );
    return new NextResponse(JSON.stringify({ status: true, data: result }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ status: false, message: "Unauthorized" })
    );
  }
}
