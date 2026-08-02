package com.model;

import jakarta.persistence.*;

@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String address;
    private String type;
    private Integer units;
    private Double rent;
    
    @Enumerated(EnumType.STRING)
    private PropertyStatus status = PropertyStatus.AVAILABLE;
    
    private String image;
    
    public enum PropertyStatus {
        AVAILABLE, OCCUPIED, MAINTENANCE
    }
    
    // Constructors
    public Property() {}
    
    public Property(String name, String address, String type, Integer units, Double rent, PropertyStatus status, String image) {
        this.name = name;
        this.address = address;
        this.type = type;
        this.units = units;
        this.rent = rent;
        this.status = status;
        this.image = image;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getUnits() { return units; }
    public void setUnits(Integer units) { this.units = units; }
    public Double getRent() { return rent; }
    public void setRent(Double rent) { this.rent = rent; }
    public PropertyStatus getStatus() { return status; }
    public void setStatus(PropertyStatus status) { this.status = status; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}