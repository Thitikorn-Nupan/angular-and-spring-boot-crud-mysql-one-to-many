package com.ttknpdev.understandhowtoworkwithangular.services.many;

import com.ttknpdev.understandhowtoworkwithangular.entities.many.Address;
import com.ttknpdev.understandhowtoworkwithangular.log.Logging;
import com.ttknpdev.understandhowtoworkwithangular.repositories.RepositoryAddress;
import com.ttknpdev.understandhowtoworkwithangular.repositories.RepositoryEmployee;
import com.ttknpdev.understandhowtoworkwithangular.services.ServiceAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DaoAddress implements ServiceAddress<Address> {

    private final RepositoryAddress repositoryAddress;
    private final RepositoryEmployee repositoryEmployee;

    @Autowired
    public DaoAddress(RepositoryAddress repositoryAddress, RepositoryEmployee repositoryEmployee) {
        this.repositoryAddress = repositoryAddress;
        this.repositoryEmployee = repositoryEmployee;
    }

    @Override
    public Iterable<Address> reads() {
        return repositoryAddress.findAll();
    }

    @Override
    public Map<String, Boolean> create(Address obj, Long eid) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("data", false);
        repositoryEmployee.findById(eid).ifPresent(employee -> {
            obj.setEmployee(employee);
            repositoryAddress.save(obj);
            response.put("data", true);
        });
        // when failed to create
        // set false it will be good to do something after that
        return response;
    }

    @Override
    public Address read(Long aid) {
        Address address = new Address();
        repositoryAddress.findById(aid).ifPresent(addressPresent -> {
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
        // Logging.daoAddress.info("work");
        repositoryAddress.findById(aid)
                .ifPresent((address) -> {
                    repositoryAddress.delete(address);
                    response.put("data", true);
                });
        return response;
    }

    @Override
    public Map<String, Boolean> update(Address obj, Long aid) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("data", false);
        repositoryAddress.findById(aid)
                .ifPresent((address) -> {
                    address.set_country(obj.get_country());
                    address.set_city(obj.get_city());
                    address.set_details(obj.get_details());
                    repositoryAddress.save(address);
                    response.put("data", true);
                });
        return response;
    }
}
