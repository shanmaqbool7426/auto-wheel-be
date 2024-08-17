import React from 'react'
import { Pagination } from '@mantine/core'

export const ListingHeader = () => {
    return (
        <Pagination
            total={Math.ceil(pagination.count / pagination.limit)}
            page={pagination.page}
            onChange={handlePaginationChange}
            siblings={1}
            size="md"
            color="#E90808"
        />
    )
}