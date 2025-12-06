package com.faculdade.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Grade {
    private Long id;
    private Long studentId;
    private Long subjectId;
    private Double nota1;
    private Double nota2;
    // Keep 'value' for backward compatibility during read if needed, but primary is nota1/nota2
    private Double value;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }
    public Double getNota1() { return nota1; }
    public void setNota1(Double nota1) { this.nota1 = nota1; }
    public Double getNota2() { return nota2; }
    public void setNota2(Double nota2) { this.nota2 = nota2; }
    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}
