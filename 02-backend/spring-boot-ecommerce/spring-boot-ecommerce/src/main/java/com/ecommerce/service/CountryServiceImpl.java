package com.ecommerce.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.CountryRepository;
import com.ecommerce.dao.StateRepository;
import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;

@Service
public class CountryServiceImpl implements CountryService{

	@Autowired
	private CountryRepository countryRepository;
	
	@Autowired
	private StateRepository stateRepository;
	
	@Override
	public List<Country> getAllCountry() {
		return (List<Country>) this.countryRepository.findAll();
	}

	@Override
	public List<State> getCountryById(Country CountryId) {
		return	this.stateRepository.findByCountryId(CountryId);
	}

}
