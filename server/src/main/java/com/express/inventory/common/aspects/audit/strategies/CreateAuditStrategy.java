package com.express.inventory.common.aspects.audit.strategies;

import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.express.inventory.api.audit.enums.Action;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CreateAuditStrategy extends BaseAuditStrategy {

    public CreateAuditStrategy(ApplicationContext applicationContext, ObjectMapper objectMapper) {
        super(applicationContext, objectMapper);
    }

    public Action getAction() {
        return Action.CREATE;
    }

    @Override
    public Map<String, Object> resolveOldValue(Object[] args, Class<?> enttiy) {
        return null;
    }
}
