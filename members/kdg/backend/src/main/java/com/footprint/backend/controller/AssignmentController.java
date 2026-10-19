package com.footprint.backend.controller;

import com.footprint.backend.dto.AssignmentCreateRequest;
import com.footprint.backend.dto.AssignmentResponse;
import com.footprint.backend.dto.AssignmentUpdateRequest;
import com.footprint.backend.service.AssignmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public AssignmentResponse findById(@PathVariable Long id) {
        return AssignmentResponse.from(assignmentService.findById(id));
    }

    @PostMapping
    public AssignmentResponse create(@Valid @RequestBody AssignmentCreateRequest request) {
        return AssignmentResponse.from(assignmentService.create(request.title(), request.description()));
    }

    @PutMapping("/{id}")
    public AssignmentResponse update(@PathVariable Long id, @Valid @RequestBody AssignmentUpdateRequest request) {
        return AssignmentResponse.from(assignmentService.update(id, request.title(), request.description()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        assignmentService.delete(id);
    }
}
