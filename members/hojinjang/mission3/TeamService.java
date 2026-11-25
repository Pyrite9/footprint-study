package com.footprint.backend.service;

import com.footprint.backend.dto.TeamJoinPreviewResponse;
import com.footprint.backend.entity.Team;
import com.footprint.backend.exception.NotFoundException;
import com.footprint.backend.repository.TeamRepository;
import org.springframework.stereotype.Service;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public TeamJoinPreviewResponse findByInviteCode(String inviteCode) {
        Team team = teamRepository.findByInviteCode(inviteCode)
                .orElseThrow(()-> new NotFoundException("초대코드가 올바르지 않음"));

        return TeamJoinPreviewResponse.from(team);
    }
}
