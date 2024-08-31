import React from 'react'
import VehiclesByMake from '@/modules/vehicles-by-make';
// import { buildNewVehicleUrl } from '@/utils/createUrl';
// import {fetchNewVehiclsData} from "@/services/vehicles"
const NewCarDetailPage =async ({params}) => {
  // buildNewVehicleUrl('/new-cars',params.slug)
  // console.log(params.slug,buildNewVehicleUrl('/new-cars',params.slug),'params')
  // const vehicles = await fetchNewVehiclsData(buildNewVehicleUrl('/new-cars',params.slug))
  return (
    <>
      <VehiclesByMake vehicles={[]}/>
    </>
  )
}

export default NewCarDetailPage
