package com.footprint.backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

// 과제를 수정할 때 클라이언트가 보내는 요청 body의 모양입니다.
public record AssignmentUpdateRequest (
    @NotBlank String title,
    String description,
    LocalDate startDate,
    LocalDate endDate
) {}