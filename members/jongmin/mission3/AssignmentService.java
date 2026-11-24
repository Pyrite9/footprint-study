package com.footprint.backend.service;

import com.footprint.backend.entity.Assignment;
import com.footprint.backend.exception.NotFoundException;
import com.footprint.backend.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.footprint.backend.entity.Team;
import com.footprint.backend.repository.TeamRepository;

import java.time.LocalDate;
import java.util.List;

// Repository를 호출해 과제를 저장·조회·수정·삭제합니다. 대상이 없으면 NotFoundException을 던집니다.
@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final TeamRepository teamRepository;

    public AssignmentService(AssignmentRepository assignmentRepository,
                             TeamRepository teamRepository) {
        this.assignmentRepository = assignmentRepository;
        this.teamRepository = teamRepository;
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

    public List<Team> findTeams(Long assignmentId) {
        return teamRepository.findByAssignmentId(assignmentId);
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
