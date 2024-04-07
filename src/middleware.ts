import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware() {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, [
  "admin",
  "auth",
  "profile",
  "orders",
  "status",
]);
