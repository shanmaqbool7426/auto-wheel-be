import { Anchor, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrowseByCategory = ({ makes, bodies }) => {
  console.log("BrowseByCategory >>>>>>>", bodies);
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

              <Anchor component={Link} href="#" c="#E90808">
                Show all Makes
              </Anchor>
            </Flex>
            <div className="cat-by-brand">
              <div className="row">
                {makes?.data?.map((item, index) => {
                  return (
                    <div className="col-sm-3" key={index}>
                      <Flex direction="column" className="single-brand-item">
                        <Image
                          width={100}
                          height={100}
                          src={item.companyImage}
                          className="mx-auto text-center"
                        />
                        <Link href={"#"}>{item.name}</Link>
                      </Flex>
                    </div>
                  );
                })}
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
                {bodies?.data?.map((body, index) => {
                  return (
                    <div className="col-sm-3" key={index}>
                      <Flex direction="column" className="single-brand-item">
                        <Image
                          width={100}
                          height={100}
                          src={body.bodyImage}
                          className="mx-auto text-center"
                        />
                        <Link href={"#"}>{body.name}</Link>
                      </Flex>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
