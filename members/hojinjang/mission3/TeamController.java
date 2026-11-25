package com.footprint.backend.controller;

import com.footprint.backend.dto.TeamJoinPreviewResponse;
import com.footprint.backend.service.TeamService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teams") //이 어노테이션이 있으면 해당 클래스의 주소를 /teams로 시작하는 어노테이션
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    //ABC123 초대코드 입력
    @GetMapping("/join/{inviteCode}")
    public TeamJoinPreviewResponse join(@PathVariable String inviteCode) {
        return teamService.findByInviteCode(inviteCode);
    }
}
