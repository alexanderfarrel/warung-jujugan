import { NextResponse } from "next/server";

const data = [
  {
    type: "makanan",
    name: "Mie Ayam",
    price: 20000,
    subtitle: "Dibuat dengan bawang putih dan perpaduan dengan bumbu lainnya",
    note: "nothing",
    choice: [
      {
        name: "Mie Ayam Original",
        price: 0,
        priceDisplay: 20000,
        disabled: true,
        type: "checkbox",
        checked: true,
      },
      {
        name: "ceker",
        price: 2000,
        type: "checkbox",
      },
      {
        name: "telur",
        price: 3000,
        type: "checkbox",
      },
      {
        name: "bakso",
        price: 4000,
        type: "checkbox",
      },
    ],
  },
  {
    type: "makanan",
    name: "Soto",
    price: 10000,
    subtitle: "Dibuat dengan bawang putih dan perpaduan dengan bumbu lainnya",
    note: "choiceOne",
    choice: [
      {
        name: "Soto Original",
        price: 10000,
        disabled: true,
        checked: true,
        type: "radio",
      },
    ],
  },
  {
    type: "makanan",
    name: "Ayam Bakar",
    price: 8000,
    subtitle: "Dibuat dengan ayam dan dengan sepenuh hati",
    note: "choiceOne",
    choice: [
      {
        name: "Ayam Bakar Standart",
        price: 8000,
        type: "radio",
        checked: true,
      },
      {
        name: "Ayam Bakar Besar",
        price: 13000,
        type: "radio",
      },
    ],
  },
  {
    type: "minuman",
    name: "Juice",
    price: 5000,
    subtitle:
      "Dibuat dengan diblender lalu ditambah gula, terbuat dari buah fresh",
    note: "choiceOne",
    choice: [
      {
        id: 1,
        name: "Juice Alpukat",
        price: 5000,
        type: "radio",
        checked: true,
      },
      {
        id: 2,
        name: "Juice Jambu",
        price: 3000,
        type: "radio",
      },
      {
        id: 3,
        name: "Juice Nanas",
        price: 3000,
        type: "radio",
      },
      {
        id: 4,
        name: "Juice Buah Naga",
        price: 4000,
        type: "radio",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(data);
}
