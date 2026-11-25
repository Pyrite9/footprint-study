package com.footprint.backend.config;

import com.footprint.backend.entity.Assignment;
import com.footprint.backend.entity.Team;
import com.footprint.backend.repository.AssignmentRepository;
import com.footprint.backend.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component //스프링이 서버를 키면 이 클래스를 자동으로 만들어 주는 어노테이션
public class DataInitializer implements CommandLineRunner { //implements CommandLineRunner 서버가 다 켜지면 run메서드를 한번 실행 하라는 뜻

    private final AssignmentRepository assignmentRepository;
    private final TeamRepository teamRepository;

    public DataInitializer(AssignmentRepository assignmentRepository,
                                        TeamRepository teamRepository) {
        this.assignmentRepository = assignmentRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public void run(String... args) {
        Assignment fir_ass = assignmentRepository.save(new Assignment("캡스톤 주제 발표",	"주제와 범위를 5분 안에 발표", LocalDate.of(2026, 10, 5),	LocalDate.of(2026, 10, 12)));
        //캡스톤 주제 발표를 Assignment 생성자 호출 후 대입하고 @id, @generatedvalue(strategy = generationtype.identity로 id가 1이 됨
        assignmentRepository.save(new Assignment("요구사항 명세서",	"기능 목록과 화면 흐름 정리", LocalDate.of(2026, 10, 12),	LocalDate.of(2026, 10, 26)));
        assignmentRepository.save(new Assignment("중간 시연",	"과제 생성부터 동료평가 입력까지", LocalDate.of(2026, 11, 2),	LocalDate.of(2026, 12, 11)));

        teamRepository.save(new Team("1조", "ABC123", fir_ass));
        teamRepository.save(new Team("2조", "XYZ789", fir_ass));
    }
}