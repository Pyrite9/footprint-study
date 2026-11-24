package com.footprint.backend.controller;

import com.footprint.backend.dto.AssignmentCreateRequest;
import com.footprint.backend.dto.AssignmentResponse;
import com.footprint.backend.dto.AssignmentUpdateRequest;
import com.footprint.backend.service.AssignmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.footprint.backend.dto.AssignmentDetailResponse;
import com.footprint.backend.entity.Assignment;
import com.footprint.backend.entity.Team;

import java.util.List;

// HTTP 요청을 받아 Service를 호출하고, 결과를 응답 DTO로 바꿔 돌려줍니다.
@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public List<AssignmentResponse> findAll() {
        return assignmentService.findAll().stream()
                .map(AssignmentResponse::from)
                .toList();
    }

    @GetMapping("/{id}")
    public AssignmentDetailResponse findById(@PathVariable Long id) {
        Assignment assignment = assignmentService.findById(id);    // 없으면 여기서 404
        List<Team> teams = assignmentService.findTeams(id);
        return AssignmentDetailResponse.from(assignment, teams);
    }

    @PostMapping
    public AssignmentResponse create(@Valid @RequestBody AssignmentCreateRequest request) {
        return AssignmentResponse.from(assignmentService.create(request.title(), request.description(), request.startDate(), request.endDate()));
    }

    @PutMapping("/{id}")
    public AssignmentResponse update(@PathVariable Long id, @Valid @RequestBody AssignmentUpdateRequest request) {
        return AssignmentResponse.from(assignmentService.update(id, request.title(), request.description(), request.startDate(), request.endDate()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        assignmentService.delete(id);
    }
}
