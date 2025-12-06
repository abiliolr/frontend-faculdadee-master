package com.faculdade.backend.controller;

import com.faculdade.backend.model.Subject;
import com.faculdade.backend.model.User;
import com.faculdade.backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private DatabaseService db;

    // --- Disciplinas (Admin) ---

    @GetMapping("/disciplinas")
    public List<Map<String, Object>> listDisciplinas() {
        return db.getDataStore().getSubjects().stream().map(s -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", s.getId());
            map.put("name", s.getName());
            map.put("professorId", s.getProfessorId());

            User prof = db.getDataStore().getUsers().stream()
                    .filter(u -> u.getId().equals(s.getProfessorId()))
                    .findFirst().orElse(null);

            map.put("professorName", prof != null ? prof.getName() : "Sem Professor");
            return map;
        }).collect(Collectors.toList());
    }

    @PostMapping("/disciplinas")
    public ResponseEntity<?> createDisciplina(@RequestBody Subject subject) {
        if (subject.getName() == null || subject.getProfessorId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Nome e Professor são obrigatórios"));
        }
        subject.setId(System.currentTimeMillis());
        db.getDataStore().getSubjects().add(subject);
        db.saveData();
        return ResponseEntity.status(HttpStatus.CREATED).body(subject);
    }

    @DeleteMapping("/disciplinas/{id}")
    public ResponseEntity<?> deleteDisciplina(@PathVariable Long id) {
        boolean removed = db.getDataStore().getSubjects().removeIf(s -> s.getId().equals(id));
        if (removed) {
            // Cascade delete
            db.getDataStore().getExams().removeIf(e -> e.getSubjectId().equals(id));
            db.getDataStore().getGrades().removeIf(g -> g.getSubjectId().equals(id));
            db.getDataStore().getAttendance().removeIf(a -> a.getSubjectId().equals(id));

            db.saveData();
            return ResponseEntity.ok(Map.of("message", "Disciplina removida"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Disciplina não encontrada"));
        }
    }

    // --- Users (Admin) ---

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // Prevent deleting root admin
        if (id == 1L) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Não é possível deletar o administrador principal"));
        }

        // Use string comparison logic from Node just in case, but Java types are strong.
        // Assuming path variable parsing works.
        boolean removed = db.getDataStore().getUsers().removeIf(u -> u.getId().equals(id));

        if (removed) {
            db.saveData();
            return ResponseEntity.ok(Map.of("message", "Usuário removido"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Usuário não encontrado"));
        }
    }
}
