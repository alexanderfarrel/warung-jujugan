import {
  addData,
  retrieveDataByField,
  retrieveDataById,
  updateData,
} from "@/libs/firebase/service";

export async function addImage(
  email: string,
  fileName: string,
  imageName: string
) {
  const user: any = await retrieveDataByField("users", "email", email);
  const data = user[0];
  if (user.length > 0) {
    data.image = fileName;
    data.imageName = imageName;
    await updateData("users", user[0].id, data);
  }
}

function findMatchingOrders(userToping: any, databaseOrders: any) {
  const matching = databaseOrders.filter((order: any) => {
    const orderTopings = order.topingChecked.map((toping: any) => toping.name);
    return (
      userToping.every((userTopingItem: any) =>
        orderTopings.includes(userTopingItem.name)
      ) && userToping.length === orderTopings.length
    );
  });
  return matching;
}

export async function addOrder(email: string, data: any, update = false) {
  const user: any = await retrieveDataByField("users", "email", email);
  const userData = user[0];
  if (user.length > 0) {
    if (userData?.orders) {
      const checkToping: any = findMatchingOrders(
        data.topingChecked,
        userData.orders
      );
      if (checkToping.length > 0) {
        if (update) {
          let totalTopingPrice: any = 0;
          if (data?.topingChecked?.length > 0) {
            checkToping[0].topingChecked.map((toping: any) => {
              totalTopingPrice += toping.price * data.count;
            });
          }
          let totalPrice =
            data?.note == "nothing"
              ? checkToping[0].price * data.count + totalTopingPrice
              : totalTopingPrice;
          checkToping[0].count = data.count;
          checkToping[0].totalPrice = totalPrice;
          const deleteSameOrder = userData.orders.filter(
            (order: any) => order.id !== checkToping[0].id
          );
          userData.orders = [...deleteSameOrder, checkToping[0]];
          const result = await updateData("users", userData.id, userData);
          return {
            status: result?.status,
            statusCode: 204,
            message: result?.message,
          };
        } else {
          checkToping[0].count += data.count;
          checkToping[0].totalPrice += data.totalPrice;
        }
        const result = await updateData("users", userData.id, userData);
        return {
          status: result?.status,
          statusCode: 204,
          message: result?.message,
        };
      } else {
        userData.orders
          ? userData.orders.push(data)
          : (userData.orders = [data]);
        const result = await updateData("users", userData.id, userData);
        return result;
      }
    } else {
      userData.orders = [data]; //userData.orders.push(data) :
      const result = await updateData("users", userData.id, userData);
      return result;
    }
  }
}

export async function deleteOrder(email: string, data: any) {
  const user: any = await retrieveDataByField("users", "email", email);
  const userData = user[0];
  if (user?.length > 0) {
    const checkToping = findMatchingOrders(data.topingChecked, userData.orders);
    if (checkToping.length > 0) {
      const index = userData.orders.indexOf(checkToping[0]);
      userData.orders.splice(index, 1);
      const result = await updateData("users", user[0].id, userData);
      return {
        status: result?.status,
      };
    }
  }
}

export default async function addOrderConfirm(
  id: string,
  menu: any,
  note?: string
) {
  menu = {
    userId: id,
    status: "Menunggu Konfirmasi",
    time: Date.now(),
    note: note,
    order: menu,
  };
  const result: any = await addData("orders", menu);
  if (result.status) {
    await updateData("users", id, { orders: [] });
    return { status: true };
  } else {
    return { status: false };
  }
}
