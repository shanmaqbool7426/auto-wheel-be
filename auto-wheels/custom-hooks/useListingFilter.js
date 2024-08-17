// 'use client'
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { API_ENDPOINTS } from "@/constants/api-endpoints";
// const useListingFilter = (options={}) => {
//   const {type='car'} = options
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const [resetFetch,setResetFetch]=useState(false);
//   const [isFetched,setIsFetched]=useState(false);
//   const [imediateFetch,setImediateFetch]=useState(false);
//   const [filters, setFilters] = useState({
//     city: "",
//     search:"",
//     condition: "Condition",
//     make: [],
//     model: [],
//     mileage: [100, 2000000],
//     price: [1200000, 2000000],
//     year: [2000, 2024],
//     transmission: "Transmission",
//     drive: "Drive",
//     exteriorColor: "Exterior Color",
//     fuelType: "Fuel Type",
//     bodyType: "",
//   });

//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const [fetchedData, setFetchedData] = useState([]);
//   const [pagination, setPagination] = useState({
//     count: 0,
//     page: 1,
//     limit: 10,
//   });
//   const [sortOrder, setSortOrder] = useState('latest');
//   const fetchData = () => {
//     const query = {
//       type:typeMapping[type] || type,
//       page: pagination.page,
//       limit: pagination.limit,
//       sort: sortOrder,
//     };
  
//     // Add filters to the query only if they are not empty or default
//     if (filters.city) query.city = filters.city;
//     if (filters.search) query.search = filters.search;
//     if (filters.condition !== "Condition") query.condition = filters.condition;
//     if (filters.make.length > 0) query.make = filters.make.join(',');
//     if (filters.model.length > 0) query.model = filters.model.join(',');
//     if (filters.transmission !== "Transmission") query.transmission = filters.transmission;
//     if (filters.drive !== "Drive") query.drive = filters.drive;
//     if (filters.exteriorColor !== "Exterior Color") query.exteriorColor = filters.exteriorColor;
//     if (filters.fuelType !== "Fuel Type") query.fuelType = filters.fuelType;
//     if (filters.bodyType) query.bodyType = filters.bodyType;
  
//     // Add mileage, price, and year ranges if they are different from the defaults
//     if (filters.mileage[0] !== 100 || filters.mileage[1] !== 2000000) {
//       query.mileageMin = filters.mileage[0];
//       query.mileageMax = filters.mileage[1];
//     }
//     if (filters.price[0] !== 1200000 || filters.price[1] !== 2000000) {
//       query.priceMin = filters.price[0];
//       query.priceMax = filters.price[1];
//     }
//     if (filters.price[0] !== 2000 || filters.price[1] !== 2024) {
//       query.yearMin = filters.year[0];
//       query.yearMax = filters.year[1];
//     }
      
//     fetch(`${API_ENDPOINTS?.VEHICLES_Listing}?${new URLSearchParams(query)}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFetchedData(data?.data?.results);
//         setPagination((prev) => ({
//           ...prev,
//           count: data?.data?.count,
//         }));
//         setResetFetch(false);
//       });
//   };
  

//   useEffect(() => {
//     const currentParams = Object.fromEntries(searchParams.entries());
//     const updatedFilters = {
//       city: currentParams.city || "",
//       search: currentParams.search || "",
//       condition: currentParams.condition || "Condition",
//       make: currentParams.make ? currentParams.make.split(',') : [],
//       model: currentParams.model ? currentParams.model.split(',') : [],
//       mileage: currentParams.mileage ? currentParams.mileage.split(',').map(Number) : [100, 2000000],
//       price: currentParams.price ? currentParams.price.split(',').map(Number) : [1200000, 2000000],
//       year: currentParams.year ? currentParams.year.split(',').map(Number) : [2000, 2024],
//       transmission: currentParams.transmission || "Transmission",
//       drive: currentParams.drive || "Drive",
//       exteriorColor: currentParams.exteriorColor || "Exterior Color",
//       fuelType: currentParams.fuelType || "Fuel Type",
//       bodyType: currentParams.bodyType || "",
//     };

//     setFilters(updatedFilters);
//     setImediateFetch(true)
//   }, [searchParams]);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       if (debouncedQuery) {
//         fetchData();
//         replace(`?${debouncedQuery}`, { scroll: false });
//       }
//     }, 600);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [debouncedQuery, replace]);

//   useEffect(() => {
//     if(resetFetch){
//       fetchData();
//     }
//   }, [resetFetch])

//   useEffect(() => {
//     if(imediateFetch && !isFetched){
//       fetchData();
//       setIsFetched(true);
//     }
//   }, [imediateFetch])
  
//   const handleFilterChange = (filterName, value) => {
//     setFilters((prevFilters) => {
//       let updatedFilterValue;
  
//       if (filterName === 'make') {
//         const newValue = prevFilters.make.includes(value)
//           ? prevFilters.make.filter((make) => make !== value)
//           : [...prevFilters.make, value];
  
//         updatedFilterValue = newValue;
//       } 
//       else if(filterName === 'model'){
//         const newValue = prevFilters.model.includes(value)
//         ? prevFilters.model.filter((model) => model !== value)
//         : [...prevFilters.model, value];

//       updatedFilterValue = newValue;
//       }
//       else {
//         updatedFilterValue = value;
//       }
  
//       const updatedFilters = {
//         ...prevFilters,
//         [filterName]: updatedFilterValue,
//       };
  
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(filterName, Array.isArray(updatedFilterValue) ? updatedFilterValue.join(',') : updatedFilterValue);
//       setDebouncedQuery(params.toString());
  
//       return updatedFilters;
//     });
//   };
  

//   const handlePaginationChange = (newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage }));
//     setResetFetch(true);
//   };

//   const handleSortChange = (newSortOrder) => {
//     setSortOrder(newSortOrder);
//     setResetFetch(true);
//   };
//   const resetFilters = () => {
//     setFilters({
//       city: "",
//       search: "",
//       condition: "Condition",
//       make: [],
//       model: [],
//       mileage: [100, 2000000],
//       price: [1200000, 2000000],
//       year: [2000, 2024],
//       transmission: "Transmission",
//       drive: "Drive",
//       exteriorColor: "Exterior Color",
//       fuelType: "Fuel Type",
//       bodyType: "",
//     });
//     replace("?");
//     setResetFetch(true);
//   };
//   const typeMapping = {
//     cars: 'car',
//     bikes: 'bike',
//     trucks: 'truck',
//   };
  
//   return {
//     fetchedData,
//     filters,
//     pagination,
//     sortOrder,
//     handleFilterChange,
//     resetFilters,
//     handlePaginationChange,
//     handleSortChange,
//   };
// };

// export default useListingFilter;
"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from 'next/navigation';

const useListingFilters = (initialFilters) => {
  const router = useRouter();
  const { slug } = useParams();
  const [filters, setFilters] = useState(initialFilters);
  const debounceTimeoutRef = useRef(null);
  const type = slug[0] || 'cars';

  const typeMapping = {
    cars: 'car',
    bikes: 'bike',
    trucks: 'truck',
    car:'car',
    bike:'bike',
    truck:'truck',
  };
  useEffect(() => {
    if (slug && slug.length > 0) {
      const updatedFilters = { ...filters };

      slug.forEach((item) => {
        if (item.startsWith('mk_')) {
          updatedFilters.make.push(item.replace('mk_', ''));
        }
        if (item.startsWith('md_')) {
          updatedFilters.model.push(item.replace('md_', ''));
        }
        if (item.startsWith('ct_')) {
          updatedFilters.city.push(item.replace('ct_', ''));
        }
        if (item.startsWith('bt_')) {
          updatedFilters.bodyType.push(item.replace('bt_', ''));
        }
        if (item.startsWith('pr_')) {
          const [min, max] = item.replace('pr_', '').split('_');
          updatedFilters.price = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith('yr_')) {
          const [min, max] = item.replace('yr_', '').split('_');
          updatedFilters.year = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith('ml_')) {
          const [min, max] = item.replace('ml_', '').split('_');
          updatedFilters.mileage = [parseInt(min, 10), parseInt(max, 10)];
        }
        if (item.startsWith('cn_')) {
          updatedFilters.condition = item;
        }
        if (item.startsWith('tr_')) {
          updatedFilters.transmission = item;
        }
        if (item.startsWith('dr_')) {
          updatedFilters.drive = item;
        }
        if (item.startsWith('cl_')) {
          updatedFilters.exteriorColor = item;
        }
        if (item.startsWith('ft_')) {
          updatedFilters.fuelType = item;
        }
        if (item.startsWith('q_')) {
          updatedFilters.query = item.replace('q_', '');
        }
        if (item.startsWith('od_')) {
          updatedFilters.order = item.replace('od_', '');
        }
        if (item.startsWith('page_')) {
          updatedFilters.page = parseInt(item.replace('page_', ''), 10);
        }
        if (item.startsWith('limit_')) {
          updatedFilters.limit = parseInt(item.replace('limit_', ''), 10);
        }
        if (item.startsWith('view_')) {
          updatedFilters.view = item.replace('view_', '');
        }
      });

      setFilters(updatedFilters);
    }
  }, []);

  const updateFiltersInUrl = (updatedFilters) => {
    let customUrl = `/listing/${type}/search/-/page_1/limit_10/view_grid/`;

    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        if (key === "make") [...new Set(value)].forEach(make => customUrl += `mk_${make.toLowerCase()}/`);
        if (key === "model") [...new Set(value)].forEach(model => customUrl += `md_${model.toLowerCase()}/`);
        if (key === "city") [...new Set(value)].forEach(city => customUrl += `ct_${city.toLowerCase()}/`);
        if (key === "bodyType") [...new Set(value)].forEach(bodyType => customUrl += `bt_${bodyType.toLowerCase()}/`);
        if (key === "price" && (value[0] !== 0 || value[1] !== 2000000000)) {
          customUrl += `pr_${value[0]}_${value[1]}/`;
        }
        if (key === "year" && (value[0] !== 2000 || value[1] !== 2024)) {
          customUrl += `yr_${value[0]}_${value[1]}/`;
        }
        if (key === "mileage" && (value[0] !== 0 || value[1] !== 2000000)) {
          customUrl += `ml_${value[0]}_${value[1]}/`;
        }
      } else if (typeof value === "string" && value) {
        if (key === "query") customUrl += `q_${value}/`;
        if (["condition", "transmission", "drive", "exteriorColor", "fuelType"].includes(key)) {
          customUrl += `${value}/`;
        }
        if (key === "sort") customUrl += `st_${value}/`;
        if (key === "view") customUrl += `view_${value}/`;
      } else if (typeof value === "number") {
        if (key === "page") customUrl += `page_${value}/`;
      }
    });

    router.push(customUrl, { scroll: false });
  };

  const handleFilterChange = (filterName, value, isChecked) => {
    setFilters((prevFilters) => {
      let updatedFilterValue;

      if (["make", "city", "model", "bodyType"].includes(filterName)) {
        if (isChecked) {
          updatedFilterValue = Array.from(new Set([...prevFilters[filterName], value]));
        } else {
          updatedFilterValue =  prevFilters[filterName].filter(item => item !== value);
        }
      } else {
        updatedFilterValue = value;
      }

      const updatedFilters = {
        ...prevFilters,
        [filterName]: updatedFilterValue,
      };

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        updateFiltersInUrl(updatedFilters);
      }, 600);

      return updatedFilters;
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    router.push(`/listing/${type}/search/-/page_1/limit_10/view_grid/`, { scroll: false });
  };

  return { filters, handleFilterChange, resetFilters, updateFiltersInUrl };
};

export default useListingFilters;
