package com.footprint.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    public Assignment(String title, String description) {
        this.title = title;
        this.description = description;
    }
    public void update(String title, String description) {
        this.title = title;
        this.description = description;
    }



}
