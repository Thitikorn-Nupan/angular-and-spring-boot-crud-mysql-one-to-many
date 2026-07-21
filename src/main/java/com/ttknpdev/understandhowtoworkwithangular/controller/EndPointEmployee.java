package com.ttknpdev.understandhowtoworkwithangular.controller;

import com.ttknpdev.understandhowtoworkwithangular.entities.one.Employee;
import com.ttknpdev.understandhowtoworkwithangular.log.Logging;
import com.ttknpdev.understandhowtoworkwithangular.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200") // very importance it works like module cors in node
@RestController
@RequestMapping(value = "/api/employee")
public class EndPointEmployee {

    private final EmployeeService<Employee> employeeService;

    @Autowired
    public EndPointEmployee(EmployeeService<Employee> employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping(value = "/reads")
    private ResponseEntity<?> reads() {
        Iterable<Employee> employees = employeeService.reads();
        Logging.endpointEmployee.warn("endpoint \"/reads\" is calling");
        return ResponseEntity
                .accepted()
                .body(employees);
    }
    @GetMapping(value = "/reads/only")
    private ResponseEntity<?> readsOnlyEmployee() {
        Iterable<Employee> employees = employeeService.readsOnlyEmployee();
        Logging.endpointEmployee.warn("endpoint \"/reads/only\" is calling");
        return ResponseEntity
                .accepted()
                .body(employees);
    }
    @GetMapping(value = "/read/{eid}")
    private ResponseEntity<?> read(@PathVariable Long eid) {
        Logging.endpointEmployee.warn("endpoint \"/read/{eid}\" is calling");
        return ResponseEntity
                .accepted()
                .body(employeeService.read(eid));
    }
    @PostMapping(value = "/create")
    private ResponseEntity<?> create(@RequestBody Employee employee) {
        Logging.endpointEmployee.warn("endpoint \"/create\" is calling");
        return ResponseEntity
                .accepted()
                .body(employeeService.create(employee));
    }

    @DeleteMapping(value = "/delete/{eid}")
    private ResponseEntity<?> delete(@PathVariable Long eid) {
        Logging.endpointEmployee.warn("endpoint \"/delete/{eid}\" is calling");
        return ResponseEntity
                .ok(employeeService.delete(eid));
    }

    @PutMapping(value = "/update/{eid}")
    private ResponseEntity<?> update(@RequestBody Employee employee,@PathVariable Long eid) {
        Logging.endpointEmployee.warn("endpoint \"/update/{eid}\" is calling");
        return ResponseEntity
                .ok(employeeService.update(employee,eid));
    }

}
