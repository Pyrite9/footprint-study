package me.jhj.springbootfootprintstudy;

import java.time.LocalDate;

public class Assignment {
    // 과제명, 시작일, 종료일 재료(필드)
    String title;
    LocalDate startDate;
    LocalDate endDate;

    // 생성자
    public Assignment(String title, LocalDate startDate, LocalDate endDate) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "-------- 1주차 과제 --------\n" +
                "과제명: " + title + "\n" +
                "시작일: " + startDate + "\n" +
                "종료일: " + endDate;
    }
}
