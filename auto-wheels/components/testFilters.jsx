'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const VehicleFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    cities: [],
    areas: [],
    // Add more filter states as needed
  });

  const handleCheckboxChange = (filterType, value, isChecked) => {
    const newFilters = { ...filters };
    
    if (isChecked) {
      newFilters[filterType].push(value);
    } else {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }

    setFilters(newFilters);
    updateCustomUrl(newFilters);
  };

  const updateCustomUrl = (params) => {
    let customUrl = '/listing/cars/search/-/';
    
    // Add cities
    if (params.cities.length) {
      params.cities.forEach(city => {
        customUrl += `ct_${city.toLowerCase()}/`;
      });
    }

    // Add areas
    if (params.areas.length) {
      params.areas.forEach(area => {
        customUrl += `ca_${area.toLowerCase().replace(/ /g, '-')}/`;
      });
    }
    router.push(customUrl, { scroll: false });
  };

  return (
    <div>
      <h3>Filter Vehicles</h3>
      <label>
        <input
          type="checkbox"
          checked={filters.cities.includes('Lahore')}
          onChange={(e) => handleCheckboxChange('cities', 'Lahore', e.target.checked)}
        />
        Lahore
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.cities.includes('Islamabad')}
          onChange={(e) => handleCheckboxChange('cities', 'Islamabad', e.target.checked)}
        />
        Islamabad
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.areas.includes('DHA Defence 7')}
          onChange={(e) => handleCheckboxChange('areas', 'DHA Defence 7', e.target.checked)}
        />
        DHA Defence 7
      </label>
      {/* Add more filters as needed */}
    </div>
  );
};

export default VehicleFilters;
