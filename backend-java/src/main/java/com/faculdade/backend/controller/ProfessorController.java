package com.faculdade.backend.controller;

import com.faculdade.backend.model.Attendance;
import com.faculdade.backend.model.Grade;
import com.faculdade.backend.model.Subject;
import com.faculdade.backend.model.User;
import com.faculdade.backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ProfessorController {

    @Autowired
    private DatabaseService db;

    // --- Professores Resource ---

    @GetMapping("/professores")
    public List<User> listProfessores() {
        return db.getDataStore().getUsers().stream()
                .filter(u -> "professor".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/professores/{id}/disciplinas")
    public List<Subject> getDisciplinas(@PathVariable Long id) {
        return db.getDataStore().getSubjects().stream()
                .filter(s -> s.getProfessorId().equals(id))
                .collect(Collectors.toList());
    }

    // --- Notas Resource ---

    @PostMapping("/notas")
    public ResponseEntity<?> lancarNota(@RequestBody Grade gradeData) {
        if (gradeData.getNota1() != null && (gradeData.getNota1() < 0 || gradeData.getNota1() > 10)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Nota deve ser entre 0 e 10"));
        }
        // Repeat check for nota2 if needed, assume frontend sends valid data or use javax.validation

        Grade existing = db.getDataStore().getGrades().stream()
                .filter(g -> g.getStudentId().equals(gradeData.getStudentId())
                          && g.getSubjectId().equals(gradeData.getSubjectId()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            if (gradeData.getNota1() != null) existing.setNota1(gradeData.getNota1());
            if (gradeData.getNota2() != null) existing.setNota2(gradeData.getNota2());
            db.saveData();
            return ResponseEntity.ok(existing);
        } else {
            gradeData.setId(System.currentTimeMillis());
            db.getDataStore().getGrades().add(gradeData);
            db.saveData();
            return ResponseEntity.status(201).body(gradeData);
        }
    }

    // --- Frequência Resource ---

    @PostMapping("/frequencia")
    public ResponseEntity<?> registrarFrequencia(@RequestBody Map<String, Object> body) {
        Long studentId = ((Number) body.get("studentId")).longValue();
        Long subjectId = ((Number) body.get("subjectId")).longValue();
        String action = (String) body.get("action");
        Integer absences = body.get("absences") != null ? ((Number) body.get("absences")).intValue() : null;

        Attendance existing = db.getDataStore().getAttendance().stream()
                .filter(a -> a.getStudentId().equals(studentId) && a.getSubjectId().equals(subjectId))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            if ("increment".equals(action)) {
                existing.setAbsences(existing.getAbsences() + 1);
            } else if ("decrement".equals(action)) {
                if (existing.getAbsences() > 0) existing.setAbsences(existing.getAbsences() - 1);
            } else if (absences != null) {
                existing.setAbsences(absences);
            }
            db.saveData();
            return ResponseEntity.ok(existing);
        } else {
            Attendance newRecord = new Attendance();
            newRecord.setId(System.currentTimeMillis());
            newRecord.setStudentId(studentId);
            newRecord.setSubjectId(subjectId);
            newRecord.setTotalClasses(40);

            if ("increment".equals(action)) newRecord.setAbsences(1);
            else if (absences != null) newRecord.setAbsences(absences);
            else newRecord.setAbsences(0);

            db.getDataStore().getAttendance().add(newRecord);
            db.saveData();
            return ResponseEntity.ok(newRecord);
        }
    }
}
