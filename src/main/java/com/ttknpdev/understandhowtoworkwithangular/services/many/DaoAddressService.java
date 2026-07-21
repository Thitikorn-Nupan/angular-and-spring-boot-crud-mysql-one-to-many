package com.ttknpdev.understandhowtoworkwithangular.services.many;

import com.ttknpdev.understandhowtoworkwithangular.entities.many.Address;
import com.ttknpdev.understandhowtoworkwithangular.repositories.AddressRepository;
import com.ttknpdev.understandhowtoworkwithangular.repositories.EmployeeRepository;
import com.ttknpdev.understandhowtoworkwithangular.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DaoAddressService implements AddressService<Address> {

    private final AddressRepository addressRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public DaoAddressService(AddressRepository addressRepository, EmployeeRepository employeeRepository) {
        this.addressRepository = addressRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Iterable<Address> reads() {
        return addressRepository.findAll();
    }

    @Override
    public Map<String, Boolean> create(Address obj, Long eid) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("data", false);
        employeeRepository.findById(eid).ifPresent(employee -> {
            obj.setEmployee(employee);
            addressRepository.save(obj);
            response.put("data", true);
        });
        return response;
    }

    @Override
    public Address read(Long aid) {
        Address address = new Address();
        addressRepository.findById(aid).ifPresent(addressPresent -> {
            address.set_aid(addressPresent.get_aid());
            address.set_country(addressPresent.get_country());
            address.set_city(addressPresent.get_city());
            address.set_details(addressPresent.get_details());
        });
        return address;
    }

    @Override
    public Map<String, Boolean> delete(Long aid) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("data", false);
        addressRepository
                .findById(aid)
                .ifPresent((address) -> {
                    addressRepository.delete(address);
                    response.put("data", true);
                });
        return response;
    }

    @Override
    public Map<String, Boolean> update(Address obj, Long aid) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("data", false);
        addressRepository
                .findById(aid)
                .ifPresent((address) -> {
                    address.set_country(obj.get_country());
                    address.set_city(obj.get_city());
                    address.set_details(obj.get_details());
                    addressRepository.save(address);
                    response.put("data", true);
                });
        return response;
    }
}
