package com.footprint.backend.dto;

import com.footprint.backend.entity.Team;

public record TeamSummaryResponse(Long id, String name) {

    public static TeamSummaryResponse from(Team team) {
        return new TeamSummaryResponse(team.getId(), team.getName());
    }
}