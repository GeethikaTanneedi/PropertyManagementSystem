package com.service;

import com.model.Property;
import com.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
    
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }
    
    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }
    
    public Property updateProperty(Long id, Property propertyDetails) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        if (optionalProperty.isPresent()) {
            Property property = optionalProperty.get();
            property.setName(propertyDetails.getName());
            property.setAddress(propertyDetails.getAddress());
            property.setType(propertyDetails.getType());
            property.setUnits(propertyDetails.getUnits());
            property.setRent(propertyDetails.getRent());
            property.setStatus(propertyDetails.getStatus());
            property.setImage(propertyDetails.getImage());
            return propertyRepository.save(property);
        }
        return null;
    }
    
    public boolean deleteProperty(Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}