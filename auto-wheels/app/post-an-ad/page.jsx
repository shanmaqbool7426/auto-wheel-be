"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Title,
  Text,
  Flex,
  Select,
  Stepper,
  Group,
  rem,
  Input,
  Textarea,
  FileInput,
  Pill,
  SimpleGrid,
  Image,
  NumberInput,
  Checkbox,
  Switch,

  ThemeIcon,
} from "@mantine/core";

import { BiMobileAlt, BiSolidUserRectangle } from "react-icons/bi";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaCar,
  FaWhatsapp,
} from "react-icons/fa6";

import { LightBulb } from "@/components/Icons";
import ImageUploader from "@/components/ui/ImageUploader";
import { IconCircleCheck } from "@tabler/icons-react";
import { HiDocumentAdd } from "react-icons/hi";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {cities ,colorOptions,registrationOptions,suburbs,carTags} from "@/mock-data/mock-array"
import CustomModel from "@/constants/CustomModel"
// import { cities } from "@/constants/vehicle-constants"; 


const PostAnAd = () => {
  const [activeStep, setActiveStep] = useState(0);
    const [files, setFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selection, setSelection] = useState({
    make: '',
    model: '',
    variant: '',
  });
    const [formData, setFormData] = useState({
    condition: '',
    city: '',
    suburb: '',
    registeredIn:"",
    rego: '',
    exteriorColor: '',
    milage:"",
    price:"",
    description:"",
  });

  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    console.log("🚀 ~ PostAnAd ~ files:", files)

  console.log("formData---",formData)

  

    const handleChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };
   const handleDescriptionClick = (template) => {
    setFormData((prevData) => ({
      ...prevData,
      description: prevData.description + template
    }));
  };



  const nextStep = () =>
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));


  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Box className="uploaded-image-wrapper" pos="relative">
        <Image
          h={{ base: 140, sm: 140 }}
          key={index}
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
          radius="md"
          className="border object-fit-cover"
        />
      </Box>
    );
  });

  const featuredListsOne = [
    { name: "ABS" },
    {
      name: "Alloy Rims",
    },
    {
      name: "Cassette Player",
    },
    {
      name: "Climate Control",
    },
    {
      name: "Front Camera",
    },
    {
      name: "Keyless Entry",
    },
    {
      name: "Power Mirrors",
    },
    {
      name: "Rear Seat Entertainment",
    },
    {
      name: "Rear Camera",
    },
    {
      name: "USB and Auxillary Cable",
    },
  ];

  const featuredListsTwo = [
    { name: "Air Bags" },
    {
      name: "AM/FM Radio",
    },
    {
      name: "Cool Box",
    },
    {
      name: "DVD Player",
    },
    {
      name: "Navigation System",
    },
    {
      name: "Power Steering",
    },
    {
      name: "Rear AC Vents",
    },
    {
      name: "Sun Roof",
    },
  ];

  const featuredListsThree = [
    { name: "Air Conditioning" },
    {
      name: "CD Player",
    },
    {
      name: "Cruise Control",
    },
    {
      name: "Front Speakers",
    },
    {
      name: "Immobilizer Key",
    },
    {
      name: "Power Locks",
    },
    {
      name: "Power Windows",
    },
    {
      name: "Rear Speakers",
    },
    {
      name: "Steering Switches",
    },
  ];

  return (
    <>
      <Box component="section" className="post-an-ad" my="xl">
        <Box className="header-section bg-light" py={80}>
          <Box className="container">
            <Box className="row">
              <Box className="col-lg-12 text-center">
                <Title order={2} className="text-primary" mb="sm">
                  Sell your Car With 3 Easy & Simple Steps!
                </Title>
                <Text size="lg">It's free and takes less than a minute</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="stepper-forms" py="xl">
          <Box className="container">
            <Box className="row">
              <Box className="col-lg-12 text-center">
                <Stepper
                  active={activeStep}
                  onStepClick={setActiveStep}
                  color="#E90808"
                  completedIcon={<IconCircleCheck />}
                >
                  <Stepper.Step
                    icon={<FaCar />}
                    label="Step 1"
                    py="lg"
                    description=" Enter Your Car Information"
                  >
                    <Card
                      shadow="0px 4px 20px 0px #00000014"
                      p={{ base: "md", md: "lg" }}
                      className="text-start border-top border-primary border-5"
                    >
                      <Title order={3}>Car Information</Title>
                      <Text c="dimmed">
                        (All fields marked with * are mandatory)
                      </Text>

                    {/* step 1 start*/}

                        <Box className="stepper-form" mt="xl">
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Condition
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
            size="md"
            placeholder="New"
            data={["New", "Used", "Refurbished"]}
            value={formData.condition}
               onChange={(value) => handleChange(value, 'condition')}
           
          />
                          </Box>
                        </Box>

                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              City
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                           <Select
            size="md"
            placeholder="City"
            data={cities}
            value={formData.city}
             onChange={(value) => handleChange(value, 'city')}
     
          />
                          </Box>
                          <Box className="col-md-3 text-center">
                            <Group gap="xs" align="center">
                              <LightBulb />
                              <Text size="sm">
                                We don't allow duplicates of same ad.
                              </Text>
                            </Group>
                          </Box>
                        </Box>

                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Suburb
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Suburb"
                              data={suburbs}
                              value={formData.suburb}
                               onChange={(value) => handleChange(value, 'suburb')}
                             
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Car Info
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7" onClick={openModal} >
                        
                            <Select
                              size="md"
                              placeholder="Car Info "
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Registered In
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Registered In"
                              data={registrationOptions}
                              value={formData.registeredIn}
                               onChange={(value) => handleChange(value, 'registeredIn')}
                             
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Rego
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Rego"
                              data={registrationOptions}
                                value={formData.rego}
                              onChange={(value) => handleChange(value, 'rego')}
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Exterior Color
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Exterior Color"
                              data={colorOptions}
                                value={formData.exteriorColor}
                                onChange={(value) => handleChange(value, 'exteriorColor')}
                              
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Mileage
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Input
                              placeholder="0.10"
                              rightSection={
                                <Text span inherit size="xs">
                                  KM
                                </Text>
                              }
                               type="number" 
                              size="md"
                             value={formData.milage}
                             onChange={(value) => handleChange(value.target.value, 'milage')}
                           
                            />
                          </Box>
                          <Box className="col-md-3 text-start">
                            <Flex align="center" gap="xs">
                              <LightBulb styles={{ flex: "1 1 2.5rem" }} />
                              <Text size="sm">
                                We don't allow promotional messages that are not
                                relevant to the ad
                              </Text>
                            </Flex>
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Price
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Input
                              placeholder="54,683,506"
                              rightSection={
                                <Text span inherit size="xs">
                                  PKR
                                </Text>
                              }
                             type="number" 
                              size="md"
                               value={formData.price}
                                onChange={(value) => handleChange(value.target.value, 'price')}
                            />
                          </Box>
                          <Box className="col-md-3 text-start">
                            <Flex align="center" gap="xs">
                              <LightBulb styles={{ flex: "1 1 2.5rem" }} />
                              <Text size="sm">
                                Please enter a realistic price to get more
                                genuine responses.
                              </Text>
                            </Flex>
                          </Box>
                        </Box>
                        <Box className="row align-items-start" mb="md">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Ad Description
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Textarea
                              placeholder="Describe Your car: Example: Alloy rim, first owner, genuine parts, maintained by authorized workshop, excellent mileage, original paint etc."
                              size="md"
                              autosize
                              minRows={6}
                              maxRows={6}
                              fs={8}
                              value={formData.description}
                              onChange={(e) => handleChange(e.target.value,'description')}
                            />
                            <Group gap={0}>
                              <Text size="sm" c="dimmed" ml="auto">
                                Remaining Characters 995
                              </Text>

                              <Button
                                variant="transparent"
                                pr="0"
                                size="md"
                                className="text-primary"
                              >
                                Reset
                              </Button>
                            </Group>
                          </Box>
                        </Box>
                        <Box className="row align-items-start  " mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label
                              required
                              size="md"
                              className="text-primary"
                            >
                              Predefined Template
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7 border p-2 cursor-pointer ">
                          <Text size="sm">You can also use these suggestions</Text>
                            <Box className=" d-flex flex-wrap flex-row	gap-1 mt-2  "  >
                               {carTags.map((tag, index) => (
                        <Box   className="border p-2  rounded  m-2"   key={index}

            onClick={() => handleDescriptionClick(tag + ' ')} >
                         <Text size="sm" >{tag}</Text>
                        </Box>
          
        ))}
                            </Box>
                          </Box>
                        </Box>
                        <Box className="row align-items-start" mb="xl">
                          <Box className="col-md-12">
                            <Title order={4} mb="lg">
                              Upload Photos
                            </Title>
                            {/* <ImageUploader /> */}
                            <Dropzone
                              accept={IMAGE_MIME_TYPE}
                              onDrop={setFiles}
                              p={0}
                            >
                              <Image
                                src="/upload.png"
                                className="img-fluid w-100 h-100"
                                alt="Upload Image"
                              />
                            </Dropzone>

                            <SimpleGrid
                              cols={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
                              mt={previews.length > 0 ? "md" : 0}
                            >
                              {previews}
                            </SimpleGrid>
                          </Box>
                        </Box>
                      </Box>

                      {/* step 1 end*/}


                    </Card>
                  </Stepper.Step>
                  <Stepper.Step
                    py="lg"
                    icon={
                      <HiDocumentAdd
                        style={{ width: rem(22), height: rem(22) }}
                      />
                    }
                    label="Step 2"
                    description="Additional Car Information"
                  >
                    <Card
                      shadow="0px 4px 20px 0px #00000014"
                      p={{ base: "md", md: "lg" }}
                      className="text-start border-top border-primary border-5"
                    >
                      <Title order={3}>Additional Information</Title>

                      <Box className="stepper-form" mt="xl">
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Engine Type
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Petrol"
                              data={["React", "Angular", "Vue", "Svelte"]}
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Engine Capacity
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <NumberInput size="md" placeholder="1300" />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Transmission
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Transmission"
                              data={["React", "Angular", "Vue", "Svelte"]}
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Assembly
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Select
                              size="md"
                              placeholder="Local"
                              data={["React", "Angular", "Vue", "Svelte"]}
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-start" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label size="md">Feature</Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Box className="row">
                              <Box className="col-md-4">
                                {featuredListsOne.map((item, index) => {
                                  return (
                                    <Checkbox
                                      key={index}
                                      color="#E90808"
                                      label={item.name}
                                      mb="sm"
                                      size="sm"
                                    />
                                  );
                                })}
                              </Box>
                              <Box className="col-md-4">
                                {featuredListsTwo.map((item, index) => {
                                  return (
                                    <Checkbox
                                      key={index}
                                      color="#E90808"
                                      label={item.name}
                                      mb="sm"
                                      size="sm"
                                    />
                                  );
                                })}
                              </Box>
                              <Box className="col-md-4">
                                {featuredListsThree.map((item, index) => {
                                  return (
                                    <Checkbox
                                      key={index}
                                      color="#E90808"
                                      label={item.name}
                                      mb="sm"
                                      size="sm"
                                    />
                                  );
                                })}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Stepper.Step>
                  <Stepper.Step
                    py="lg"
                    icon={
                      <BiSolidUserRectangle
                        style={{ width: rem(20), height: rem(20) }}
                      />
                    }
                    label="Step3"
                    description="Contact Information"
                  >
                    <Card
                      shadow="0px 4px 20px 0px #00000014"
                      p={{ base: "md", md: "lg" }}
                      className="text-start border-top border-primary border-5"
                    >
                      <Title order={3}>Contact Information</Title>

                      <Box className="stepper-form" mt="xl">
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Mobile Number
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Input
                              type="number"
                              size="md"
                              placeholder="Mobile NumberPetrol"
                              rightSection={<BiMobileAlt />}
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                            <Input.Label required size="md">
                              Secondary Number (Optional)
                            </Input.Label>
                          </Box>
                          <Box className="col-md-7">
                            <Input
                              type="number"
                              size="md"
                              placeholder="Secondary Number (Optional)"
                              rightSection={<BiMobileAlt />}
                            />
                          </Box>
                        </Box>
                        <Box className="row align-items-center" mb="xl">
                          <Box className="col-md-6 offset-2 mb-2 mb-lg-0">
                            <Flex align="center" gap="xl">
                              <Flex align="center" gap="sm">
                                <ThemeIcon
                                  variant="filled"
                                  radius="lg"
                                  size="lg"
                                  color="green"
                                >
                                  <FaWhatsapp
                                    style={{ width: "60%", height: "60%" }}
                                  />
                                </ThemeIcon>
                                Allow WhatsApp Contact
                              </Flex>
                              <Switch size="xl" color="#E90808" />
                            </Flex>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Stepper.Step>
                  <Stepper.Completed>
                    <Title py="xl" order={2} fw={600}>
                      Your Ad Has Been Published Successfully!
                    </Title>
                  </Stepper.Completed>
                </Stepper>
                <Group
                  justify={activeStep >= 1 ? "space-between" : "flex-end"}
                  mt="xl"
                >
                  {activeStep >= 1 && (
                    <Button
                      variant="light"
                      fw={500}
                      autoContrast
                      leftSection={<FaArrowLeftLong />}
                      size="lg"
                      w={{ base: "100%", xs: rem(160) }}
                      color="#878787"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                  )}

                  <Button
                    autoContrast
                    fw={500}
                    color="#E90808"
                    size="lg"
                    rightSection={<FaArrowRightLong />}
                    w={{ base: "100%", xs: rem(160) }}
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                </Group>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>


        <CustomModel isOpen={isModalOpen} selection={selection} setSelection={setSelection} onClose={closeModal} />
    </>
  );
};

export default PostAnAd;
