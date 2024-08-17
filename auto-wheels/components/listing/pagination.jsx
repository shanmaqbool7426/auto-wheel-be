"use client"
import React, { useState, useEffect } from 'react';
import { Pagination } from '@mantine/core';
import { useRouter, useParams } from 'next/navigation';

export const ListingPagination = ({ data }) => {
    const router = useRouter();
    const { slug } = useParams();

    const pathSegments = slug ? [...slug] : [];
    const pageSegmentIndex = pathSegments.findIndex(segment => segment.startsWith('page_'));
    const currentPage = pageSegmentIndex > -1 ? parseInt(pathSegments[pageSegmentIndex].replace('page_', ''), 10) : 1;

    const [pagination, setPagination] = useState({
        page: currentPage,
        limit: 10,
    });

    const handlePageChange = (val) => {
        setPagination((prev) => ({
            ...prev,
            page: val,
        }));

        updatePaginationInUrl(val);
    };

    const updatePaginationInUrl = (newPage) => {
        let updatedPathSegments = [...pathSegments];

        if (pageSegmentIndex > -1) {
            updatedPathSegments[pageSegmentIndex] = `page_${newPage}`;
        } else {
            updatedPathSegments.push(`page_${newPage}`);
        }

        const updatedPath = updatedPathSegments.join('/');
        console.log('updatedPath', updatedPath);

        router.push(`/listing/${updatedPath}`, { scroll: false });
    };

    useEffect(() => {
        if (pageSegmentIndex > -1 && parseInt(pathSegments[pageSegmentIndex].replace('page_', ''), 10) !== pagination.page) {
            setPagination((prev) => ({
                ...prev,
                page: parseInt(pathSegments[pageSegmentIndex].replace('page_', ''), 10),
            }));
        } else if (pageSegmentIndex === -1) {
            updatePaginationInUrl(1);
        }
    }, []);

    return (
        <Pagination
            total={Math.ceil(data?.count / pagination?.limit)}
            page={pagination?.page}
            onChange={handlePageChange}
            siblings={1}
            size="md"
            color="#E90808"
        />
    );
};
