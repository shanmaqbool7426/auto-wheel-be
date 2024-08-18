import { BikeParts, CarParts, TruckParts } from "@/components/Icons";

const typeMapping = {
    cars: 'car',
    bikes: 'bike',
    trucks: 'truck',
};
export const cities = [
    { value: 'karachi', label: 'Karachi' },
    { value: 'lahore', label: 'Lahore' },
    { value: 'islamabad', label: 'Islamabad' },
    { value: 'rawalpindi', label: 'Rawalpindi' },
    { value: 'faisalabad', label: 'Faisalabad' },
    { value: 'multan', label: 'Multan' },
    { value: 'peshawar', label: 'Peshawar' },
    { value: 'quetta', label: 'Quetta' },
    { value: 'sialkot', label: 'Sialkot' },
    { value: 'sukkur', label: 'Sukkur' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'gujranwala', label: 'Gujranwala' },
    { value: 'bahawalpur', label: 'Bahawalpur' },
    { value: 'sahiwal', label: 'Sahiwal' },
    { value: 'rahimyarKhan', label: 'Rahim Yar Khan' },
    { value: 'abbottabad', label: 'Abbottabad' },
    { value: 'swat', label: 'Swat' },
    { value: 'mansehra', label: 'Mansehra' },
    { value: 'mardan', label: 'Mardan' },
    { value: 'deraGhaziKhan', label: 'Dera Ghazi Khan' },
    { value: 'deraIsmailKhan', label: 'Dera Ismail Khan' },
    { value: 'nawabshah', label: 'Nawabshah' },
    { value: 'mirpurkhas', label: 'Mirpurkhas' },
    { value: 'larkana', label: 'Larkana' },
    { value: 'kasur', label: 'Kasur' },
    { value: 'sheikhupura', label: 'Sheikhupura' },
    { value: 'sargodha', label: 'Sargodha' },
    { value: 'gujrat', label: 'Gujrat' },
    { value: 'jhang', label: 'Jhang' },
    { value: 'bhakkar', label: 'Bhakkar' },
    { value: 'attock', label: 'Attock' },
    { value: 'chakwal', label: 'Chakwal' },
    { value: 'jehlum', label: 'Jehlum' },
    { value: 'murree', label: 'Murree' },
    { value: 'kohat', label: 'Kohat' },
    { value: 'bannu', label: 'Bannu' },
    { value: 'chaman', label: 'Chaman' },
    { value: 'zhob', label: 'Zhob' },
    { value: 'gwadar', label: 'Gwadar' },
    { value: 'sibi', label: 'Sibi' },
    { value: 'gilgit', label: 'Gilgit' },
    { value: 'skardu', label: 'Skardu' },
    { value: 'mirpur', label: 'Mirpur' },
    { value: 'muzaffarabad', label: 'Muzaffarabad' },
];

export const vehicleConditionOptions=[
    { value: 'cn_certified', label: 'Certified User' },
    { value: 'cn_new', label: 'New' },
    { value: 'cn_used', label: 'Used' },
]
export const vehicleTransmissionOptions=[
    { value: 'tr_automatic', label: 'Automatic' },
    { value: 'tr_manual', label: 'Manual' },
    { value: 'tr_cvt', label: 'CVT' },
]
export const vehicleDriveOptions=[
    { value: 'dr_awd', label: 'AWD' },
    { value: 'dr_fwd', label: 'FWD' },
    { value: 'dr_rwd', label: 'RWD' },
]
export const vehicleFuelTypeOptions=[
    { value: 'ft_petrol', label: 'Petrol' },
    { value: 'ft_diesel', label: 'Diesel' },
    { value: 'ft_electric', label: 'Electric' },
]
export const vehicleExteriorColorOptions=[
    { value: 'cl_red', label: 'Red' },
    { value: 'cl_blue', label: 'Blue' },
    { value: 'cl_black', label: 'Black' },
    { value: 'cl_grey', label: 'Grey' },
    { value: 'cl_orange', label: 'Orange' },
    { value: 'cl_yellow', label: 'Yellow' },
]
export const carMakes = [
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'honda', label: 'Honda' },
    { value: 'kia', label: 'KIA' },
    { value: 'mercedes', label: 'Mercedes' },
    { value: 'bmw', label: 'BMW' },
];
export const bikeMakes = [
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'honda', label: 'Honda' },
    { value: 'yamaha', label: 'Yamaha' },
    { value: 'road_prince', label: 'Road Prince' },
    { value: 'united', label: 'United' },
];
export const truckMakes = [
    { value: 'hino', label: 'Hino' },
    { value: 'isuzu', label: 'ISUZU' },
    { value: 'jac', label: 'JAC' },
    { value: 'jw_forland', label: 'JW Forland' },
    { value: 'master_foton', label: 'Master Foton' },
];

export const carBodyTypes = [
    { src: "/car-body/Hatchback.svg", label: "Compact", value: 'compact' },
    { src: "/car-body/coupe.svg", label: "Coupe", value: 'coupe' },
    { src: "/car-body/Sport-Cars.svg", label: "Crossovers", value: 'crossovers' },
    { src: "/car-body/SUV.svg", label: "Off-Road", value: 'offroad' },
    { src: "/car-body/Pickups.svg", label: "Pickups", value: 'pickups' },
    { src: "/car-body/Sedan.svg", label: "Sedan", value: 'sedan' },
];

export const bikeBodyTypes = [
    { src: "/bike-body/RoadSitter.svg", label: "Road Sitter", value: 'roadsitter' },
    { src: "/bike-body/Sports.svg", label: "Sports", value: 'sports' },
    { src: "/bike-body/Chopper.svg", label: "Chopper", value: 'chopper' },
    { src: "/bike-body/Cruiser.svg", label: "Cruiser", value: 'cruiser' },
];

export const truckBodyTypes = [
    { src: "/truck-body/Dump.svg", label: "Dump", value: 'dump' },
    { src: "/truck-body/Box.svg", label: "Box", value: 'box' },
    { src: "/truck-body/Cargo.svg", label: "Cargo", value: 'cargo' },
    { src: "/truck-body/Flatbed.svg", label: "Flat bed", value: 'flatbed' },
];

export const getVehicleModelsByMakeAndType = (makeArray, type) => {
    const vehicleData = {
      car: {
        Honda: ['Civic', 'City', 'BR-V', 'Accord', 'CR-V'],
        Kia: ['Sportage', 'Picanto', 'Sorento', 'Stonic'],
        Toyota: ['Corolla', 'Yaris', 'Fortuner', 'Hilux', 'Camry'],
        Suzuki: ['Alto', 'Cultus', 'Swift', 'WagonR', 'Bolan'],
        Hyundai: ['Tucson', 'Elantra', 'Sonata', 'Santro'],
        Mercedes: ['C-Class', 'E-Class', 'GLA', 'GLE'],
        BMW: ['3Series', '5Series', 'X1', 'X3'],
      },
      bike: {
        Honda: ['CD70', 'CG125', 'CB150F', 'CBR500R'],
        Suzuki: ['GS150', 'GR150', 'GD110S'],
        Yamaha: ['YBR125', 'YBR 125G', 'YBZ125'],
      },
      truck: {
        Hino: ['300Series', '500Series', '700Series'],
        Isuzu: ['NSeries', 'FSeries', 'Giga'],
        Master: ['Foton', 'HyundaiMighty'],
      },
    };
  
    const typeMapping = {
      cars: 'car',
      bikes: 'bike',
      trucks: 'truck',
    };
  
    let result = [];
  
    if (Array.isArray(makeArray) && vehicleData[typeMapping[type]]) {
      // Create a unique set of makes to avoid processing duplicates
      const uniqueMakes = new Set(makeArray.map(make => make.toLowerCase()));
  
      uniqueMakes.forEach(make => {
        const vehicleMake = Object.keys(vehicleData[typeMapping[type]]).find(
          vehicleMake => vehicleMake.toLowerCase() === make
        );
  
        if (vehicleMake) {
          const models = vehicleData[typeMapping[type]][vehicleMake].map(model => ({
            value: model.toLowerCase(),
            label: model,
          }));
          result = result.concat(models);
        }
      });
    }
  
    return result;
  };
  

  
export function getBodyTypesByVehicleType(type) {
    const mappedType = typeMapping[type];
    
    switch (mappedType) {
        case 'car':
            return carBodyTypes;
        case 'bike':
            return bikeBodyTypes;
        case 'truck':
            return truckBodyTypes;
        default:
            return [];
    }
}
export function getMakeTypesByVehicleType(type) {
    const mappedType = typeMapping[type];
    
    switch (mappedType) {
        case 'car':
            return carMakes;
        case 'bike':
            return bikeMakes;
        case 'truck':
            return truckMakes;
        default:
            return [];
    }
}
export function getVehiclePartsIconByVehicleType(type) {
    const mappedType = typeMapping[type];
    
    switch (mappedType) {
        case 'car':
            return <CarParts/>;
        case 'bike':
            return <BikeParts/>;
        case 'truck':
            return <TruckParts/>;
        default:
            return <></>;
    }
}
