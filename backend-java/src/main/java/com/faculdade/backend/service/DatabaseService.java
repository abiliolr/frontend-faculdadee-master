package com.faculdade.backend.service;

import com.faculdade.backend.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

@Service
public class DatabaseService {

    private static final String DB_FILE = "db.json";
    private final ObjectMapper objectMapper = new ObjectMapper();
    private DataStore dataStore = new DataStore();

    @PostConstruct
    public void init() {
        loadData();
        seedData();
    }

    private void loadData() {
        File file = new File(DB_FILE);
        if (file.exists()) {
            try {
                dataStore = objectMapper.readValue(file, DataStore.class);
            } catch (IOException e) {
                System.err.println("Error reading DB file: " + e.getMessage());
            }
        }
    }

    public synchronized void saveData() {
        try {
            objectMapper.writeValue(new File(DB_FILE), dataStore);
        } catch (IOException e) {
            System.err.println("Error saving DB file: " + e.getMessage());
        }
    }

    private void seedData() {
        // Ensure lists are initialized
        if (dataStore.getUsers() == null) dataStore.setUsers(new ArrayList<>());
        if (dataStore.getSubjects() == null) dataStore.setSubjects(new ArrayList<>());
        if (dataStore.getGrades() == null) dataStore.setGrades(new ArrayList<>());
        if (dataStore.getAttendance() == null) dataStore.setAttendance(new ArrayList<>());
        if (dataStore.getExams() == null) dataStore.setExams(new ArrayList<>());

        if (dataStore.getUsers().isEmpty()) {
            System.out.println("Seeding database...");

            // Admin
            User admin = new User();
            admin.setId(1L);
            admin.setUsername("admin");
            admin.setPassword("123");
            admin.setRole("admin");
            admin.setName("Administrador do Sistema");
            dataStore.getUsers().add(admin);

            // Professor
            User prof = new User();
            prof.setId(2L);
            prof.setUsername("prof");
            prof.setPassword("123");
            prof.setRole("professor");
            prof.setName("Prof. Girafales");
            dataStore.getUsers().add(prof);

            // Student
            User student = new User();
            student.setId(3L);
            student.setUsername("aluno");
            student.setPassword("123");
            student.setRole("student");
            student.setName("Roberto Bolaños");
            dataStore.getUsers().add(student);

            // Subjects
            Subject math = new Subject();
            math.setId(101L);
            math.setName("Matemática");
            math.setProfessorId(2L);
            dataStore.getSubjects().add(math);

            Subject port = new Subject();
            port.setId(102L);
            port.setName("Português");
            port.setProfessorId(2L);
            dataStore.getSubjects().add(port);

            // Grades
            Grade g1 = new Grade();
            g1.setId(1L);
            g1.setStudentId(3L);
            g1.setSubjectId(101L);
            g1.setNota1(8.5);
            dataStore.getGrades().add(g1);

            Grade g2 = new Grade();
            g2.setId(2L);
            g2.setStudentId(3L);
            g2.setSubjectId(102L);
            g2.setNota1(6.0);
            g2.setNota2(7.0);
            dataStore.getGrades().add(g2);

            // Attendance
            Attendance a1 = new Attendance();
            a1.setId(1L);
            a1.setStudentId(3L);
            a1.setSubjectId(101L);
            a1.setAbsences(2);
            a1.setTotalClasses(40);
            dataStore.getAttendance().add(a1);

            Attendance a2 = new Attendance();
            a2.setId(2L);
            a2.setStudentId(3L);
            a2.setSubjectId(102L);
            a2.setAbsences(0);
            a2.setTotalClasses(40);
            dataStore.getAttendance().add(a2);

            saveData();
        }
    }

    public DataStore getDataStore() {
        return dataStore;
    }
}
