import React from 'react';
import { Flex, Grid, Modal } from '@mantine/core';
import Image from 'next/image'
import personal from "../../public/auth/personal.svg"
const AccountTypeModal = ({ opened, onClose }) => {
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

      <div className='account-type'>
        <div className='border w-100'>

          <div className='fa'>
            <Image
              src={personal}
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <div>
              <h3>Personal Account</h3>
              <p>If you work  individual or Want to Brows Listings</p>
            </div>
          </div>

        </div>

        <div className='border'>
          <div>
            <Image
              src={personal}
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <div>
              <h3>Personal Account</h3>
              <p>If you work  individual or Want to Brows Listings</p>
            </div>
          </div>
        </div>

      </div>

    </Modal>
  );
};

export default AccountTypeModal;
