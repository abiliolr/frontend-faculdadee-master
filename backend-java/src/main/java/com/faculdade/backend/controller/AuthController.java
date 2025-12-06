package com.faculdade.backend.controller;

import com.faculdade.backend.model.User;
import com.faculdade.backend.service.AuthService;
import com.faculdade.backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private DatabaseService db;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<User> userOpt = db.getDataStore().getUsers().stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst();

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = authService.generateToken(user);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "user", user
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciais inválidas"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        // Handle alias keys from frontend if any
        String username = body.get("username") != null ? body.get("username") : body.get("login");
        String password = body.get("password") != null ? body.get("password") : body.get("senha");
        String name = body.get("name") != null ? body.get("name") : body.get("usuarioNome");
        String role = body.get("role") != null ? body.get("role") : "student";
        String email = body.getOrDefault("email", "");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Login e senha são obrigatórios"));
        }

        boolean exists = db.getDataStore().getUsers().stream()
                .anyMatch(u -> u.getUsername().equals(username));

        if (exists) {
            return ResponseEntity.badRequest().body(Map.of("message", "Usuário já existe"));
        }

        User newUser = new User();
        newUser.setId(System.currentTimeMillis());
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setName(name);
        newUser.setRole(role);
        newUser.setEmail(email);

        db.getDataStore().getUsers().add(newUser);
        db.saveData();

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Usuário criado com sucesso"));
    }
}
