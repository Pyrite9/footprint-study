package com.footprint.backend.dto;

import com.footprint.backend.entity.Assignment;

import java.time.LocalDate;

// 과제를 클라이언트에 돌려줄 때 쓰는 응답 body의 모양입니다. Entity를 그대로 내보내지 않기 위해 씁니다.
public record AssignmentResponse(Long id, String title, String description, LocalDate startDate, LocalDate endDate) {

    public static AssignmentResponse from(Assignment assignment) {
        return new AssignmentResponse(assignment.getId(), assignment.getTitle(), assignment.getDescription(), assignment.getStartDate(), assignment.getEndDate());
    }
}
