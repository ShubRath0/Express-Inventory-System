export interface PurchaseOrder {
    purchaseId: number,
    productName: string,
    quantity: number,
    unitPrice: number,
    truckCost?: number,
    supplierName: string,
    note: string,
    purchaseDate: string;
}