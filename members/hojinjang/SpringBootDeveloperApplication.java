package me.jhj.springbootfootprintstudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.time.LocalDate;

@SpringBootApplication
public class SpringBootDeveloperApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootDeveloperApplication.class, args);

        // 1. 체크리스트: Hello World 출력
        System.out.println("Hello World");

        // 2. 날짜 데이터 만들기
        LocalDate start = LocalDate.of(2026, 9, 18);
        LocalDate end = LocalDate.of(2026, 9, 27);

        // 3. Assignment 객체 생성
        Assignment assignment = new Assignment("1주차 과제", start, end);

        // 4. 객체 이름 호출
        System.out.println(assignment);
    }
}