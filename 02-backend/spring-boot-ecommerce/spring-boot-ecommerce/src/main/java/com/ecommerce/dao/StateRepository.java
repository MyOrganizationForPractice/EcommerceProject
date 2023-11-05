package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;

public interface StateRepository extends CrudRepository<State, Integer>{
	
	@Query("SELECT s FROM State s WHERE s.country = :CountryId")
	public List<State> findByCountryId(@Param("CountryId") Country CountryId);
	
	@Query("SELECT s FROM State s WHERE s.country= :countryName")
	public List<State> findAllByCounytryName(@Param("countryName") Country countryName);
}
