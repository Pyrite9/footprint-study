package com.footprint.backend.repository;

import com.footprint.backend.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByInviteCode(String inviteCode);
    //초대 코드를 받아 코드를 가진 조를 찾고 없으면 optional에 담아둔다
}
