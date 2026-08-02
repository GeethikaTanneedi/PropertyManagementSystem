package com.service;

import com.model.Lease;
import com.repository.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LeaseService {
    
    @Autowired
    private LeaseRepository leaseRepository;
    
    public List<Lease> getAllLeases() {
        return leaseRepository.findAll();
    }
    
    public Optional<Lease> getLeaseById(Long id) {
        return leaseRepository.findById(id);
    }
    
    public Lease createLease(Lease lease) {
        return leaseRepository.save(lease);
    }
    
    public Lease updateLease(Long id, Lease leaseDetails) {
        Optional<Lease> optionalLease = leaseRepository.findById(id);
        if (optionalLease.isPresent()) {
            Lease lease = optionalLease.get();
            lease.setTenant(leaseDetails.getTenant());
            lease.setProperty(leaseDetails.getProperty());
            lease.setUnit(leaseDetails.getUnit());
            lease.setStartDate(leaseDetails.getStartDate());
            lease.setEndDate(leaseDetails.getEndDate());
            lease.setMonthlyRent(leaseDetails.getMonthlyRent());
            lease.setSecurityDeposit(leaseDetails.getSecurityDeposit());
            lease.setStatus(leaseDetails.getStatus());
            lease.setTerms(leaseDetails.getTerms());
            return leaseRepository.save(lease);
        }
        return null;
    }
    
    public boolean deleteLease(Long id) {
        if (leaseRepository.existsById(id)) {
            leaseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}