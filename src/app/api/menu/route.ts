import { NextResponse } from "next/server";

const data = [
  {
    type: "makanan",
    name: "Mie Ayam",
    price: 20000,
    subtitle: "Dibuat dengan bawang putih dan perpaduan dengan bumbu lainnya",
    note: "nothing",
    thumbnail: "/images/menu/Mie Ayam.png",
    choice: [
      {
        name: "Mie Ayam Original",
        price: 0,
        priceDisplay: 20000,
        disabled: true,
        type: "checkbox",
        checked: true,
        display: "/images/menu/Mie Ayam.png",
      },
      {
        name: "ceker",
        price: 2000,
        type: "checkbox",
        thumbnail: "/images/menu/Mie Ayam Ceker.jpeg",
      },
      {
        name: "telur",
        price: 3000,
        type: "checkbox",
        thumbnail: "/images/menu/Mie Ayam Telur.jpeg",
      },
      {
        name: "bakso",
        price: 4000,
        type: "checkbox",
        thumbnail: "/images/menu/Mie Ayam Bakso.jpeg",
      },
    ],
  },
  {
    type: "makanan",
    name: "Soto",
    price: 10000,
    subtitle: "Dibuat dengan bawang putih dan perpaduan dengan bumbu lainnya",
    thumbnail: "/images/menu/Soto.png",
    note: "choiceOne",
    choice: [
      {
        name: "Soto Original",
        price: 10000,
        disabled: true,
        checked: true,
        type: "radio",
        display: "/images/menu/Soto.png",
      },
    ],
  },
  {
    type: "makanan",
    name: "Ayam Bakar",
    price: 8000,
    subtitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa amet exercitationem, repellendus placeat ad similique laboriosam? Aspernatur voluptatem",
    note: "choiceOne",
    thumbnail: "/images/menu/Ayam Bakar.jpg",
    choice: [
      {
        name: "Ayam Bakar Standart",
        price: 8000,
        type: "radio",
        checked: true,
        display: "/images/menu/Ayam Bakar.jpg",
      },
      {
        name: "Ayam Bakar Besar",
        price: 13000,
        type: "radio",
        display: "/images/menu/Ayam Bakar Jumbo.png",
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
    thumbnail: "/images/menu/Juice Alpukat.png",
    choice: [
      {
        id: 1,
        name: "Juice Alpukat",
        price: 5000,
        type: "radio",
        checked: true,
        display: "/images/menu/Juice Alpukat.png",
      },
      {
        id: 2,
        name: "Juice Jambu",
        price: 3000,
        type: "radio",
        display: "/images/menu/Juice Jambu.png",
      },
      {
        id: 3,
        name: "Juice Nanas",
        price: 3000,
        type: "radio",
        display: "/images/menu/Juice Nanas.jpeg",
      },
      {
        id: 4,
        name: "Juice Buah Naga",
        price: 4000,
        type: "radio",
        display: "/images/menu/Juice Buah Naga.jpeg",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(data);
}
