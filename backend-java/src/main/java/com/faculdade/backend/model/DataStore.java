package com.faculdade.backend.model;

import java.util.ArrayList;
import java.util.List;

public class DataStore {
    private List<User> users = new ArrayList<>();
    private List<Subject> subjects = new ArrayList<>();
    private List<Grade> grades = new ArrayList<>();
    private List<Attendance> attendance = new ArrayList<>();
    private List<Exam> exams = new ArrayList<>();

    public List<User> getUsers() { return users; }
    public void setUsers(List<User> users) { this.users = users; }
    public List<Subject> getSubjects() { return subjects; }
    public void setSubjects(List<Subject> subjects) { this.subjects = subjects; }
    public List<Grade> getGrades() { return grades; }
    public void setGrades(List<Grade> grades) { this.grades = grades; }
    public List<Attendance> getAttendance() { return attendance; }
    public void setAttendance(List<Attendance> attendance) { this.attendance = attendance; }
    public List<Exam> getExams() { return exams; }
    public void setExams(List<Exam> exams) { this.exams = exams; }
}
