package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dao.CountryRepository;
import com.ecommerce.dao.StateRepository;
import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;

@RestController
@RequestMapping("/state")
public class StateController {

	@Autowired
	private StateRepository stateRepository;
	
	@Autowired
	private CountryRepository countryRepository;
	
	@GetMapping("/all")
	public List<State> getAllState(){
	  return (List<State>) this.stateRepository.findAll();
	}
	
	@GetMapping("/all/{countryName}")
	public List<State> getAllStateByCountryName(@PathVariable("countryName") String countryName){
	  Country c = this.countryRepository.findByName(countryName);
	    return (List<State>) this.stateRepository.findByCountryId(c);
	}
}
