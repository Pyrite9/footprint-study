package com.footprint.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record AssignmentUpdateRequest (
    @NotBlank String title,
    String description
) {}