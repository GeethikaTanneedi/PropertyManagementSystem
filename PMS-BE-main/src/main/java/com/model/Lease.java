package com.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "leases")
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private Tenant tenant;
    
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
    
    private String unit;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double monthlyRent;
    private Double securityDeposit;
    
    @Enumerated(EnumType.STRING)
    private LeaseStatus status = LeaseStatus.ACTIVE;
    
    private String terms;
    
    public enum LeaseStatus {
        ACTIVE, EXPIRED, TERMINATED, PENDING
    }
    
    // Constructors
    public Lease() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Tenant getTenant() { return tenant; }
    public void setTenant(Tenant tenant) { this.tenant = tenant; }
    public Property getProperty() { return property; }
    public void setProperty(Property property) { this.property = property; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public Double getMonthlyRent() { return monthlyRent; }
    public void setMonthlyRent(Double monthlyRent) { this.monthlyRent = monthlyRent; }
    public Double getSecurityDeposit() { return securityDeposit; }
    public void setSecurityDeposit(Double securityDeposit) { this.securityDeposit = securityDeposit; }
    public LeaseStatus getStatus() { return status; }
    public void setStatus(LeaseStatus status) { this.status = status; }
    public String getTerms() { return terms; }
    public void setTerms(String terms) { this.terms = terms; }
}