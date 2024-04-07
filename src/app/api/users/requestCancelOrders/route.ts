import { orderCancelRequest } from "@/services/ordersStatusRequest/orderCancelRequest";
import verifyToken from "@/services/verifyToken/verifyToken";

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1] ?? null;
  if (!token) {
    return new Response(
      JSON.stringify({ status: false, message: "Unauthorized" })
    );
  }
  try {
    await verifyToken(token);
    const body = await request.json();
    const result = await orderCancelRequest(body);
    if (result) {
      return new Response(JSON.stringify({ status: true, message: "Success" }));
    } else {
      return new Response(JSON.stringify({ status: false, message: "Failed" }));
    }
  } catch {
    return new Response(
      JSON.stringify({ status: false, message: "Unauthorized" })
    );
  }
}
