import React from 'react';
import { Box } from '@mantine/core';
import CarCard from "@/components/ui/CarCard";
import VehicleSearch from './VehicleSearch';
import { fetchVehiclesByType } from "@/services/vehicles";

const Vehicles = async () => {
    const vehicles = await fetchVehiclesByType();

    return (
        <>
            <VehicleSearch  />
            <section className="blog-products py-5">
                <Box className="container">
                    <Box className="row">
                        {vehicles?.data?.map((vehicle, index) => {
                            return (
                                <Box className="col-md-4" key={index}>
                                    <CarCard bg="transparent" vehicle={vehicle} />
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </section>
        </>
    );
};

export default Vehicles;
