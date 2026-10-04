package com.footprint.backend.dto;

import com.footprint.backend.entity.Assignment;

public record AssignmentResponse(Long id, String title, String description) {

    public static AssignmentResponse from(Assignment assignment) {
        return new AssignmentResponse(assignment.getId(), assignment.getTitle(), assignment.getDescription());
    }
}
