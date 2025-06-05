import shirtImg from "@/assets/shirt.png";
import kurtaImg from "@/assets/kurta.png";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  subCategory: string;
  inStock: number;
  sku: string;
  expiryDate: string;
  status: 'Normal' | 'Markdown' | 'Damaged';
  weight: string;
  description: string;
  saleHistory?: SaleEntry[];
}

export interface SaleEntry {
  date: string;
  quantity: number;
  revenue: number;
}

export interface InventorySummary {
  totalQuantity: number;
  pendingReceival: number;
  shelfCapacity: number;
  totalValue: number;
  damagedGoods: number;
  exhaustedItems: number;
}

export const inventorySummary: InventorySummary = {
  totalQuantity: 113019,
  pendingReceival: 1938,
  shelfCapacity: 92, // percent
  totalValue: 12810865,
  damagedGoods: 12,
  exhaustedItems: 29
};

export const products: Product[] = [
  {
    id: "1",
    name: "Shirt",
    image: shirtImg,
    price: 1200,
    category: "Clothing",
    subCategory: "Men's Wear",
    inStock: 50,
    sku: "SKU-54321",
    expiryDate: "June 10, 2025",
    status: "Normal",
    weight: "250gms",
    description: "Classic cotton shirt, perfect for formal and casual occasions.",
    saleHistory: [
      { date: "June 1, 2025", quantity: 10, revenue: 12000 },
      { date: "May 31, 2025", quantity: 8, revenue: 9600 },
      { date: "May 30, 2025", quantity: 12, revenue: 14400 },
      { date: "May 29, 2025", quantity: 5, revenue: 6000 }
    ]
  },
  {
    id: "2",
    name: "Kurta",
    image: kurtaImg,
    price: 1500,
    category: "Clothing",
    subCategory: "Traditional Wear",
    inStock: 99,
    sku: "SKU-12346",
    expiryDate: "May 28, 2025",
    status: "Normal",
    weight: "300gms",
    description: "Elegant cotton kurta with traditional embroidery, perfect for festive occasions."
  },
  {
    id: "3",
    name: "Kurta",
    image: kurtaImg,
    price: 1500,
    category: "Clothing",
    subCategory: "Traditional Wear",
    inStock: 99,
    sku: "SKU-12347",
    expiryDate: "May 15, 2025",
    status: "Markdown",
    weight: "300gms",
    description: "Elegant cotton kurta with traditional embroidery, perfect for festive occasions."
  },
  {
    id: "4",
    name: "Kurta",
    image: kurtaImg,
    price: 1500,
    category: "Clothing",
    subCategory: "Traditional Wear",
    inStock: 99,
    sku: "SKU-12348",
    expiryDate: "Jun 10, 2025",
    status: "Normal",
    weight: "300gms",
    description: "Elegant cotton kurta with traditional embroidery, perfect for festive occasions."
  },
  {
    id: "5",
    name: "Kurta",
    image: kurtaImg,
    price: 1500,
    category: "Clothing",
    subCategory: "Traditional Wear",
    inStock: 99,
    sku: "SKU-12349",
    expiryDate: "Jun 15, 2025",
    status: "Normal",
    weight: "300gms",
    description: "Elegant cotton kurta with traditional embroidery, perfect for festive occasions."
  },
  {
    id: "6",
    name: "Kurta",
    image: kurtaImg,
    price: 1500,
    category: "Clothing",
    subCategory: "Traditional Wear",
    inStock: 99,
    sku: "SKU-12350",
    expiryDate: "Jun 28, 2025",
    status: "Normal",
    weight: "300gms",
    description: "Elegant cotton kurta with traditional embroidery, perfect for festive occasions."
  },
  {
    id: "7",
    name: "Shirt",
    image: shirtImg,
    price: 1200,
    category: "Clothing",
    subCategory: "Men's Wear",
    inStock: 150,
    sku: "SKU-45678",
    expiryDate: "Jun 5, 2025",
    status: "Normal",
    weight: "250gms",
    description: "Classic cotton shirt, perfect for formal and casual occasions."
  }
];

export const chartData = [
  { name: 'Jul', value: 80 },
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 85 },
  { name: 'Oct', value: 55 },
  { name: 'Nov', value: 90 },
  { name: 'Dec', value: 30 },
];
