package com.ttknpdev.understandhowtoworkwithangular.services.one;

import com.ttknpdev.understandhowtoworkwithangular.entities.many.Address;
import com.ttknpdev.understandhowtoworkwithangular.entities.one.Employee;
import com.ttknpdev.understandhowtoworkwithangular.log.Logging;
import com.ttknpdev.understandhowtoworkwithangular.repositories.AddressRepository;
import com.ttknpdev.understandhowtoworkwithangular.repositories.EmployeeRepository;
import com.ttknpdev.understandhowtoworkwithangular.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DaoEmployeeService implements EmployeeService<Employee> {

    private final EmployeeRepository employeeRepository;
    private final AddressRepository addressRepository;

    @Autowired
    public DaoEmployeeService(EmployeeRepository employeeRepository, AddressRepository addressRepository) {
        this.employeeRepository = employeeRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    public Iterable<Employee> reads() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> readsOnlyEmployee() {
        Iterable<Employee> employees = employeeRepository.findAll();
        List<Employee> modify = new ArrayList<>();
        for (Employee employee :  employees) {
            employee.set_addresses(null);
            modify.add(employee);
        }
        return modify;
    }

    @Override
    public Employee read(Long eid) {
        Employee employee = new Employee();
        employeeRepository.findById(eid).ifPresent(employeePresent -> {
            employee.set_eid(employeePresent.get_eid());
            employee.set_fullname(employeePresent.get_fullname());
            employee.set_age(employeePresent.get_age());
            employee.set_position(employeePresent.get_position());
            employee.set_salary(employeePresent.get_salary());
        });
        return employee;
    }

    @Override
    public Employee create(Employee obj) {
        return employeeRepository.save(obj);
    }

    @Override
    public Map<String, Boolean> delete(Long eid) {
        Map<String,Boolean> response = new HashMap<>();
        employeeRepository.findById(eid).ifPresent(employee -> {
            List< Address> addresses  = (List<Address>) addressRepository.readsAddressesByFK(eid);
                if (addresses.isEmpty()) {
                    employeeRepository.delete(employee);
                    response.put("data",true);
                    Logging.daoEmployee.info("deleted employee");
                }
                else {
                    Logging.daoEmployee.info("delete employee failed");
                    response.put("data",false);
                }
        });
        return response;
    }

    @Override
    public Map<String, Boolean> update(Employee obj, Long eid) {
        Map<String,Boolean> response = new HashMap<>();
        response.put("data",false);
        employeeRepository.findById(eid).ifPresent(employee -> {
            employee.set_fullname(obj.get_fullname());
            employee.set_age(obj.get_age());
            employee.set_salary(obj.get_salary());
            employee.set_position(obj.get_position());
            Logging.daoEmployee.info("can update");
            employeeRepository.save(employee);
            response.put("data",true);
        });
        return response;
    }

}
