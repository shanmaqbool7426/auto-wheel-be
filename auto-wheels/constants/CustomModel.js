import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Grid,
  Image,
  Input,
  List,
  Modal,
  Paper,
  ScrollArea,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BsArrowRight, BsSearch } from 'react-icons/bs';

const CustomModel = ({ isOpen, onClose:closeModal  ,selection,setSelection }) => {
  const [opened, { open, close }] = useDisclosure(isOpen);
  const handleSelection = (type, value) => {
    setSelection(prev => {
      const updatedSelection = { ...prev, [type]: value };

      if (type === 'make') {
        return {
          ...updatedSelection,
          model: '',  // Reset model and variant
          variant: '',
        };
      }

      if (type === 'model') {
        return {
          ...updatedSelection,
          variant: '',  // Reset variant
        };
      }

      return updatedSelection;
    });
  };

  useEffect(() => {
    if (isOpen) open();
    else close();
  }, [isOpen, open, close]);

  useEffect(() => {
    console.log('Current Selection:', selection);
  }, [selection]);






  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close || closeModal}
        withCloseButton={false}
        size="50%"
        padding={0}
      >
        <Paper
          className="search-modal-header"
          p="xs"
          shadow="0px 2px 5px 0px #00000014"
        >
          <Center>
            <Button
              className={`tab-button ${!selection.model && !selection.variant ? 'active' : ''}`}
              color="#E90808"
              size="xs"
              mr="md"
              onClick={() => {
                if (selection.make) {
                  setSelection(prev => ({ ...prev, make: '' }));
                }
              }}
            >
              Make
            </Button>
            <Button
              className={`tab-button ${selection.make && !selection.model ? 'active' : ''}`}
              variant="subtle"
              bg="#F3F3F3"
              color="#878787"
              size="xs"
              mr="md"
              autoContrast
              onClick={() => {
                if (selection.model) {
                  setSelection(prev => ({ ...prev, model: '' }));
                }
              }}
            >
              Model
            </Button>
            <Button
              className={`tab-button ${selection.model ? 'active' : ''}`}
              variant="subtle"
              bg="#F3F3F3"
              color="#878787"
              size="xs"
              mr="md"
              autoContrast
              onClick={() => {
                if (selection.variant) {
                  setSelection(prev => ({ ...prev, variant: '' }));
                }
              }}
            >
              Variants
            </Button>
          </Center>
        </Paper>
        <Grid gutter={0}>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Make"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              Popular
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                {makes.map(make => (
                  <List.Item
                    key={make}
                    className={`search-dropdown-lists__item ${selection.make === make ? 'selected' : ''}`}
                    icon={<Image src={`/megamenu/search-menu/${make.toLowerCase()}-sm.svg`} />}
                    onClick={() => handleSelection('make', make)}
                  >
                    {make} <BsArrowRight />
                  </List.Item>
                ))}
              </List>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Model"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              All Models
            </Title>
            <ScrollArea
              h={250}
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                {selection.make && models[selection.make]?.map(model => (
                  <List.Item
                    key={model}
                    className={`search-dropdown-lists__item ${selection.model === model ? 'selected' : ''}`}
                    onClick={() => handleSelection('model', model)}
                  >
                    {model} <BsArrowRight />
                  </List.Item>
                ))}
              </List>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Variant"
              leftSection={<BsSearch />}
            />
            <Title order={5} my="sm" fw={600}>
              Variants
            </Title>
            <ScrollArea
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                {selection.model && variants[selection.model]?.map(variant => (
                  <List.Item
                    key={variant}
                    className={`search-dropdown-lists__item ${selection.variant === variant ? 'selected' : ''}`}
                    onClick={() => handleSelection('variant', variant)}
                  >
                    {variant} <BsArrowRight />
                  </List.Item>
                ))}
              </List>
            </ScrollArea>
          </Grid.Col>
        </Grid>
        <Box className='text-center mb-2' >
            <Button   className={`tab-button ${!selection.model && !selection.variant ? 'active' : ''}`}
              color="#E90808"
              size="xs"
              mr="md"
              onClick={closeModal}>Done</Button>
        </Box>
      </Modal>

   
    </Box>
  );
};

export default CustomModel;
