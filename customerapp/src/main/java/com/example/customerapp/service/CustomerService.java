package com.example.customerapp.service;

import com.example.customerapp.entity.Customer;
import com.example.customerapp.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Customer createCustomer(Customer customer) {
        return repository.save(customer);
    }

    // READ
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    // UPDATE
    public Customer updateCustomer(Long id, Customer customer) {
        Customer existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existing.setName(customer.getName());
        existing.setAddress(customer.getAddress());

        return repository.save(existing);
    }

    // DELETE
    public void deleteCustomer(Long id) {
        repository.deleteById(id);
    }
}
