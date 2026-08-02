package com.controller;

import com.model.Tenant;
import com.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin(origins = "http://localhost:3000")
public class TenantController {
    
    @Autowired
    private TenantService tenantService;
    
    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getTenantById(@PathVariable Long id) {
        return tenantService.getTenantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantService.createTenant(tenant);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenantDetails) {
        Tenant updatedTenant = tenantService.updateTenant(id, tenantDetails);
        return updatedTenant != null ? ResponseEntity.ok(updatedTenant) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        return tenantService.deleteTenant(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}