package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.express.inventory.api.logs.events.InventoryTransactionEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryTransactionService {

    private final InventoryTransactionRepository inventoryTransactionRepository;
    private final InventoryTransactionMapper inventoryTransactionMapper;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    @Transactional(propagation = Propagation.REQUIRED)
    public void createInventoryTransaction(InventoryTransactionEvent event) {
        InventoryTransaction inventoryTransaction = inventoryTransactionMapper.toInventoryTransaction(event);
        inventoryTransactionRepository.save(inventoryTransaction);
    }

    public List<InventoryTransaction> getAllLogs() {
        return inventoryTransactionRepository.findAll();
    }

    public List<InventoryTransaction> getRecentLogs() {
        return inventoryTransactionRepository.findTop5ByOrderByIdDesc();
    }
}