import { retrieveData } from "@/libs/firebase/service";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const users = await retrieveData("orders");
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return NextResponse.json(users);
}
