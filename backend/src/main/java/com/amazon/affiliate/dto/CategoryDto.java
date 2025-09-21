package com.amazon.affiliate.dto;

import lombok.Data;

@Data // Lombok: auto-generates getters, setters, etc.
public class CategoryDto {
    private Long id;
    private String name;
}