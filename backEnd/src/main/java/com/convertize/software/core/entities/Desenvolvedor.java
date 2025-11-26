package com.convertize.software.core.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Table(name = "desenvolvedor")
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Desenvolvedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String login;
    private String fotoCampo;
    private long valorUsuario;
}
