package com.ttknpdev.understandhowtoworkwithangular.controller;

import com.ttknpdev.understandhowtoworkwithangular.entities.many.Address;
import com.ttknpdev.understandhowtoworkwithangular.log.Logging;
import com.ttknpdev.understandhowtoworkwithangular.services.ServiceAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins="http://localhost:4200") // very importance it works like module cors in node
@RestController
@RequestMapping(value = "/api/address")
public class EndPointAddress {

    private final ServiceAddress<Address> serviceAddress;

    @Autowired
    public EndPointAddress(ServiceAddress<Address> serviceAddress) {
        this.serviceAddress = serviceAddress;
    }

    @GetMapping(value = "/reads")
    private ResponseEntity<?> reads() {
        Iterable<Address> addresses = serviceAddress.reads();
        Logging.endpointAddress.warn("endpoint \"/reads\" is calling");
        return ResponseEntity
                .accepted()
                .body(addresses);
    }
    @GetMapping(value = "/read/{aid}")
    private ResponseEntity<?> read(@PathVariable Long aid) {
        Logging.endpointAddress.warn("endpoint \"/read/aid\" is calling");
        return ResponseEntity
                .accepted()
                .body(serviceAddress.read(aid));
    }
    @DeleteMapping(value = "/delete/{aid}")
    private ResponseEntity<?> delete(@PathVariable Long aid) {
        Logging.endpointAddress.warn("endpoint \"/delete/aid\" is calling");
        return ResponseEntity
                .ok()
                .body(serviceAddress.delete(aid));
    }
    @PostMapping(value = "/create/{eid}")
    private ResponseEntity<?> create (@RequestBody Address address , @PathVariable Long eid) {
        Logging.endpointAddress.warn("endpoint \"/create/eid\" is calling");
        return ResponseEntity
                .accepted()
                .body(serviceAddress.create(address,eid));
        // return null;
    }

    @PutMapping(value = "/update")
    private ResponseEntity<?> update (@RequestBody Address address) {
        Logging.endpointAddress.warn("endpoint \"/update\" is calling");
        return ResponseEntity
                .accepted()
                .body(serviceAddress.update(address,address.get_aid()));
    }


}
