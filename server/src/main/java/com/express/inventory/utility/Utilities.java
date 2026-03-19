package com.express.inventory.utility;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class Utilities {
    public static void copyNonNullProperties(Object src, Object target) {
        BeanWrapper srcWrap = new BeanWrapperImpl(src);
        java.beans.PropertyDescriptor[] pds = srcWrap.getPropertyDescriptors();

        java.util.Set<String> nullProps = new java.util.HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object value = srcWrap.getPropertyValue(pd.getName());
            if (value == null) nullProps.add(pd.getName());
        }

        BeanUtils.copyProperties(src, target, nullProps.toArray(new String[0]));
    }
}
