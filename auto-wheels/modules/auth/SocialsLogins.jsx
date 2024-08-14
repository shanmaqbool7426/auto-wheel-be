
import React, { useState } from "react";
import { Button, Flex, Grid, Modal, Text } from "@mantine/core";
import Image from "next/image";

import google_icon from "../../public/auth/google_icon.svg";
import car from "../../public/auth/car.svg";
import facebook_icon from "../../public/auth/facebook_icon.svg";
import email_icon from "../../public/auth/email_icon.svg";
import apple_icon from "../../public/auth/apple_icon.svg";
import { rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";
import SignUp from "./SignUp";
import { signIn } from 'next-auth/react';

// import { signIn } from 'next-auth/react';

import classes from "../../app/styles/Demo.module.scss";
const SocialsLogin = ({ socialOpened, socialOnClose }) => {

  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <Modal
        opened={socialOpened}
        onClose={socialOnClose}
        title=""
        centered
        size="auto"
        overlayopacity={0.55}
        overlayblur={3}
        withCloseButton={false}
      >
        <div className="model-height">
          {/* <h1 className='m-4'>Choose Account Type</h1> */}
          <Carousel
            height={180}
            classNames={classes}
            nextControlIcon={
              <IconArrowRight style={{ width: rem(16), height: rem(16) }} />
            }
            previousControlIcon={
              <IconArrowLeft style={{ width: rem(16), height: rem(16) }} />
            }
          >
            <Carousel.Slide>
              <div>
                <div className="d-flex justify-content-center">
                  <Image width={120} height={120} src={car} alt="Google" />
                </div>
                <div className="text-center">
                  <Text fw={700}>New Car Alert</Text>

                  <p className="alerts-quickly">
                    Create alerts quickly and get notified when new car
                    available
                  </p>
                </div>
              </div>
            </Carousel.Slide>

            <Carousel.Slide>
              <div>
                <div className="d-flex justify-content-center">
                  <Image width={120} height={120} src={car} alt="Google" />
                </div>
                <div className="text-center">
                  <Text fw={700}>New Car Alert</Text>
                  <p className="alerts-quickly">
                    Create alerts quickly and get notified when new car
                    available
                  </p>
                </div>
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div>
                <div className="d-flex justify-content-center">
                  <Image width={120} height={120} src={car} alt="Google" />
                </div>
                <div className="text-center">
                  <Text fw={700}>New Car Alert</Text>
                  <p className="alerts-quickly">
                    Create alerts quickly and get notified when new car
                    available
                  </p>
                </div>
              </div>
            </Carousel.Slide>
            {/* ...other slides */}
          </Carousel>
          <div className="login-buttons">
            <Button className="socials-btns google-btn m-2 " variant="default" type="submit" name="action" value={"google"} onClick={() => signIn('google', {redirectTo: '/dashboard'})}>
              <div className="socials-btns-inner">
                <Image width={30} height={30} src={google_icon} alt="Google" />
                <div>Continue with Google</div>
              </div>
            </Button>

            <Button
              className="socials-btns facebook-btn m-2 "
              variant="default"
              onClick={() => signIn('facebook', {redirectTo: '/dashboard'})}
            >
              <div className="socials-btns-inner">
                <Image
                  width={30}
                  height={30}
                  src={facebook_icon}
                  alt="Facebook"
                />
                <div>Continue with Facebook</div>
              </div>
            </Button>
            <Button className="socials-btns apple-btn m-2" variant="default">
              <div className="socials-btns-inner">
                <Image width={30} height={30} src={apple_icon} alt="Apple" />
                <div>Continue with Apple</div>
              </div>
            </Button>
            <Button className="socials-btns email-btn m-2" variant="default">
              <div className="socials-btns-inner">
                <Image width={30} height={30} src={email_icon} alt="Email" />
                <div>Continue with Email</div>
              </div>
            </Button>
          </div>
          <p className="text-center">
            Don't have am account ?{" "}
            <b
              className="primary cursor"
              onClick={() => {
                setModalOpened(true);
                socialOnClose();
              }}
            >
              {" "}
              Sign Up
            </b>{" "}
          </p>
        </div>
      </Modal>
      <SignUp
        signUpOpened={modalOpened}
        signUpOnClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default SocialsLogin;
