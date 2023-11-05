package com.ecommerce.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.entity.Country;

@Repository
public interface CountryRepository extends CrudRepository<Country, Integer>{

	@Query("SELECT c FROM Country c WHERE c.name= :countryName")
	public Country findByName(@Param("countryName") String countryName);
}
