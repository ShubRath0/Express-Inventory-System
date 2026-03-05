package com.express.inventory.api.purchases;

public class PurchasesSQL {
    //CREATE/READ/UPDATE/DELETE

    private final string CREATE_PURCHASE_ORDER = "INSERT INTO PurchaseOrders (product_id(?), user_id(?), order_status(?), order_price(?), shipping_price(?), quantity(?)) VALUES (?)";
    private final string READ_PURCHASE_ORDER = "";
    private final string UPDATE_PURCHASE_ORDER = "";
    private final string DELETE_PURCHASE_ORDER = "";


}



