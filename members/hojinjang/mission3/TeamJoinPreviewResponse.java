package com.footprint.backend.dto;

import com.footprint.backend.entity.Team;

public record TeamJoinPreviewResponse(String assignmentTitle, String teamName) {
    public static TeamJoinPreviewResponse from(Team team) {
        return new TeamJoinPreviewResponse(team.getAssignment().getTitle(), team.getName());
    }
//from- dto 객체로 바꿔줌 json글자는 바뀌지 않았음
}
