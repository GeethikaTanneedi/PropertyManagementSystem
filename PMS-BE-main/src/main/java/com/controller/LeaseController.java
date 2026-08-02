package com.controller;

import com.model.Lease;
import com.service.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leases")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaseController {
    
    @Autowired
    private LeaseService leaseService;
    
    @GetMapping
    public List<Lease> getAllLeases() {
        return leaseService.getAllLeases();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Lease> getLeaseById(@PathVariable Long id) {
        return leaseService.getLeaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Lease createLease(@RequestBody Lease lease) {
        return leaseService.createLease(lease);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Lease> updateLease(@PathVariable Long id, @RequestBody Lease leaseDetails) {
        Lease updatedLease = leaseService.updateLease(id, leaseDetails);
        return updatedLease != null ? ResponseEntity.ok(updatedLease) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLease(@PathVariable Long id) {
        return leaseService.deleteLease(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}