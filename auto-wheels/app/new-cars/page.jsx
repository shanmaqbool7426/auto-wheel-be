import React from 'react'
import NewCarsModule from "@/modules/new-cars/index"
import { fetchMakesAndBodies, fetchVehiclsData } from '@/services/vehicles'
const NewCarsPage =async (params) => {
  const makesAndBodies= await fetchMakesAndBodies()
  // const reorderedSlug = reorderSlug(params.slug);
  // let loading = true;
  const popularVehicles = await fetchVehiclsData('/cn_new/sb_price-asc');
  console.log('>>>> popularVehiclesnoo',popularVehicles)
  return (
    <NewCarsModule makes={makesAndBodies?.makes} bodies={makesAndBodies?.bodies} popularVehicles={popularVehicles}/>
  )
}

export default NewCarsPage