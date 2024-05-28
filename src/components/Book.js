import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

export default function Book() {
    const [books, setBooks] = useState([])
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOrder,setSortOrder] = useState('asc')
    const [sortBy,setSortBy] = useState('')
    const [name, setName] = useState('')

    const handleOnChangePageSize = (e) => {
        setPageSize(e.target.value)
        setCurrentPage(1)
    }

    const handleOnSearch = (value) => {
        setName(value)
        setCurrentPage(1)
    }

    const handleOnChangeSortOrder = (key,order) => {
        console.log("sort");
        setSortBy(key)
        setSortOrder(order)
    }
    useEffect(() => {
        var baseUrl = 'https://localhost:7054/api/Books'
        const queryParams = [];
        if (currentPage !== 1) {
            queryParams.push(`page=${encodeURIComponent(currentPage)}`);
        }
        if (pageSize !== 5) {
            queryParams.push(`pageSize=${encodeURIComponent(pageSize)}`);
        }
        if (name) {
            queryParams.push(`name=${encodeURIComponent(name)}`);
        }
        if (sortOrder === 'desc') {
            queryParams.push(`sortOrder=${encodeURIComponent(sortOrder)}`);
        }
        if (sortBy) {
            queryParams.push(`sortBy=${encodeURIComponent(sortBy)}`);
        }
        const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
        const finalUrl = baseUrl + queryString;
        fetch(finalUrl)
            .then(response => response.json())
            .then(data => { setBooks(data.body); return data })
            .then(data => setTotalItem(data.total))
    }, [pageSize, currentPage, name,sortBy,sortOrder])


    return (
        <div className='p-4'>
            <div className="d-flex">
                <div className="me-auto">
                    <div>
                        <select name="example_length" aria-controls="example" id="dt-length-0" onChange={(e) => handleOnChangePageSize(e)}>
                            <option selected={pageSize === 5} value="5">5</option>
                            <option selected={pageSize === 10} value="10">10</option>
                            <option selected={pageSize === 15} value="15">15</option>
                            <option selected={pageSize === 20} value="20">20</option>
                        </select>
                        <label htmlFor="dt-length-0"> entries per page</label>
                    </div>
                </div>
                <div className="dt-layout-cell dt-end ">
                    <div className="dt-search">
                        <label htmlFor="dt-search-0">Search:</label>
                        <input onChange={(e) => handleOnSearch(e.target.value)} type="search" className="dt-input" id="dt-search-0" placeholder="" aria-controls="example" />
                    </div>
                </div>
            </div>
            <Table responsive>
                <thead>
                    <tr>
                        {books.length !== 0 && Object.keys(books[0]).map(key =>
                            <>
                                <th key={key}>{key}
                                    <span>
                                        <i onClick={() => handleOnChangeSortOrder(key, "asc")} className="ti ti-arrow-up"></i>
                                        <i onClick={() => handleOnChangeSortOrder(key, "desc")} className="ti ti-arrow-down"></i>
                                    </span>
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.description}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-flex'>
                <div className='me-auto'>Showing {(currentPage - 1) * pageSize + 1} to {totalItem < pageSize * currentPage ? totalItem : pageSize * currentPage} of {totalItem} entries</div>

                <Pagination className='text-right'>
                    <Pagination.First onClick={() => setCurrentPage(1)} />
                    <Pagination.Prev disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {
                        Array.from({ length: Math.ceil(totalItem / pageSize) }).map((it, index) => <Pagination.Item key={index} onClick={(e) => { setCurrentPage(e.target.text) }} active={currentPage == index + 1}>{index + 1}</Pagination.Item>)
                    }
                    <Pagination.Next disabled={currentPage === Math.ceil(totalItem / pageSize)} onClick={() => setCurrentPage(currentPage + 1)} />
                    <Pagination.Last onClick={() => setCurrentPage(Math.ceil(totalItem / pageSize))} />
                </Pagination>
            </div>
        </div>
    )
}