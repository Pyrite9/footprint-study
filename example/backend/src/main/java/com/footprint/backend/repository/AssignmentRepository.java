package com.footprint.backend.repository;

import com.footprint.backend.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

// assignment 테이블의 행을 저장·조회·삭제합니다. 메서드는 JpaRepository가 제공합니다.
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}
