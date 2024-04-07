import { retrieveDataById, updateData } from "@/libs/firebase/service";

export async function orderCancelRequest(order: any) {
  const orders = await retrieveDataById("orders", order.id);
  if (orders) {
    orders.status = "Dibatalkan";
    orders.cancelNote = order.cancelNote;
    try {
      await updateData("orders", order.id, orders);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return false;
}

export async function orderConfirmRequest(id: string, req: string) {
  const orders = await retrieveDataById("orders", id);
  if (orders) {
    orders.status = req == "confirm" ? "Diproses" : "Selesai";
    orders.proses = req == "confirm" ? "" : "Selesai";
    try {
      await updateData("orders", id, orders);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return false;
}

export async function orderRejectedRequest(data: any) {
  const orders = await retrieveDataById("orders", data.id);
  if (orders) {
    orders.adminRejectNote = data.adminRejectNote;
    orders.status = data.status;
    orders.proses = data.proses || "";
    try {
      await updateData("orders", data.id, orders);
      return true;
    } catch {
      return false;
    }
  }
}

export async function orderDeleteRequest(id: string, req: string) {
  const orders = await retrieveDataById("orders", id);
  if (orders) {
    orders.status = req == "ditolak" ? "Ditolak" : "Dibatalkan";
    orders.proses = "Selesai";
    try {
      await updateData("orders", id, orders);
      return true;
    } catch {
      return false;
    }
  }
}
