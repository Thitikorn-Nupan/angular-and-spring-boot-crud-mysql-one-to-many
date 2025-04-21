package com.ttknpdev.understandhowtoworkwithangular.controller;

import com.ttknpdev.understandhowtoworkwithangular.entities.one.Employee;
import com.ttknpdev.understandhowtoworkwithangular.log.Logging;
import com.ttknpdev.understandhowtoworkwithangular.services.ServiceEmployee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200") // very importance it works like module cors in node
@RestController
@RequestMapping(value = "/api/employee")
public class EndPointEmployee {

    private final ServiceEmployee<Employee> serviceEmployee;

    @Autowired
    public EndPointEmployee(ServiceEmployee<Employee> serviceEmployee) {
        this.serviceEmployee = serviceEmployee;
    }

    @GetMapping(value = "/reads")
    private ResponseEntity<?> reads() {
        Iterable<Employee> employees = serviceEmployee.reads();
        Logging.endpointEmployee.warn("endpoint \"/reads\" is calling");
        return ResponseEntity
                .accepted()
                .body(employees);
    }
    @GetMapping(value = "/reads/only")
    private ResponseEntity<?> readsOnlyEmployee() {
        Iterable<Employee> employees = serviceEmployee.readsOnlyEmployee();
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
                .body(serviceEmployee.read(eid));
    }
    @PostMapping(value = "/create")
    private ResponseEntity<?> create(@RequestBody Employee employee) {
        Logging.endpointEmployee.warn("endpoint \"/create\" is calling");
        return ResponseEntity
                .accepted()
                .body(serviceEmployee.create(employee));
    }

    @DeleteMapping(value = "/delete/{eid}")
    private ResponseEntity<?> delete(@PathVariable Long eid) {
        Logging.endpointEmployee.warn("endpoint \"/delete/{eid}\" is calling");
        return ResponseEntity
                .ok(serviceEmployee.delete(eid));
    }

    @PutMapping(value = "/update/{eid}")
    private ResponseEntity<?> update(@RequestBody Employee employee,@PathVariable Long eid) {
        Logging.endpointEmployee.warn("endpoint \"/update/{eid}\" is calling");
        return ResponseEntity
                .ok(serviceEmployee.update(employee,eid));
    }

}
