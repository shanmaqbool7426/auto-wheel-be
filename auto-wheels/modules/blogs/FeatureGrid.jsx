import React from 'react';
import { BackgroundImage, Box ,Flex,Text,Title} from '@mantine/core';
import Link from "next/link";
import { formatDate } from '@/utils/index';

const FeatureGrid = ({ items }) => {
    const ImageCard = ({ imageUrl, title, publishDate, order ,slug}) => {
        return (
          <Box h={order === 1 ? 450 : 214} mb="md">
            <BackgroundImage h="100%" src={imageUrl} radius="sm">
              <Flex
                p="md"
                h="100%"
                direction="column"
                align="flex-start"
                justify="flex-end"
              >
                <Link href={`/blog/${slug}`} className="text-decoration-none">
                  <Title c="white" fw={500} order={order} mb="xs" lineClamp={2}>
                    {title}
                  </Title>
                </Link>
                <Text c="white">{formatDate(publishDate)}</Text>
              </Flex>
            </BackgroundImage>
          </Box>
        );
      };
  const renderGrid = () => {
    const count = items.length;

    if (count === 1) {
      return (
        <Box className="row">
          <Box className="col-md-12">
            <ImageCard {...items[0]} order={4} />
          </Box>
        </Box>
      );
    } else if (count === 2) {
      return (
        <Box className="row">
          {items.map((item, index) => (
            <Box className="col-md-6" key={index}>
              <ImageCard {...item} order={4} />
            </Box>
          ))}
        </Box>
      );
    } else if (count === 3) {
      return (
        <Box className="row">
          <Box className="col-md-6">
            <ImageCard {...items[0]} order={1} />
          </Box>
          <Box className="col-md-6">
            <Box className="row">
              {items.slice(1).map((item, index) => (
                <Box className="col-md-12" key={index}>
                  <ImageCard {...item} order={5} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      );
    } else if (count === 4) {
      return (
        <Box className="row">
          <Box className="col-md-6">
            <ImageCard {...items[0]} order={1} />
          </Box>
          <Box className="col-md-6">
            <Box className="row">
              {items.slice(1, 3).map((item, index) => (
                <Box className="col-md-6" key={index}>
                  <ImageCard {...item} order={5} />
                </Box>
              ))}
              <Box className="col-md-12">
                <ImageCard {...items[3]} order={5} />
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (count >= 5) {
      return (
        <Box className="row">
          <Box className="col-md-6">
            <ImageCard {...items[0]} order={1} />
          </Box>
          <Box className="col-md-6">
            <Box className="row">
              {items.slice(1, 3).map((item, index) => (
                <Box className="col-md-6" key={index}>
                  <ImageCard {...item} order={5} />
                </Box>
              ))}
              <Box className="col-md-6">
                <ImageCard {...items[3]} order={5} />
              </Box>
              <Box className="col-md-6">
                <ImageCard {...items[4]} order={5} />
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
  };

  return <>{renderGrid()}</>;
};

export default FeatureGrid;
