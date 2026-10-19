package com.footprint.backend.config;

import com.footprint.backend.entity.Assignment;
import com.footprint.backend.repository.AssignmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AssignmentRepository assignmentRepository;

    public DataInitializer(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public void run(String... args) {
        assignmentRepository.save(new Assignment("캡스톤 주제 발표",	"주제와 범위를 5분 안에 발표", LocalDate.of(2026, 10, 5),	LocalDate.of(2026, 10, 12)));
        assignmentRepository.save(new Assignment("요구사항 명세서",	"기능 목록과 화면 흐름 정리", LocalDate.of(2026, 10, 12),	LocalDate.of(2026, 10, 26)));
        assignmentRepository.save(new Assignment("중간 시연",	"과제 생성부터 동료평가 입력까지", LocalDate.of(2026, 11, 2),	LocalDate.of(2026, 12, 11)));
    }
}