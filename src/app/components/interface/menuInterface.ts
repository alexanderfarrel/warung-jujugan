export interface ChoiceItem {
  id?: number;
  name: string;
  price: number;
  type: string;
  thumbnail?: string;
  checked?: boolean;
  disabled?: boolean;
  display?: string;
  imageName?: string;
  stock?: number;
  priceDisplay?: string;
}

export interface MenuItem {
  id?: string;
  name: string;
  note?: string;
  price: number;
  desc?: string;
  stock?: number;
  thumbnail: string;
  type: string;
  imageName?: string;
  choice: ChoiceItem[];
}
