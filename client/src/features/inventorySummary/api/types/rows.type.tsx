interface Rows {
  key: number;
  totalProducts: number;
  totalStock: number,
  name: string;
  unitPrice: number;
  inventoryPrice: number;
}

export const RowsList: Rows[] = [
  {
    key: 2,
    totalProducts: 60,
    name: "16oz Clear PET Fruit Cup (500ct)",
    totalStock: 32,
    unitPrice: 74.24,
    inventoryPrice: 2.49,
  },
  {
    key: 5,
    totalProducts: 40,
    name: "32oz Family Size Fruit Bowl (200ct)",
    totalStock: 25,
    unitPrice: 89.0,
    inventoryPrice: 2.49,
  },
  {
    key: 7,
    totalProducts: 40,
    name: "64oz Party Tray with Dividers (50ct)",
    totalStock: 10,
    unitPrice: 115.0,
    inventoryPrice: 2.49,
  },
  {
    key: 1,
    totalProducts: 40,
    name: "8oz Clear PET Fruit Cup (500ct)",
    totalStock: 50,
    unitPrice: 58.8,
    inventoryPrice: 3.49,
  },
];
