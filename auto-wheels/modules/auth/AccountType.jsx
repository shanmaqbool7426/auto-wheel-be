import React from "react";
import { Flex, Grid, Modal } from "@mantine/core";
import Image from "next/image";
import personal from "../../public/auth/personal.svg";
import dealer_icon from "../../public/auth/dealer_icon.svg";
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
      <h1 className="m-4">Choose Account Type</h1>
      <div className="account-type fa">
        <div className="fa  personal_account_isActive">
          <Image
            src={personal}
            width={30}
            height={30}
            alt="Picture of the author"
            className="m-3"
          />
          <div>
            <h3>Personal Account</h3>
            <p>If you work individual or Want to Brows Listings</p>
          </div>
        </div>

        <div className="fa  personal_account">
          <Image
            src={dealer_icon}
            width={30}
            height={30}
            alt="Picture of the author"
            className="m-2"
          />
          <div>
            <h3>Personal Account</h3>
            <p>If you work individual or Want to Brows Listings</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountTypeModal;
