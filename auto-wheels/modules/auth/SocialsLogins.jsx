import React from 'react';
import { Button, Flex, Grid, Modal } from '@mantine/core';
import Image from 'next/image'
import google_icon from "../../public/auth/google_icon.svg"
import car from "../../public/auth/car.svg"
import facebook_icon from "../../public/auth/facebook_icon.svg"
import email_icon from "../../public/auth/email_icon.svg"
import apple_icon from "../../public/auth/apple_icon.svg"
import { rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import '@mantine/carousel/styles.css';
const SocialsLogin = ({ opened, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title=""
      centered
      size="auto"
      overlayOpacity={0.55}
      overlayBlur={3}
    >

      <h1 className='m-4'>Choose Account Type</h1>
      <Carousel
        height={180}
        nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
        previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
      >
        <Carousel.Slide>
          <div className='d-flex justify-content-center'>
            <Image width={120}
              height={120} src={car} alt="Google" />
              {/* <h1>New Car Alert</h1>
              <p>Create alerts quickly and get notified when new car available</p> */}
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className='d-flex justify-content-center'>
            <Image width={120}
              height={120} src={car} alt="Google" />
                {/* <h1>New Car Alert</h1>
                <p>Create alerts quickly and get notified when new car available</p> */}
          </div></Carousel.Slide>
        <Carousel.Slide>
          <div className='d-flex justify-content-center'>
            <Image width={120}
              height={120} src={car} alt="Google" />
                {/* <h1>New Car Alert</h1>
                <p>Create alerts quickly and get notified when new car available</p> */}
          </div></Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
      <div className="login-buttons">
        <Button className="socials-btns google-btn m-3 " variant="default">
          <Image width={30}
            height={30} src={google_icon} alt="Google" /> Continue with Google
        </Button>
        <Button className="socials-btns facebook-btn m-3 " variant="default">
          <Image width={30}
            height={30} src={facebook_icon} alt="Facebook" /> Continue with Facebook
        </Button>
        <Button className="socials-btns apple-btn m-3" variant="default">
          <Image width={30}
            height={30} src={apple_icon} alt="Apple" /> Continue with Apple
        </Button>
        <Button className="socials-btns email-btn m-3" variant="default">
          <Image width={30}
            height={30} src={email_icon} alt="Email" /> Continue with Email
        </Button>
      </div>

    </Modal>
  );
};

export default SocialsLogin;
