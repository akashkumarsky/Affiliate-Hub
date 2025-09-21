package com.amazon.affiliate.controller;

import com.amazon.affiliate.dto.CategoryDto;
import com.amazon.affiliate.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Make sure this is 'web.bind.annotation.*'

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // This is the existing method to GET all categories. It's perfect.
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // --- THIS IS THE NEW PART THAT WAS MISSING ---
    // This method handles the POST request from your "Add Category" form.
    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto createdCategory = categoryService.createCategory(categoryDto);
        // Return a 201 CREATED status, which is the standard for successful creation.
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }
}