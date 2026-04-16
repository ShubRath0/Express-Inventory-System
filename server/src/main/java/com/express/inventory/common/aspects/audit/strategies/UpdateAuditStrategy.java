package com.express.inventory.common.aspects.audit.strategies;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.express.inventory.api.audit.enums.Action;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class UpdateAuditStrategy extends BaseAuditStrategy {

    public UpdateAuditStrategy(ApplicationContext applicationContext, ObjectMapper objectMapper) {
        super(applicationContext, objectMapper);
    }

    public Action getAction() {
        return Action.UPDATE;
    }
}
