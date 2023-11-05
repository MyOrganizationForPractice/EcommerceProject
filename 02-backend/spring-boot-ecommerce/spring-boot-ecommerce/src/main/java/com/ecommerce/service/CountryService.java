package com.ecommerce.service;

import java.util.List;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;

public interface CountryService {

	public List<Country> getAllCountry();
	
	public List<State> getCountryById(Country c);
}
