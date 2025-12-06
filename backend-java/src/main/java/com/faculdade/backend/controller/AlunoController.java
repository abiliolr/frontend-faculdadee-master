package com.faculdade.backend.controller;

import com.faculdade.backend.model.Attendance;
import com.faculdade.backend.model.Grade;
import com.faculdade.backend.model.Subject;
import com.faculdade.backend.model.User;
import com.faculdade.backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private DatabaseService db;

    @GetMapping
    public List<User> listAlunos() {
        return db.getDataStore().getUsers().stream()
                .filter(u -> "student".equals(u.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}/boletim")
    public List<Map<String, Object>> getBoletim(@PathVariable Long id) {
        // Return all subjects, enriched with grades if available
        return db.getDataStore().getSubjects().stream().map(subject -> {
            Map<String, Object> result = new HashMap<>();

            Grade grade = db.getDataStore().getGrades().stream()
                    .filter(g -> g.getStudentId().equals(id) && g.getSubjectId().equals(subject.getId()))
                    .findFirst()
                    .orElse(null);

            if (grade != null) {
                result.put("id", grade.getId());
                result.put("studentId", grade.getStudentId());
                result.put("subjectId", grade.getSubjectId());
                result.put("nota1", grade.getNota1());
                result.put("nota2", grade.getNota2());
                result.put("subjectName", subject.getName());
            } else {
                result.put("id", null);
                result.put("studentId", id);
                result.put("subjectId", subject.getId());
                result.put("nota1", null);
                result.put("nota2", null);
                result.put("subjectName", subject.getName());
            }
            return result;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}/frequencia")
    public List<Map<String, Object>> getFrequencia(@PathVariable Long id) {
        return db.getDataStore().getSubjects().stream().map(subject -> {
            Map<String, Object> result = new HashMap<>();

            Attendance attendance = db.getDataStore().getAttendance().stream()
                    .filter(a -> a.getStudentId().equals(id) && a.getSubjectId().equals(subject.getId()))
                    .findFirst()
                    .orElse(null);

            if (attendance != null) {
                result.put("id", attendance.getId());
                result.put("studentId", attendance.getStudentId());
                result.put("subjectId", attendance.getSubjectId());
                result.put("absences", attendance.getAbsences());
                result.put("totalClasses", attendance.getTotalClasses());
                result.put("subjectName", subject.getName());
            } else {
                result.put("id", null);
                result.put("studentId", id);
                result.put("subjectId", subject.getId());
                result.put("absences", 0);
                result.put("totalClasses", 40);
                result.put("subjectName", subject.getName());
            }
            return result;
        }).collect(Collectors.toList());
    }
}
