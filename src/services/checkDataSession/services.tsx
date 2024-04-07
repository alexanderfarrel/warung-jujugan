import { retrieveDataByField } from "@/libs/firebase/service";

export async function checkId(email: string) {
  const user: any = await retrieveDataByField("users", "email", email);
  if (user.length > 0) {
    return user[0].id;
  }
}

export async function checkImage(email: string) {
  const user: any = await retrieveDataByField("users", "email", email);
  if (user.length > 0) {
    return user[0].image;
  }
}

export async function checkImageName(email: string) {
  const user: any = await retrieveDataByField("users", "email", email);
  if (user.length > 0) {
    return user[0].imageName;
  }
}

export async function checkOrderCount(email: string) {
  const user: any = await retrieveDataByField("users", "email", email);
  if (user.length > 0 && user[0].orders) {
    return user[0].orders.reduce(
      (total: any, order: any) => total + order.count,
      0
    );
  } else {
    return 0;
  }
}

export async function checkOrderConfirm(email: string) {
  const user: any = await retrieveDataByField("users", "email", email);
  const check = await retrieveDataByField("orders", "userId", user[0].id);
  const result = check.filter((order: any) => order.proses != "Selesai");

  return result.length;
}

export async function checkOrderHistory(email: string) {
  const user: any = await retrieveDataByField("users", "email", email);
  const check = await retrieveDataByField("orders", "userId", user[0].id);
  const result = check.filter((order: any) => order.proses == "Selesai");

  return result.length;
}
