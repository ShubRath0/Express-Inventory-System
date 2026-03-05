package com.express.inventory.api.purchases;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@RequestMapping ("/api/purchases")
public class PurchaseController {

    private final List<PurchaseEntity> PurchaseOrders = new ArrayList<>();

    public PurchaseController(){
        PurchaseOrders.add(new PurchaseEntity(1,1,1,"",1.0,"",1));

    }

    @GetMapping
    public List<PurchaseEntity> getPurchaseOrders(){
        return PurchaseOrders;
    }
}
