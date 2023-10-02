package br.com.ibamar.apifinanceiro.repositories;

import br.com.ibamar.apifinanceiro.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findUsuarioByLogin(String login);

    Optional<Usuario> findUsuarioById(Long id);






}
