package br.com.ibamar.apifinanceiro.domain.categoria;


import jakarta.persistence.*;
import lombok.*;

@Entity(name = "categorias")
@Table(name = "categorias")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String descricao;

    private TipoCategoria tipo;
}
