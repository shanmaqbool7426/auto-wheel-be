
"use client"
import React, { useState, useEffect } from 'react';
import { Pagination } from '@mantine/core';
import { useRouter,useParams } from 'next/navigation';

export const ListingPagination = ({ data }) => {
    const router = useRouter();
    const { slug } = useParams();

    const pathSegments = slug || [];
    const pageSegment = pathSegments.find(segment => segment.startsWith('page_'));
    const currentPage = pageSegment ? parseInt(pageSegment.replace('page_', ''), 10) : 1;

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

        if (pageSegment) {
            updatedPathSegments = updatedPathSegments.map(segment =>
                segment.startsWith('page_') ? `page_${newPage}` : segment
            );
        } else {
            updatedPathSegments.push(`page_${newPage}`);
        }
        const updatedPath = updatedPathSegments.join('/');
        router.push(`listing/${updatedPath}`, { scroll: false });
    };

    useEffect(() => {
        if (pageSegment && parseInt(pageSegment.replace('page_', ''), 10) !== pagination.page) {
            setPagination((prev) => ({
                ...prev,
                page: parseInt(pageSegment.replace('page_', ''), 10),
            }));
        } else if (!pageSegment) {
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




