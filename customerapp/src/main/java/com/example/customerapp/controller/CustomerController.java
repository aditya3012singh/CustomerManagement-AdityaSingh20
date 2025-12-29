package com.example.customerapp.controller;

import com.example.customerapp.entity.Customer;
import com.example.customerapp.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    // POST /customers
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return service.createCustomer(customer);
    }

    // GET /customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    // PUT /customers/{id}
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer) {
        return service.updateCustomer(id, customer);
    }

    // DELETE /customers/{id}
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        service.deleteCustomer(id);
        return "Customer deleted successfully";
    }
}
