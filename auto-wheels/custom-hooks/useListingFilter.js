import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
const useListingFilter = (options={}) => {
  const {type='car'} = options
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [resetFetch,setResetFetch]=useState(true);
  const [filters, setFilters] = useState({
    city: "",
    condition: "Condition",
    make: "Make",
    model: "Model",
    mileage: [100, 20000],
    price: [1200000, 2000000],
    year: [2000, 2024],
    transmission: "Transmission",
    drive: "Drive",
    exteriorColor: "Exterior Color",
    fuelType: "Fuel Type",
    bodyType: "",
  });

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    limit: 10,
  });
  const [sortOrder, setSortOrder] = useState('latest');
  const fetchData = () => {
    const query = {
      type:typeMapping[type] || type,
      page: pagination.page,
      limit: pagination.limit,
      sort: sortOrder,
    };
  
    // Add filters to the query only if they are not empty or default
    if (filters.city) query.city = filters.city;
    if (filters.condition !== "Condition") query.condition = filters.condition;
    if (filters.make !== "Make") query.make = filters.make;
    if (filters.model !== "Model") query.model = filters.model;
    if (filters.transmission !== "Transmission") query.transmission = filters.transmission;
    if (filters.drive !== "Drive") query.drive = filters.drive;
    if (filters.exteriorColor !== "Exterior Color") query.exteriorColor = filters.exteriorColor;
    if (filters.fuelType !== "Fuel Type") query.fuelType = filters.fuelType;
    if (filters.bodyType) query.bodyType = filters.bodyType;
  
    // Add mileage, price, and year ranges if they are different from the defaults
    if (filters.mileage[0] !== 100 || filters.mileage[1] !== 20000) {
      query.mileageMin = filters.mileage[0];
      query.mileageMax = filters.mileage[1];
    }
    if (filters.price[0] !== 1200000 || filters.price[1] !== 2000000) {
      query.priceMin = filters.price[0];
      query.priceMax = filters.price[1];
    }
    // query.yearMin = filters.year[0];
    // query.yearMax = filters.year[1];
  
    console.log("Fetching data with filters:", query);
  
    fetch(`${API_ENDPOINTS?.VEHICLES_Listing}?${new URLSearchParams(query)}`)
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data?.data?.results);
        setPagination((prev) => ({
          ...prev,
          count: data?.data?.count,
        }));
        setResetFetch(false);
      });
  };
  

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    console.log(searchParams.entries());
    const updatedFilters = {
      city: currentParams.city || "",
      condition: currentParams.condition || "Condition",
      make: currentParams.make || "Make",
      model: currentParams.model || "Model",
      mileage: currentParams.mileage ? currentParams.mileage.split(',').map(Number) : [100, 20000],
      price: currentParams.price ? currentParams.price.split(',').map(Number) : [1200000, 2000000],
      year: currentParams.year ? currentParams.year.split(',').map(Number) : [2000, 2024],
      transmission: currentParams.transmission || "Transmission",
      drive: currentParams.drive || "Drive",
      exteriorColor: currentParams.exteriorColor || "Exterior Color",
      fuelType: currentParams.fuelType || "Fuel Type",
      bodyType: currentParams.bodyType || "",
    };

    setFilters(updatedFilters);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedQuery) {
        fetchData();
        replace(`?${debouncedQuery}`, { scroll: false });
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedQuery, replace]);

  useEffect(() => {
    if(resetFetch){
      fetchData();
    }
  }, [resetFetch])
  

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterName]: Array.isArray(value) ? value : value,
      };

      const params = new URLSearchParams(searchParams.toString());
      params.set(filterName, Array.isArray(value) ? value.join(',') : value);
      setDebouncedQuery(params.toString());

      return updatedFilters;
    });
  };
  const handlePaginationChange = (newPage) => {
    console.log(newPage,"page");
    setPagination((prev) => ({ ...prev, page: newPage }));
    setResetFetch(true);
    // fetchData();
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setResetFetch(true);
  };
  const resetFilters = () => {
    setFilters({
      city: "",
      condition: "Condition",
      make: "Make",
      model: "Model",
      mileage: [100, 20000],
      price: [1200000, 2000000],
      year: [2000, 2024],
      transmission: "Transmission",
      drive: "Drive",
      exteriorColor: "Exterior Color",
      fuelType: "Fuel Type",
      bodyType: "",
    });
    replace("?");
    setResetFetch(true);
  };
  const typeMapping = {
    cars: 'car',
    bikes: 'bike',
    trucks: 'truck',
  };
  
  return {
    fetchedData,
    filters,
    pagination,
    sortOrder,
    handleFilterChange,
    resetFilters,
    handlePaginationChange,
    handleSortChange,
  };
};

export default useListingFilter;
