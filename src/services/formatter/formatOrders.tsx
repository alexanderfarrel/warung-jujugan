const calculateOrderTotals = (orderItems: any, type: string) => {
  const count = orderItems.reduce((acc: any, cur: any) => {
    return acc + cur.count;
  }, 0);

  const totalPrice = orderItems.reduce((acc: any, cur: any) => {
    return acc + cur.totalPrice;
  }, 0);

  return {
    totalCount: count,
    totalPrice: totalPrice,
  };
};

export default function formatOrders(orders: any) {
  const separated = orders.map((order: any) => {
    const makanan = order.order.filter((item: any) => item.type === "makanan");
    const minuman = order.order.filter((item: any) => item.type === "minuman");

    const makananTotals = calculateOrderTotals(makanan, "makanan");
    const minumanTotals = calculateOrderTotals(minuman, "minuman");

    makanan.totalCount = makananTotals.totalCount;
    makanan.totalPrice = makananTotals.totalPrice;
    minuman.totalCount = minumanTotals.totalCount;
    minuman.totalPrice = minumanTotals.totalPrice;
    return {
      ...order,
      order: {
        makanan,
        minuman,
      },
    };
  });
  return separated;
}
