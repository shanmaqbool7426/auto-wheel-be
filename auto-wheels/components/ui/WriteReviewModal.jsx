import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Input,
  List,
  Modal,
  Paper,
  Rating,
  rem,
  Text,
  Textarea,
  Title,
  Button,
} from "@mantine/core";
import React from "react";
import {
  EmohiVeryHappy,
  EmojiDisappointed,
  EmojiHappy,
  EmojiPlain,
  EmojiSad,
} from "../Icons";
import { FaStar } from "react-icons/fa6";

const WriteReviewModal = ({ opened, close }) => {
  const getEmptyIcon = (value) => {
    switch (value) {
      case 1:
        return (
          <EmojiSad style={{ marginRight: rem(5) }} selectedColor="#B1B1B1" />
        );
      case 2:
        return (
          <EmojiDisappointed
            style={{ marginRight: rem(5) }}
            selectedColor="#B1B1B1"
          />
        );
      case 3:
        return (
          <EmojiPlain style={{ marginRight: rem(5) }} selectedColor="#B1B1B1" />
        );
      case 4:
        return (
          <EmojiHappy style={{ marginRight: rem(5) }} selectedColor="#B1B1B1" />
        );
      case 5:
        return (
          <EmohiVeryHappy
            style={{ marginRight: rem(5) }}
            selectedColor="#B1B1B1"
          />
        );
      default:
        return null;
    }
  };
  const getFullIcon = (value) => {
    switch (value) {
      case 1:
        return (
          <EmojiSad style={{ marginRight: rem(5) }} selectedColor="#FFC513" />
        );
      case 2:
        return (
          <EmojiDisappointed
            style={{ marginRight: rem(5) }}
            selectedColor="#FFC513"
          />
        );
      case 3:
        return (
          <EmojiPlain style={{ marginRight: rem(5) }} selectedColor="#FFC513" />
        );
      case 4:
        return (
          <EmojiHappy style={{ marginRight: rem(5) }} selectedColor="#FFC513" />
        );
      case 5:
        return (
          <EmohiVeryHappy
            style={{ marginRight: rem(5) }}
            selectedColor="#FFC513"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      opened={true}
      onClose={close}
      withCloseButton
      padding="xl"
      size="50%"
      title={
        <Text size="xl" fw={600}>
          Rate & Review Maruti Alto 800 and Win
        </Text>
      }
    >
      {/* Code For First Modal */}
      {/* <Box className="row">
        <Box className="col-md-7">
          <Card
            shadow="0px 4px 20px 0px #00000014"
            padding={0}
            target="_blank"
            withBorder
          >
            <Flex align="center" gap="sm">
              <Card.Section>
                <Image
                  src="/blogs/blogs-1.png"
                  alt="No way!"
                  w={100}
                  h="100%"
                />
              </Card.Section>
              <Text fw={600} size="lg" h="100%">
                <Text size="md" c="dimmed" fw={400}>
                  Rate and Review
                </Text>
                Maruti Alto 800
                <ActionIcon ml="sm" variant="transparent" color="#E90808">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 8.62492V10.4999H3.375L8.905 4.96992L7.03 3.09492L1.5 8.62492ZM10.705 3.16992L8.83 1.29492L7.565 2.56492L9.44 4.43992L10.705 3.16992Z"
                      fill="currentColor"
                    />
                  </svg>
                </ActionIcon>
              </Text>
            </Flex>
          </Card>
          <Title order={4} fw={600} mt="md" mb="md">
            Rate your Experience
          </Title>
          <Group mb="sm">
            <Text w="20ch">Mileage</Text>
            <Rating
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
            />
          </Group>
          <Group mb="sm">
            <Text w="20ch">Maintenance Cost</Text>
            <Rating
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
            />
          </Group>
          <Group mb="sm">
            <Text w="20ch">Safety</Text>
            <Rating
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
            />
          </Group>
          <Group mb="sm">
            <Text w="20ch">Features and Styling</Text>
            <Rating
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
            />
          </Group>
          <Group mb="sm">
            <Text w="20ch">Comfort</Text>
            <Rating
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
            />
          </Group>
          <Group mb="sm">
            <Text w="20ch">Performance</Text>
            <Rating
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
            />
          </Group>
        </Box>
        <Box className="col-md-5">
          <Paper p="lg" shadow="0px 4px 20px 0px #00000014" withBorder>
            <Group mb="md">
              <Image src="bulb-icon.svg" alt="Bulb Icon" />
              <Text fw={600}>Tips for a Good Review</Text>
            </Group>
            <List c="dimmed" spacing="md" listStyleType="disc" size="sm">
              <List.Item>
                Tell us about your buying experience and why you shortlisted
                this car
              </List.Item>
              <List.Item>List out the pros and cons of your car</List.Item>
              <List.Item>
                Talk about the overall performance of your car, mileage, pickup,
                comfort level, etc
              </List.Item>
              <List.Item>
                How's the after-sales service and what are the costs involved
              </List.Item>
              <List.Item>Give a suitable title to your review</List.Item>
              <List.Item>
                Don't use all caps and avoid sharing personal details here
              </List.Item>
            </List>
          </Paper>
        </Box>
      </Box> */}
      {/* Code For First Modal */}
      <Box className="row">
        <Box className="col-md-7">
          <Card
            shadow="0px 4px 20px 0px #00000014"
            padding={0}
            mb="md"
            target="_blank"
            withBorder
          >
            <Flex align="center" gap="sm">
              <Card.Section>
                <Image
                  src="/blogs/blogs-1.png"
                  alt="No way!"
                  w={100}
                  h="100%"
                />
              </Card.Section>
              <Text fw={600} size="lg" h="100%">
                <Text size="md" c="dimmed" fw={400}>
                  Rate and Review
                </Text>
                Maruti Alto 800
                <ActionIcon ml="sm" variant="transparent" color="#E90808">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 8.62492V10.4999H3.375L8.905 4.96992L7.03 3.09492L1.5 8.62492ZM10.705 3.16992L8.83 1.29492L7.565 2.56492L9.44 4.43992L10.705 3.16992Z"
                      fill="currentColor"
                    />
                  </svg>
                </ActionIcon>
              </Text>
            </Flex>
          </Card>
          <Paper bg="#F3F3F3" ta="center" p="lg" mb="md">
            <Title order={5} fw={500} mb="xs">
              Your Overall Rating:
            </Title>
            <Flex justify="center" align="center" gap="2">
              <FaStar fontSize={rem(30)} color="#FFA236" />
              <Text fw={600} size={rem(24)}>
                4.3
              </Text>
            </Flex>
          </Paper>
          <Box mb="md">
            <Textarea
              placeholder="Share the details of your experience"
              rows={4}
              cols={4}
            />
            <Text c="dimmed" size="xs" mt={5} ta="end">
              Minimum 100 characters
            </Text>
          </Box>
          <Box mb="md">
            <Input placeholder="Title of your Review" />
            <Text c="dimmed" size="xs" mt={5} ta="end">
              Minimum 100 characters
            </Text>
          </Box>
          <Button color="#E90808" fullWidth>
            Submit Review
          </Button>
        </Box>
        <Box className="col-md-5">
          <Paper p="lg" shadow="0px 4px 20px 0px #00000014" withBorder>
            <Group mb="md">
              <Image src="bulb-icon.svg" alt="Bulb Icon" />
              <Text fw={600}>Tips for a Good Review</Text>
            </Group>
            <List c="dimmed" spacing="md" listStyleType="disc" size="sm">
              <List.Item>
                Tell us about your buying experience and why you shortlisted
                this car
              </List.Item>
              <List.Item>List out the pros and cons of your car</List.Item>
              <List.Item>
                Talk about the overall performance of your car, mileage, pickup,
                comfort level, etc
              </List.Item>
              <List.Item>
                How's the after-sales service and what are the costs involved
              </List.Item>
              <List.Item>Give a suitable title to your review</List.Item>
              <List.Item>
                Don't use all caps and avoid sharing personal details here
              </List.Item>
            </List>
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
};

export default WriteReviewModal;
