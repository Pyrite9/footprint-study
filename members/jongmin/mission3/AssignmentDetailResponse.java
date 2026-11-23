package com.footprint.backend.dto;

import com.footprint.backend.entity.Assignment;
import com.footprint.backend.entity.Team;

import java.time.LocalDate;
import java.util.List;

public record AssignmentDetailResponse(Long id, String title, LocalDate startDate, LocalDate endDate,
                                       List<TeamSummaryResponse> teams) {

    public static AssignmentDetailResponse from(Assignment assignment, List<Team> teams) {
        return new AssignmentDetailResponse(
                assignment.getId(),
                assignment.getTitle(),
                assignment.getStartDate(),
                assignment.getEndDate(),
                teams.stream().map(TeamSummaryResponse::from).toList()
        );
    }
}