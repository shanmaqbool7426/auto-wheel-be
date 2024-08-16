

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
    Card,
    Image,
    Title,
} from "@mantine/core";
import Link from "next/link";
import { fetchVehiclDetail } from '@/services/vehicles'
import Calculator from "./calculator"
import SocialCards from "./socialCards"
import MessageToDealer from "./messageToDealer"
import SocialContact from "./socialContact"
import { FaCheckCircle } from "react-icons/fa";
// import { useState } from "react";
import NextImage from "next/image";
import { FaCalendarDays, FaClock, FaLocationDot } from "react-icons/fa6";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
export default async function vehicleDetailModule() {
    // const [value, setValue] = useState(50);
    // const [endValue, setEndValue] = useState(50);
    const detail = await fetchVehiclDetail(`${API_ENDPOINTS.VEHICLE_DETAIL}/66bb97d4933cfe6cdd01eca1`)
    console.log('Detail??????', detail)



    const carSummaryItems = [
        { icon: "#", label: "Stock id", value: detail?.data?.specifications?.stockId },
        { icon: <FuelTank />, label: "Engine", value: detail?.data?.specifications?.engine },
        { icon: <GearIcon />, label: "Drive", value: detail?.data?.specifications?.drive },
        { icon: <CarKey />, label: "Rego Expire", value: "10/2023" },
        { icon: <SmallCarIcon />, label: "Body", value: detail?.data?.specifications?.bodyType },
        { icon: <RoadIcon />, label: "Mileage", value: `${detail?.data?.specifications?.mileage} Km` },
        { icon: <CalendarIcon />, label: "Year", value: detail?.data?.year },
        { icon: <PaintIcon />, label: "Exterior", value: detail?.data?.specifications?.exteriorColor },
        { icon: <FuelIcon />, label: "Fuel Type", value: detail?.data?.specifications?.fuelType },
        { icon: <TransmissionIcon />, label: "Transmission", value: detail?.data?.specifications?.transmission },
        { icon: <HistoryIcon />, label: "History", value: detail?.data?.specifications?.bodyType },
        { icon: <ClipboardIcon />, label: "VIN", value: detail?.data?.specifications?.vin },
    ];


    const renderSummaryItems = (items) =>
        items.map((item, index) => (
            <li key={index}>
                <span className="fs-6 text-primary icon">{item.icon}</span>
                <span className="text-muted summary-info">{item.label}</span>
                <span className="text-dark fw-semibold">{item.value}</span>
            </li>
        ));

    const cards = [
        { icon: <SearchIcon />, title: "Wide range of Brands", content: "Our services department maintains your vehicle" },
        { icon: <RanchIcon />, title: "Wide range of Brands", content: "Our services department maintains your vehicle" },
        { icon: <TrustCar />, title: "Trusted by thousands", content: "Department maintains your car to stay safe" },
    ];

  


    return (
        <>
            <section className="product-detail py-5">
                <div className="container">
                    <div className="row">
                        {cards.map((card, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card border-0">
                                    <div className="card-body">
                                        <span className="icon">{card.icon}</span>
                                        <div>
                                            <h5 className="card-title fw-semibold mb-1">{card.title}</h5>
                                            <p className="mb-0 text-muted content">{card.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-8">
                            {/* Car Pricing Section */}
                            <section className="car-price-section">
                                <div className="product-info text-primary d-flex justify-content-between align-items-center">
                                    <div className="title-section">
                                        <div className="title-sm fs-5 fw-semibold lh-sm">
                                            {detail?.data?.specifications?.engine}
                                        </div>
                                        <div className="main-title fs-1 fw-bold">{`${detail?.data?.year}  ${detail?.data?.make} ${detail?.data?.model}`}</div>
                                    </div>
                                    <div className="price-field">Rs {detail?.data?.price}</div>
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
                                    {carSummaryItems
                                        .reduce((acc, item, index) => {
                                            const colIndex = Math.floor(index / 4);
                                            if (!acc[colIndex]) acc[colIndex] = [];
                                            acc[colIndex].push(item);
                                            return acc;
                                        }, [])
                                        .map((columnItems, columnIndex) => (
                                            <div className="col-md-4" key={columnIndex}>
                                                <ul className="list-unstyled">{renderSummaryItems(columnItems)}</ul>
                                            </div>
                                        ))}
                                </div>
                            </section>
                            {/* Summary Section */}

                            {/* Featured Section */}
                            <section className="featured-section">
                                <h4 className="section-title fw-semibold mb-4">Feature</h4>
                                <ul className="list-unstyled list-inline">
                                    {detail?.data?.features?.map((feature) => {
                                        return (
                                            <li className="list-inline-item">
                                                <span className="icon text-primary me-2 fs-6">
                                                    <FaCheckCircle />
                                                </span>
                                                {feature}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                            {/* Featured Section */}

                            {/* Seller Section */}
                            <section className="seller-section">
                                <h4 className="section-title fw-semibold mb-4">
                                    Sellers Notes
                                </h4>
                                <p>
                                    {detail?.data?.sellerNotes}
                                </p>
                                <Calculator />
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
                             



                             <SocialCards detail={detail}/>
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

                                        <SocialContact  detail={detail}/>



                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <MessageToDealer />
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
