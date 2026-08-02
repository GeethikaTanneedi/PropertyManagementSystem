package com.service;

import com.model.Payment;
import com.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
    
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    
    public Payment updatePayment(Long id, Payment paymentDetails) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            payment.setTenant(paymentDetails.getTenant());
            payment.setProperty(paymentDetails.getProperty());
            payment.setUnit(paymentDetails.getUnit());
            payment.setAmount(paymentDetails.getAmount());
            payment.setDueDate(paymentDetails.getDueDate());
            payment.setPaidDate(paymentDetails.getPaidDate());
            payment.setStatus(paymentDetails.getStatus());
            payment.setPaymentMethod(paymentDetails.getPaymentMethod());
            payment.setNotes(paymentDetails.getNotes());
            return paymentRepository.save(payment);
        }
        return null;
    }
    
    public boolean deletePayment(Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}