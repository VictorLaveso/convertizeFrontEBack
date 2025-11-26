package com.convertize.software.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.convertize.software.business.DesenvolvedorService;
import com.convertize.software.controller.dto.in.DesenvolvedoresRecord;
import com.convertize.software.controller.dto.out.DesenvolvedoresRecordOut;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/desenvolvedores")
public class DesenvolvedoresController {
    private final DesenvolvedorService desenvolvedorService;

    @PostMapping
    public ResponseEntity<DesenvolvedoresRecordOut> criarDesenvolvedor(@RequestBody DesenvolvedoresRecord desenvolvedor) {
        return ResponseEntity.ok(desenvolvedorService.gravarDesenvolvedor(desenvolvedor));
    }

    @GetMapping
    public ResponseEntity<List<DesenvolvedoresRecordOut>> getDesenvolvedores() {
        return ResponseEntity.ok(desenvolvedorService.getTodosDesenvolvedores());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarDesenvolvedor(@PathVariable long id) {
        desenvolvedorService.cancelar(id);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarDesenvolvedores() {
        desenvolvedorService.cancelarTodos();
        return ResponseEntity.accepted().build();
    }

}
