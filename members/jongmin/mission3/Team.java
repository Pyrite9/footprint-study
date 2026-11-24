package com.footprint.backend.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    public Team(String name, Assignment assignment) {
        this.name = name;
        this.assignment = assignment;
    }
}
