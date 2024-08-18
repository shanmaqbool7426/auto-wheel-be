'use client'
import React from 'react'

import {
    DocumentSquareIcon,
    MeterSquareIcon,
    RatingIcon,
    ShareSquareIcon,
    SteeringIcon,
} from "@/components/Icons";
import { useClipboard } from '@mantine/hooks';

const SharedFeatures = () => {
    
    return (
        <ul className="list-unstyled list-inline m-0">
            <li className="list-inline-item"   onClick={() => clipboard.copy(window.location.href)}
            >
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
    )
}

export default SharedFeatures