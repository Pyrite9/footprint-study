package com.footprint.backend.service;

import com.footprint.backend.entity.Assignment;
import com.footprint.backend.exception.NotFoundException;
import com.footprint.backend.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public Assignment create(String title, String description) {
        Assignment assignment = new Assignment(title, description);
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
    public Assignment update(Long id, String title, String description) {
        Assignment assignment = findById(id);
        assignment.update(title, description);
        return assignment;
    }
    @Transactional
    public void delete(Long id) {
        Assignment assignment = findById(id);
        assignmentRepository.delete(assignment);
    }
}
