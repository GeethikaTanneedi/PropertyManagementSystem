package com.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tenants")
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    private String phone;
    
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
    
    private String unit;
    private LocalDate leaseStart;
    private LocalDate leaseEnd;
    private Double rent;
    
    @Enumerated(EnumType.STRING)
    private TenantStatus status = TenantStatus.ACTIVE;
    
    public enum TenantStatus {
        ACTIVE, PENDING, INACTIVE
    }
    
    // Constructors
    public Tenant() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Property getProperty() { return property; }
    public void setProperty(Property property) { this.property = property; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public LocalDate getLeaseStart() { return leaseStart; }
    public void setLeaseStart(LocalDate leaseStart) { this.leaseStart = leaseStart; }
    public LocalDate getLeaseEnd() { return leaseEnd; }
    public void setLeaseEnd(LocalDate leaseEnd) { this.leaseEnd = leaseEnd; }
    public Double getRent() { return rent; }
    public void setRent(Double rent) { this.rent = rent; }
    public TenantStatus getStatus() { return status; }
    public void setStatus(TenantStatus status) { this.status = status; }
}