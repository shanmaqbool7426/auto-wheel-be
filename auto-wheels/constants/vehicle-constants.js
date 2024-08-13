import { BikeParts, CarParts, TruckParts } from "@/components/Icons";

const typeMapping = {
    cars: 'car',
    bikes: 'bike',
    trucks: 'truck',
};
export const vehicleConditionOptions=[
    { value: 'certified', label: 'Certified User' },
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
]
export const vehicleTransmissionOptions=[
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
    { value: 'cvt', label: 'CVT' },
]
export const vehicleDriveOptions=[
    { value: 'AWD', label: 'AWD' },
    { value: 'FWD', label: 'FWD' },
    { value: 'RWD', label: 'RWD' },
]
export const vehicleFuelTypeOptions=[
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
]
export const vehicleExteriorColorOptions=[
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'black', label: 'Black' },
    { value: 'grey', label: 'Grey' },
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
      Suzuki: ['Alto', 'Cultus', 'Swift', 'Wagon R', 'Bolan'],
      Hyundai: ['Tucson', 'Elantra', 'Sonata', 'Santro'],
      Mercedes: ['C-Class', 'E-Class', 'GLA', 'GLE'],
      BMW: ['3 Series', '5 Series', 'X1', 'X3'],
    },
    bike: {
      Honda: ['CD 70', 'CG 125', 'CB 150F', 'CBR 500R'],
      Suzuki: ['GS 150', 'GR 150', 'GD 110S'],
      Yamaha: ['YBR 125', 'YBR 125G', 'YBZ 125'],
    },
    truck: {
      Hino: ['300 Series', '500 Series', '700 Series'],
      Isuzu: ['N Series', 'F Series', 'Giga'],
      Master: ['Foton', 'Hyundai Mighty'],
    },
  };

  let result = [];

  if (Array.isArray(makeArray) && vehicleData[typeMapping[type]]) {
    makeArray.forEach(make => {
      Object.keys(vehicleData[typeMapping[type]]).forEach(vehicleMake => {
        if (make.toLowerCase() === vehicleMake.toLowerCase()) {
          const models = vehicleData[typeMapping[type]][vehicleMake].map(model => ({
            value: model.toLowerCase(),
            label: model,
          }));
          result = result.concat(models);
        }
      });
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
