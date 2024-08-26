"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from '@mantine/core';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

const BlogPagination = ({ count }) => {
    const router = useRouter();
    const { slug } = useParams();
    const searchParams = useSearchParams();

    const pathSegments = slug ? [...slug] : [];
    const pageSegmentIndex = pathSegments.findIndex(segment => segment === 'page');
    const currentPage = pageSegmentIndex > -1 && pathSegments[pageSegmentIndex + 1] ? parseInt(pathSegments[pageSegmentIndex + 1], 10) : 1;

    const [pagination, setPagination] = useState({
        page: currentPage,
        limit: 10,
    });

    const updatePaginationInUrl = useCallback((newPage) => {
        let updatedPathSegments = [...pathSegments];

        if (pageSegmentIndex > -1) {
            updatedPathSegments[pageSegmentIndex + 1] = newPage.toString();
        } else {
            updatedPathSegments.push('page', newPage.toString());
        }

        const updatedPath = updatedPathSegments.join('/');

        const queryString = searchParams.toString();
        const finalUrl = queryString ? `/blog/${updatedPath}?${queryString}` : `/blog/${updatedPath}`;

        router.push(finalUrl, { scroll: false });
    }, [pathSegments, pageSegmentIndex, searchParams, router]);

    const handlePageChange = useCallback((val) => {
        setPagination((prev) => ({
            ...prev,
            page: val,
        }));

        updatePaginationInUrl(val);
    }, [updatePaginationInUrl]);

    useEffect(() => {
        if (pageSegmentIndex > -1 && parseInt(pathSegments[pageSegmentIndex + 1], 10) !== pagination.page) {
            setPagination((prev) => ({
                ...prev,
                page: parseInt(pathSegments[pageSegmentIndex + 1], 10),
            }));
        }
    }, []);

    return (
        <>
            <Pagination
                total={Math.ceil(count / pagination?.limit)}
                value={pagination?.page}
                onChange={handlePageChange}
                siblings={1}
                size="md"
                color="#E90808"
            />
        </>
    );
};

export default React.memo(BlogPagination);
