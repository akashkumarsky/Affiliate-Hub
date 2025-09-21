package com.amazon.affiliate.dto;

import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private double price;
    private String asin;
    private String imageUrl;
    private double rating;
    private int discount;
    private String categoryName; // We flatten the structure for simplicity
}