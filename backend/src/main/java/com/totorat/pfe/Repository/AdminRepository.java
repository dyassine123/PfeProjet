package com.totorat.pfe.Repository;

import com.totorat.pfe.Entite.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    boolean existsByEmail(String email);

    Admin findAdminByEmail(String email);
}
