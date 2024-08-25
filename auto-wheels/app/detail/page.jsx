import React from "react";
import VehicleDetailModule from "@/modules/vehicle-detail";
import { fetchSimilarVehicls, fetchVehiclDetail } from "@/services/vehicles";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
const VehicleDetailPage = async() => {

  const detail = await fetchVehiclDetail(
    `${API_ENDPOINTS.VEHICLE_DETAIL}/64bb97d4933cfe6cdd01ecb4`
  );

  const listOfSimilarVehicles = await fetchSimilarVehicls(
    `${API_ENDPOINTS.SIMILAR_VEHICLES}/64bb97d4933cfe6cdd01ecb4`
  );
  return <VehicleDetailModule detail={detail}  listOfSimilarVehicles={listOfSimilarVehicles}/>;
};

export default VehicleDetailPage;
