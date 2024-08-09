'use client'
import React, { useState } from "react";
import HeroTabs from "@/components/hero-tabs";
import { BsArrowRight } from "react-icons/bs";
import { Poppins } from "next/font/google";
import AccountTypeModal from "../auth/AccountType.jsx"
import SocialsLogin from "../auth/SocialsLogins.jsx"
// import SignIn from "../auth/SignIn.tsx"
import SignUp from "../auth/SignUp.jsx"
// import Otp from "../auth/Otp.jsx"
import { useMantineColorScheme, Button, Group } from '@mantine/core';

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const Hero = () => {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
    <div className="hero-banner py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card hero-form p-2">
              <div className="card-body">
                <div className="card-title fw-bold">
                  Find your Right <span className="text-primary">car</span>
                </div>
                <HeroTabs />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="hero-content">
              <div>
                <div
                  className={`${poppin.className} hero-title fw-bold mb-4`}
                >
                  Hyundai Car Price in <br /> Pakistan 2023
                </div>
                <button className="btn btn-primary btn-lg px-4 rounded-2 hero-btn">
                  Read More <BsArrowRight />
                </button>
              </div>
              <ul className="car-lists-slider list-unstyled">
                <li className="active">Hyundai Car Review</li>
                <li>2023 Safari Review</li>
                <li>2023 Safari Review</li>
                <li>2023 Safari Review</li>
                <li>2023 Safari Review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <Button onClick={() => setModalOpened(true)}>Open Modal</Button>
    <Button onClick={() => setColorScheme('dark')}>Dark</Button>
    <Button onClick={() => setColorScheme('light')}>light</Button> */}

    {/* <SocialsLogin 
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      /> */}
    {/* <AccountTypeModal 
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      /> */}

    </>
  );
};

export default Hero;
