package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Long> {
}
