import { Anchor, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrowseByCategory = () => {
  return (
    <div className="browse-cats-section py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
                Browse by{" "}
                <Text span c="#E90808" inherit>
                  Make
                </Text>
              </Title>
              <Anchor component={Link} href="#" c="pink">
                Show all Makes
              </Anchor>
            </Flex>
            <div className="cat-by-brand">
              <div className="row">
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/acura.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Acura</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/bentley.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Bentley</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/bmw.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>BMW</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/chevrolet.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Chevrolet</Link>
                  </Flex>
                </div>

                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/ford.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Ford</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={70}
                      height={100}
                      src="/brands/hyundai.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Honda</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={80}
                      height={100}
                      src="/brands/nissan.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Hyundai</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex direction="column" className="single-brand-item">
                    <Image
                      width={100}
                      height={100}
                      src="/brands/kia.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>KIA</Link>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 ps-5">
            <Flex justify="space-between" align="center" mb="xl">
              <Title order={2}>
                Browse by{" "}
                <Text span c="#E90808" inherit>
                  Body
                </Text>
              </Title>
              <Anchor component={Link} href="#" c="pink">
                Show all Makes
              </Anchor>
            </Flex>

            <div className="cat-by-brand cat-by-body">
              <div className="row">
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Convertible.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Convertible</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/coupe.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Coupe</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Hatchback.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Hatchback</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Minivan.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Minivan</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Pickups.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Pickups</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Sedan.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Sedan</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/Sport-Cars.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>Sport Cars</Link>
                  </Flex>
                </div>
                <div className="col-sm-3">
                  <Flex className="single-brand-item" direction="column">
                    <Image
                      width={100}
                      height={100}
                      src="/car-body/SUV.svg"
                      className="mx-auto text-center"
                    />
                    <Link href={"#"}>SUV</Link>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
