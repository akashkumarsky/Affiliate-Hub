package com.amazon.affiliate.service;

import com.amazon.affiliate.dto.ProductDto;
import com.amazon.affiliate.entity.Category;
import com.amazon.affiliate.entity.Product;
import com.amazon.affiliate.exception.ResourceNotFoundException;
import com.amazon.affiliate.repository.CategoryRepository;
import com.amazon.affiliate.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToProductDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName).stream()
                .map(this::mapToProductDto)
                .collect(Collectors.toList());
    }

    @Transactional // Ensures this operation is a single database transaction
    public ProductDto createProduct(ProductDto productDto) {
        // Find the category by its name, or throw an exception if it doesn't exist.
        Category category = categoryRepository.findByName(productDto.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with name: " + productDto.getCategoryName()));

        // Map the incoming DTO to a Product entity
        Product product = new Product();
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setAsin(productDto.getAsin());
        product.setImageUrl(productDto.getImageUrl());
        product.setRating(productDto.getRating());
        product.setDiscount(productDto.getDiscount());
        product.setCategory(category); // Set the relationship

        // Save the new product to the database
        Product savedProduct = productRepository.save(product);

        // Map the saved entity back to a DTO and return it
        return mapToProductDto(savedProduct);
    }

    // Helper method to map a Product entity to a ProductDto
    private ProductDto mapToProductDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setAsin(product.getAsin());
        dto.setImageUrl(product.getImageUrl());
        dto.setRating(product.getRating());
        dto.setDiscount(product.getDiscount());
        dto.setCategoryName(product.getCategory().getName()); // Get name from nested category object
        return dto;
    }
}