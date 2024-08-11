"use client";

import {
  CalendarIcon,
  CarKey,
  ClipboardIcon,
  ClockIcon,
  DocumentSquareIcon,
  DollarIcon,
  FeaturedCrownIcon,
  FuelIcon,
  FuelTank,
  GearIcon,
  GearsHandle,
  HistoryIcon,
  LocationPinIcon,
  MessageIcon,
  MeterSquareIcon,
  PaintIcon,
  PhoneIcon,
  RanchIcon,
  RatingIcon,
  ReportFlag,
  RoadIcon,
  SearchIcon,
  ShareSquareIcon,
  SmallCarIcon,
  SteeringIcon,
  TransmissionIcon,
  TrustCar,
  VerifiedUser,
  WhatsappIcon,
} from "@/components/Icons";
import { BsStarFill, BsStar } from "react-icons/bs";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Group,
  Image,
  Slider,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import NextImage from "next/image";
import { FaCalendarDays, FaClock, FaLocationDot } from "react-icons/fa6";

export default function ProductDetail() {
  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  return (
    <>
      <section className="product-detail py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <span className="icon">
                    <SearchIcon />
                  </span>
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      Wide range of Brands
                    </h5>
                    <p className="mb-0 text-muted content">
                      Our services department maintains your vehicle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body">
                  <span className="icon">
                    <RanchIcon />
                  </span>
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      Wide range of Brands
                    </h5>
                    <p className="mb-0 text-muted content">
                      Our services department maintains your vehicle
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0">
                <div className="card-body justify-content-start gap-3 size-5">
                  <span className="icon">
                    <TrustCar />
                  </span>
                  <div>
                    <h5 className="card-title fw-semibold mb-1">
                      Trusted by thousands
                    </h5>
                    <p className="mb-0 text-muted content">
                      Department maintains your car to stay safe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-8">
              {/* Car Pricing Section */}
              <section className="car-price-section">
                <div className="product-info text-primary d-flex justify-content-between align-items-center">
                  <div className="title-section">
                    <div className="title-sm fs-5 fw-semibold lh-sm">
                      Used 1.6 L
                    </div>
                    <div className="main-title fs-1 fw-bold">2016 Kia Rio</div>
                  </div>
                  <div className="price-field">Rs 7,400,000</div>
                </div>

                <div className="features-section">
                  <div className="text-dark d-flex gap-2 my-2">
                    <ClockIcon /> (Updated 1 month ago)
                  </div>
                  <div className="featured my-3">
                    <ul className="list-unstyled list-inline m-0">
                      <li className="list-inline-item">
                        <DocumentSquareIcon />
                      </li>
                      <li className="list-inline-item">
                        <RatingIcon />
                      </li>
                      <li className="list-inline-item">
                        <SteeringIcon />
                      </li>
                      <li className="list-inline-item">
                        <ShareSquareIcon />
                      </li>
                      <li className="list-inline-item">
                        <MeterSquareIcon />
                      </li>
                    </ul>
                    <div className="featrured-tag text-primary ms-auto text-uppercase fw-semibold">
                      <FeaturedCrownIcon />
                      <span className="ms-2">featured listing</span>
                    </div>
                  </div>
                </div>
              </section>
              {/* Product Image Section */}
              <section className="product-image-section my-5">
                <h1>Image to be placed Here</h1>
              </section>
              {/* Product Image Section */}

              {/* Summary Section */}
              <section className="summary-section">
                <h4 className="section-title fw-semibold mb-4">Car Summary</h4>
                <div className="row">
                  <div className="col-md-4">
                    <ul className="list-unstyled">
                      <li>
                        <span className="fs-6 text-primary fw-bold icon">
                          #
                        </span>
                        <span className="text-muted summary-info">
                          Stock id
                        </span>
                        <span className="text-dark fw-semibold">143</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <FuelTank />
                        </span>
                        <span className="text-muted summary-info">Engine</span>
                        <span className="text-dark fw-semibold">1.6L</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <GearIcon />
                        </span>
                        <span className="text-muted summary-info">Drive</span>
                        <span className="text-dark fw-semibold">FWD</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <CarKey />
                        </span>
                        <span className="text-muted summary-info">
                          Rego Expire
                        </span>
                        <span className="text-dark fw-semibold">10/2023</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <ul className="list-unstyled">
                      <li>
                        <span className="fs-6 text-primary fw-bold icon">
                          <SmallCarIcon />
                        </span>
                        <span className="text-muted summary-info">Body</span>
                        <span className="text-dark fw-semibold">Sedan</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <RoadIcon />
                        </span>
                        <span className="text-muted summary-info">Mileage</span>
                        <span className="text-dark fw-semibold">48743Km</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <CalendarIcon />
                        </span>
                        <span className="text-muted summary-info">Year</span>
                        <span className="text-dark fw-semibold">2020</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <PaintIcon />
                        </span>
                        <span className="text-muted summary-info">
                          Exterior
                        </span>
                        <span className="text-dark fw-semibold">Gray</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <ul className="list-unstyled">
                      <li>
                        <span className="fs-6 text-primary fw-bold icon">
                          <FuelIcon />
                        </span>
                        <span className="text-muted summary-info">
                          Fuel Type
                        </span>
                        <span className="text-dark fw-semibold">Gasoline</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <TransmissionIcon />
                        </span>
                        <span className="text-muted summary-info">
                          Transmission
                        </span>
                        <span className="text-dark fw-semibold">Manual</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <HistoryIcon />
                        </span>
                        <span className="text-muted summary-info">History</span>
                        <span className="text-dark fw-semibold">Coupe</span>
                      </li>
                      <li>
                        <span className="fs-6 text-primary icon">
                          <ClipboardIcon />
                        </span>
                        <span className="text-muted summary-info">
                          VIN: 15JUHF7HC6HBT
                        </span>
                        <span className="text-dark fw-semibold"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              {/* Summary Section */}

              {/* Featured Section */}
              <section className="featured-section">
                <h4 className="section-title fw-semibold mb-4">Feature</h4>
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    ABS
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    Alloy wheels
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    Auxiliary heating
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    Bluetooth
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    CD player
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    Central locking
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    Launch Control
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    MP3 player
                  </li>
                  <li className="list-inline-item">
                    <span className="icon text-primary me-2 fs-6">
                      <FaCheckCircle />
                    </span>
                    Software autoupdate
                  </li>
                </ul>
              </section>
              {/* Featured Section */}

              {/* Seller Section */}
              <section className="seller-section">
                <h4 className="section-title fw-semibold mb-4">
                  Sellers Notes
                </h4>
                <p>
                  Fusce viverra, ligula quis pellentesque interdum, leo felis
                  congue dui, ac accumsan sem nulla id lorem. Praesent ut
                  tristique dui, nec condimentum lacus. Maecenas lobortis ante
                  id egestas placerat. Nullam at ultricies lacus. Nam in nulla
                  consectetur, suscipit mauris eu, fringilla augue. Phasellus
                  gravida, dui quis dignissim tempus, tortor orci tristique leo,
                  ut congue diam ipsum at massa. Pellentesque ut vestibulum
                  erat. Donec a felis eget tellus laoreet ultrices.
                </p>
                <div className="calc-container mt-4">
                  <div className="card border-0">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="card-body">
                          <h4 className="heading fw-bold">
                            EMI calculator
                            <p className="mt-2 text-muted fw-normal fs-6">
                              Avail upto 100% of the car value in finance at
                              attractive interest rates
                            </p>
                          </h4>
                          <div className="slider-wrapper">
                            <Group
                              justify="space-between"
                              align="center"
                              mb="lg"
                            >
                              <Title order={3}>Loan Amount</Title>
                              <Badge color="#EB2321" size="xl" radius="sm">
                                Rs 230,000
                              </Badge>
                            </Group>

                            <Slider
                              thumbSize={25}
                              size="xs"
                              color="#EB2321"
                              value={value}
                              onChange={setValue}
                              onChangeEnd={setEndValue}
                            />
                            <Group justify="space-between" align="center">
                              <Text mt="xs" size="lg" fw={600}>
                                Rs {value}
                              </Text>
                              <Text mt="xs" size="lg" fw={600}>
                                Rs {endValue}
                              </Text>
                            </Group>
                          </div>
                          <div className="slider-wrapper">
                            <Group
                              justify="space-between"
                              align="center"
                              my="lg"
                            >
                              <Title order={3}>Rate of Interest</Title>
                              <Badge color="#EB2321" size="xl" radius="sm">
                                18%
                              </Badge>
                            </Group>

                            <Slider
                              thumbSize={25}
                              size="xs"
                              color="#EB2321"
                              value={value}
                              onChange={setValue}
                              onChangeEnd={setEndValue}
                            />
                            <Group justify="space-between" align="center">
                              <Text mt="xs" size="lg" fw={600}>
                                {value}%
                              </Text>
                              <Text mt="xs" size="lg" fw={600}>
                                {endValue}%
                              </Text>
                            </Group>
                          </div>
                          <div className="duration-wrapper mt-3">
                            <Title order={3}>
                              Duration
                              <Text span fw="normal" ml={5}>
                                in years
                              </Text>
                            </Title>
                            <Group mt="md" align="center">
                              <button className="duration-btn">1</button>
                              <button className="duration-btn">2</button>
                              <button className="duration-btn active">3</button>
                              <button className="duration-btn">4</button>
                              <button className="duration-btn">5</button>
                              <button className="duration-btn">6</button>
                              <button className="duration-btn">7</button>
                            </Group>
                            <div className="card emi-card">
                              <div className="card-body align-items-center flex-row justify-content-between">
                                <div className="left-area">
                                  <Text size="md">Your Monthly EMI</Text>
                                  <Title fw={600} order={2}>
                                    Rs 10,475
                                  </Title>
                                </div>
                                <div className="right">
                                  <Button
                                    variant="transparent"
                                    color="#E90808"
                                    size="md"
                                  >
                                    View Breakup
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Text c="#878787" mt="sm">
                              *Interest rate and loan amount offered may vary
                              subject to customer risk profile
                            </Text>
                            <Button
                              variant="filled"
                              fullWidth
                              color="#E90808"
                              size="lg"
                              my="md"
                            >
                              Interested in Loan
                            </Button>
                            <Text>550+ customers availed the facility</Text>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <Image
                          alt="My image"
                          src="/calc-placeholder.svg"
                          className="image-placeholder"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Seller Section */}
            </div>
            <div className="col-md-4">
              <div className="seller-info">
                <h4 className="fw-semibold mb-1">
                  Native Americans <VerifiedUser />
                </h4>
                <span className="text-muted">Private dealer</span>
                <div className="row mt-3 mb-4">
                  <div className="col">
                    <Card padding="xs" radius="sm" withBorder>
                      <Image
                        src="/detail/seller-company.png"
                        height={160}
                        alt="Norway"
                      />
                    </Card>
                  </div>
                  <div className="col">
                    <div className="rating">
                      <div className="fs-5 text-warning d-flex align-items-center">
                        <span>
                          <BsStarFill />
                        </span>
                        <span>
                          <BsStarFill />
                        </span>
                        <span>
                          <BsStarFill />
                        </span>
                        <span>
                          <BsStar />
                        </span>
                        <span>
                          <BsStar />
                        </span>
                        <span className="text-dark ms-2 fs-6">(3/5)</span>
                      </div>
                      <span className="d-block text-muted mt-2">
                        (Review 15)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="card seller-phone-card mb-3">
                      <div className="card-body gap-2">
                        <PhoneIcon />
                        <h5 className="fw-bold mb-0">(71*******)</h5>
                        <span className="text-decoration-underline text-muted">
                          Show Number
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card whatsapp-icon mb-3">
                      <div className="card-body gap-2 align-items-center">
                        <WhatsappIcon />
                        <h5 className="fw-bold mb-0">CHAT VIA WHATSAPP</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card whatsapp-icon mb-3">
                      <div className="card-body gap-2 align-items-center">
                        <MessageIcon />
                        <h5 className="fw-bold mb-0 text-uppercase">
                          Message To Dealer
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card whatsapp-icon mb-3">
                      <div className="card-body gap-2 align-items-center">
                        <DollarIcon />
                        <h5 className="fw-bold mb-0 text-uppercase">
                          Make an offer price
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card address-card mb-3">
                    <div className="card-body gap-2 align-items-center text-primary">
                      <LocationPinIcon />
                      <div className="text-muted address-info">
                        Gare Du Nord, Rue de Maubeuge, Paris, France
                        <ul className="list-unstyled mb-0 text-muted mt-2">
                          <li>
                            Mon to Fri
                            <span className="ms-5">Timings: 9AM to 9PM</span>
                          </li>
                          <li>
                            Sat & Sun
                            <span className="ms-5">Timings: 11AM to 6PM </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body d-block gap-2 align-items-center">
                      <h6 className="text-primary mb-3">
                        Safety tips for transaction
                      </h6>
                      <ol>
                        <li>Use a safe location to meet seller</li>
                        <li>Avoid cash transactions</li>
                        <li>Beware of unrealistic offers</li>
                      </ol>
                      <Link
                        href={"#"}
                        className="text-decoration-none d-block float-end"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card mb-3">
                    <div className="card-body gap-2 align-items-center justify-content-center text-uppercase">
                      <ReportFlag />
                      <h5 className="mb-0 fw-semibold text-primary">
                        Report this ad
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-seller">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0 shadow-none contact-seller-info">
                <div className="card-body card-border">
                  <div className="seller-info">
                    <h4 className="fw-semibold mb-1">
                      Native Americans <VerifiedUser />
                    </h4>
                    <span className="text-muted">Private dealer</span>
                    <div className="row mt-3 mb-4">
                      <div className="col">
                        <Card padding="xs" radius="sm" withBorder>
                          <Image
                            src="/detail/seller-company.png"
                            height={160}
                            alt="Norway"
                          />
                        </Card>
                      </div>
                      <div className="col">
                        <div className="rating">
                          <div className="fs-5 text-warning d-flex align-items-center justify-content-center">
                            <span>
                              <BsStarFill />
                            </span>
                            <span>
                              <BsStarFill />
                            </span>
                            <span>
                              <BsStarFill />
                            </span>
                            <span>
                              <BsStar />
                            </span>
                            <span>
                              <BsStar />
                            </span>
                            <span className="text-dark ms-2 fs-6">(3/5)</span>
                          </div>
                          <span className="d-block text-muted mt-2">
                            (Review 15)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card seller-phone-card mb-3">
                        <div className="card-body gap-2">
                          <PhoneIcon />
                          <h5 className="fw-bold mb-0">(71*******)</h5>
                          <span className="text-decoration-underline text-muted">
                            Show Number
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card whatsapp-icon mb-3">
                        <div className="card-body gap-2 align-items-center">
                          <WhatsappIcon />
                          <h5 className="fw-bold mb-0">CHAT VIA WHATSAPP</h5>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="card address-card mb-3">
                        <div className="card-body gap-2 align-items-center text-primary">
                          <LocationPinIcon />
                          <div className="text-muted address-info">
                            Gare Du Nord, Rue de Maubeuge, Paris, France
                            <ul className="list-unstyled mb-0 text-muted mt-2">
                              <li>
                                Mon to Fri
                                <span className="ms-5">
                                  Timings: 9AM to 9PM
                                </span>
                              </li>
                              <li>
                                Sat & Sun
                                <span className="ms-5">
                                  Timings: 11AM to 6PM{" "}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="contact-form">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <Text
                        size="xl"
                        mb="md"
                        fw={600}
                        className="text-uppercase"
                      >
                        Message to Seller
                      </Text>
                      <Textarea size="md" autosize minRows={10} maxRows={10} />
                    </div>
                    <div className="col-md-4">
                      <TextInput
                        size="md"
                        label="Name"
                        my="md"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-4">
                      <TextInput
                        my="md"
                        size="md"
                        label="Email"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="col-md-4">
                      <TextInput
                        my="md"
                        size="md"
                        label="Phone"
                        placeholder="+91 321 674 9854"
                      />
                    </div>
                    <div className="col-md-12">
                      <Group gap="md" align="center" mb="md">
                        <Checkbox />
                        <Text>
                          I accept the{" "}
                          <Link href="#" className="text-decoration-none">
                            Privacy Policy
                          </Link>
                        </Text>
                      </Group>
                    </div>
                    <div className="col-md-12">
                      <Button type="submit" size="lg" color="#EB2321">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="similar-product py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Title order={2} mb="lg">
                Similar Results
              </Title>
            </div>
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <div className="card product-card">
                    <div className="product-image position-relative">
                      <div className="featured-badge">Special</div>
                      <div className="product-price">Rs 7,400,000</div>
                      <NextImage
                        src="/products/product-placeholder.png"
                        className="card-img-top object-fit-cover img-fluid"
                        alt="Product Placeholder"
                        width={270}
                        height={160}
                      />
                    </div>
                    <div className="progress-bars">
                      <span className="single-bar active"></span>
                      <span className="single-bar"></span>
                      <span className="single-bar"></span>
                    </div>
                    <div className="card-body">
                      <div className="product-content">
                        <Link
                          href={"#"}
                          className="d-inline-block product-title"
                        >
                          Used 3.0 L 2016 Mazda CX-30
                        </Link>
                      </div>
                      <div className="product-meta">
                        <div className="meta-info d-flex justify-content-between align-items-center">
                          <span className="text-muted d-flex align-items-center gap-1">
                            <RoadIcon /> 2500km
                          </span>
                          <span className="text-muted d-flex align-items-center gap-1">
                            <FuelTank /> 2.4 L
                          </span>
                          <span className="text-muted d-flex align-items-center gap-1">
                            <LocationPinIcon /> Lahore
                          </span>
                        </div>
                        <div className="stock-info d-flex justify-content-between align-items-center mt-2">
                          <span>
                            <span className="text-muted">stock#</span> 324
                          </span>
                          <span className="text-muted">
                            <FaClock /> (Updated 1 month ago)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
