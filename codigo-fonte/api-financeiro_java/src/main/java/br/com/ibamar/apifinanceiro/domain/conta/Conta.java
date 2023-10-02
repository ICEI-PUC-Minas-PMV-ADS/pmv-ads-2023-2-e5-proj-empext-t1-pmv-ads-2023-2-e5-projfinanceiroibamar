package br.com.ibamar.apifinanceiro.domain.conta;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity(name = "contas")
@Table(name = "contas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Conta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String descricao;

    private BigDecimal saldo;
}
