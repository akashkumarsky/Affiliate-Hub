package com.amazon.affiliate.service;

import com.amazon.affiliate.dto.CategoryDto;
import com.amazon.affiliate.entity.Category;
import com.amazon.affiliate.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.amazon.affiliate.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service // Marks this as a Spring service component
@RequiredArgsConstructor // Lombok: creates a constructor for all final fields
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        // Convert the list of Category entities to a list of CategoryDto objects
        return categories.stream()
                .map(this::mapToCategoryDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CategoryDto createCategory(CategoryDto categoryDto) {
        // Optional: Check if a category with this name already exists to avoid errors
        if (categoryRepository.findByName(categoryDto.getName()).isPresent()) {
            // For a real app, you'd create a specific "DuplicateResourceException"
            throw new IllegalArgumentException("Category with name '" + categoryDto.getName() + "' already exists.");
        }

        Category category = new Category();
        category.setName(categoryDto.getName());
        Category savedCategory = categoryRepository.save(category);
        return mapToCategoryDto(savedCategory);
    }



    // Helper method to perform the conversion
    private CategoryDto mapToCategoryDto(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}