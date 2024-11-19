package com.security.jwt.controller;

import com.security.jwt.model.User;
import com.security.jwt.service.UserService;
import com.security.jwt.service.jwt.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário registrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao registrar usuário: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> listUsers(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        System.out.println("Lista de usuários: ");
            return ResponseEntity.status(401).build(); // Token ausente ou inválido
        }

        String token = authHeader.substring(7); // Remove "Bearer " do token
        Jwt decodedToken = jwtService.decodeToken(token); // Decodifica o token

        String username = decodedToken.getSubject(); // Obtém o nome do usuário
        User user = userService.findByUsername(username); // Busca no banco
        List<User> users = userService.findAll(); // Obtém a lista de usuários
        System.out.println("Lista de usuários: " + users); // Exibe no console para debug
        return ResponseEntity.ok(users); // Retorna a lista de usuários
    }

}
