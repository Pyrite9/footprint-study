package com.footprint.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record AssignmentCreateRequest(
    @NotBlank String title,
    String description
) { }
