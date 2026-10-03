package com.footprint.backend.controller;

import com.footprint.backend.dto.AssignmentCreateRequest;
import com.footprint.backend.dto.AssignmentUpdateRequest;
import com.footprint.backend.entity.Assignment;
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
    public List<Assignment> findAll() {
        return assignmentService.findAll();
    }

    @GetMapping("/{id}")
    public Assignment findById(@PathVariable Long id) {
        return assignmentService.findById(id);
    }

    @PostMapping
    public Assignment create(@Valid @RequestBody AssignmentCreateRequest request) {
        return  assignmentService.create(request.title(), request.description());
    }

    @PutMapping("/{id}")
    public Assignment update(@PathVariable Long id, @Valid @RequestBody AssignmentUpdateRequest request) {
        return assignmentService.update(id, request.title(), request.description());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        assignmentService.delete(id);
    }
}
