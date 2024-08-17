import React, { useState } from "react";
import { Modal, Text, Title } from "@mantine/core";
import Image from "next/image";
import personal from "../../public/auth/personal.svg";
import dealer_icon from "../../public/auth/dealer_icon.svg";
import SocialsLogin from "./SocialsLogins";

const AccountTypeModal = ({ opened, onClose }) => {
  const [activeType, setActiveType] = useState("personal");
  const [modalOpened, setModalOpened] = useState(false);

  const handleAccountTypeClick = (type) => {
    setModalOpened(true);
    setActiveType(type);
    onClose();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={true}
        title={
          <Title order={5} fw={600}>
            Choose Account Type
          </Title>
        }
        centered
        size="md"
      >
        <div className="account-type-container">
          <div
            className={`account-type-box ${
              activeType === "personal" ? "active" : ""
            }`}
            onClick={() => handleAccountTypeClick("personal")}
          >
            <Image
              src={personal}
              width={30}
              height={30}
              alt="Personal Account"
              className="account-type-icon"
            />
            <Text fw={700} size="sm">
              Personal Account
            </Text>
            <Text size="sm">
              If you work individual or Want to Browse Listings
            </Text>
          </div>

          <div
            className={`account-type-box ${
              activeType === "dealer" ? "active" : ""
            }`}
            onClick={() => handleAccountTypeClick("dealer")}
          >
            <Image
              src={dealer_icon}
              width={30}
              height={30}
              alt="Dealer Account"
              className="account-type-icon"
            />
            <div>
              <Text fw={700} size="sm">
                Dealer Account
              </Text>
              <Text size="sm">
                For Official or Private Dealers who have bulk Listings
              </Text>
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
