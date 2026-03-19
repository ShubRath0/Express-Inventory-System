package com.express.inventory.api.purchases;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;


import java.util.List;

@RequestMapping ("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;


    @GetMapping
    public List<PurchaseEntity> getPurchaseOrders(){
        return purchaseService.getAllPurchases();
    }

}

