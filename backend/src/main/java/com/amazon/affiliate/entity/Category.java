package com.amazon.affiliate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok annotation to create getters, setters, toString, etc.
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}