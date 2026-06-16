package com.ttknpdev.understandhowtoworkwithangular.repositories;

import com.ttknpdev.understandhowtoworkwithangular.entities.one.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryEmployee extends JpaRepository<Employee,Long> {
}
