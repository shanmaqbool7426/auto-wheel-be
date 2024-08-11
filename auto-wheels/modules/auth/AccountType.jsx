import React, { useState } from "react";
import { Modal, Text } from "@mantine/core";
import Image from "next/image";
import personal from "../../public/auth/personal.svg";
import dealer_icon from "../../public/auth/dealer_icon.svg";
import SocialsLogin from "./SocialsLogins";

const AccountTypeModal = ({ opened, onClose }) => {
  const [activeType, setActiveType] = useState('personal');
  const [modalOpened, setModalOpened] = useState(false);

  const handleAccountTypeClick = (type) => {
    setModalOpened(true)
    setActiveType(type);
    onClose()
  };
  return (
    <>
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      title=""
      centered
      size="auto"
      overlayopacity={0.55}
      overlayblur={3}
    >
      {/* <h5 className="m-4 ms-4">Choose Account Type</h5> */}
      <Text fw={700} fz="lg" size="md" className="mt-5 mb-1  ms-4 ps-1">Choose Account Type</Text>

      <div className="account-type-container ">
        <div
          className={`account-type-box ${activeType === 'personal' ? 'active' : ''}`}
          onClick={() => handleAccountTypeClick('personal')}
        >
          <Image
            src={personal}
            width={30}
            height={30}
            alt="Personal Account"
            className="account-type-icon"
          />
          <div>
            <Text fw={700} size="sm">Personal Account</Text>
            <Text size="sm">If you work individual or Want to Browse Listings</Text>
          </div>
        </div>

        <div
          className={`account-type-box ${activeType === 'dealer' ? 'active' : ''}`}
          onClick={() => handleAccountTypeClick('dealer')}
        >
          <Image
            src={dealer_icon}
            width={30}
            height={30}
            alt="Dealer Account"
            className="account-type-icon"
          />
          <div>
            <Text fw={700} size="sm">Dealer Account</Text>
            <Text size="sm">For Official or Private Dealers who have bulk Listings</Text>
          </div>
        </div>
      </div>
    </Modal>

    <SocialsLogin
        socialOpened={modalOpened}
        socialOnClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default AccountTypeModal;
