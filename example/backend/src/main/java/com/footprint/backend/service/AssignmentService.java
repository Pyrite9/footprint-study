package com.footprint.backend.service;

import com.footprint.backend.entity.Assignment;
import com.footprint.backend.exception.NotFoundException;
import com.footprint.backend.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

// Repository를 호출해 과제를 저장·조회·수정·삭제합니다. 대상이 없으면 NotFoundException을 던집니다.
@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public Assignment create(String title, String description, LocalDate startDate, LocalDate endDate) {
        Assignment assignment = new Assignment(title, description, startDate, endDate);
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> findAll() {
        return assignmentRepository.findAll();
    }
    public Assignment findById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("no assignment. id =" + id));
    }
    @Transactional
    public Assignment update(Long id, String title, String description, LocalDate startDate, LocalDate endDate) {
        Assignment assignment = findById(id);
        assignment.update(title, description, startDate, endDate);
        return assignment;
    }
    @Transactional
    public void delete(Long id) {
        Assignment assignment = findById(id);
        assignmentRepository.delete(assignment);
    }
}
