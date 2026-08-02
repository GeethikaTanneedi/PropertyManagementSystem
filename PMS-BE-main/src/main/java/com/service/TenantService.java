package com.service;

import com.model.Tenant;
import com.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TenantService {
    
    @Autowired
    private TenantRepository tenantRepository;
    
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }
    
    public Optional<Tenant> getTenantById(Long id) {
        return tenantRepository.findById(id);
    }
    
    public Tenant createTenant(Tenant tenant) {
        return tenantRepository.save(tenant);
    }
    
    public Tenant updateTenant(Long id, Tenant tenantDetails) {
        Optional<Tenant> optionalTenant = tenantRepository.findById(id);
        if (optionalTenant.isPresent()) {
            Tenant tenant = optionalTenant.get();
            tenant.setName(tenantDetails.getName());
            tenant.setEmail(tenantDetails.getEmail());
            tenant.setPhone(tenantDetails.getPhone());
            tenant.setProperty(tenantDetails.getProperty());
            tenant.setUnit(tenantDetails.getUnit());
            tenant.setLeaseStart(tenantDetails.getLeaseStart());
            tenant.setLeaseEnd(tenantDetails.getLeaseEnd());
            tenant.setRent(tenantDetails.getRent());
            tenant.setStatus(tenantDetails.getStatus());
            return tenantRepository.save(tenant);
        }
        return null;
    }
    
    public boolean deleteTenant(Long id) {
        if (tenantRepository.existsById(id)) {
            tenantRepository.deleteById(id);
            return true;
        }
        return false;
    }
}