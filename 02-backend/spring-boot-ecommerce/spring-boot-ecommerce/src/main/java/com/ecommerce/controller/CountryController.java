package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;
import com.ecommerce.service.CountryService;

@RestController
@RequestMapping("/country")
public class CountryController {
	
	@Autowired
	private CountryService countryService;
	
	@GetMapping("/All")
	public ResponseEntity<List<Country>> getAllCountry(){
	 List<Country> countrys =	this.countryService.getAllCountry();
		return new ResponseEntity<>(countrys, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{CountryId}")
	public ResponseEntity<List<State>> getAllCountry(@PathVariable("CountryId") int CountryId){
		Country c = new Country();
		c.setId(CountryId);
		List<State> country =	this.countryService.getCountryById(c);
		return new ResponseEntity<>(country, HttpStatus.ACCEPTED);
	}

}
