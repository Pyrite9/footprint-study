package com.footprint.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(name = "invite_code", unique = true)
    private String inviteCode;

    //fetch = FetchType.EAGER은 원래의 기본값으로 조를 꺼낼때 과제도 같이 꺼내 쓸데없는 작업이 늘어나 LAZY를 함
    @ManyToOne(fetch = FetchType.LAZY) //여러개to하나 조 여러개가 과제 하나에 속하는 뜻
    @JoinColumn(name = "assignment_id", nullable = false) //테이블의 어느 컬럼에 저장되는지 정한다
    private Assignment assignment;

    public Team(String name, String inviteCode, Assignment assignment) {
        this.name = name;
        this.inviteCode = inviteCode;
        this.assignment = assignment;
    }


}
