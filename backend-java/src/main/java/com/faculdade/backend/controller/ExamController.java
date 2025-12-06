package com.faculdade.backend.controller;

import com.faculdade.backend.model.Exam;
import com.faculdade.backend.model.Subject;
import com.faculdade.backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/provas")
public class ExamController {

    @Autowired
    private DatabaseService db;

    @GetMapping
    public List<Map<String, Object>> listExams() {
        return db.getDataStore().getExams().stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", e.getId());
            map.put("subjectId", e.getSubjectId());
            map.put("name", e.getName());
            map.put("date", e.getDate());
            map.put("time", e.getTime());

            Subject s = db.getDataStore().getSubjects().stream()
                    .filter(sub -> sub.getId().equals(e.getSubjectId()))
                    .findFirst()
                    .orElse(null);

            if (s != null) {
                map.put("subjectName", s.getName());
                return map;
            } else {
                return null; // Filter out ghosts
            }
        })
        .filter(java.util.Objects::nonNull)
        .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> createExam(@RequestBody Exam exam) {
        if (exam.getSubjectId() == null || exam.getName() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Campos obrigatórios faltando"));
        }
        exam.setId(System.currentTimeMillis());
        db.getDataStore().getExams().add(exam);
        db.saveData();
        return ResponseEntity.ok(exam); // Node returned 201, but ok is fine
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable Long id) {
        boolean removed = db.getDataStore().getExams().removeIf(e -> e.getId().equals(id));
        if (removed) {
            db.saveData();
            return ResponseEntity.ok(Map.of("message", "Prova removida com sucesso"));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "Prova não encontrada"));
        }
    }
}
