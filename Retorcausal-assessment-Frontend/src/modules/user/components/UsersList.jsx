import React, { useEffect, useState, useRef, useMemo } from 'react';
import { getUsersAction , deleteUserAction } from '../apiCall/UserAction';
import { useTable, usePagination, useFilters } from 'react-table';
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from '@mui/material';

const TableListing = () => {
    const defaultColumn = useMemo(
        () => ({
          Filter: 'name',
        }),
        []
      );
    
      const columns = useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name',
            defaultCanFilter: false,
          },
          {
            Header: 'Email',
            accessor: 'email',
            defaultCanFilter: false,
          },
          {
            Header: 'Country',
            accessor: 'country',
            defaultCanFilter: false,
          },
          {
            Header: 'State',
            accessor: 'state',
            defaultCanFilter: false,
          },
          {
            Header: 'City',
            accessor: 'city',
            defaultCanFilter: false,
          },
        ],
        []
      );
    
      const [data, setData] = useState([]);
      const [searchInput, setSearchInput] = useState('');
      const currentTablePage = useRef(1);
      const [totalPages, setTotalPages] = useState(1);
      const [totalData, setTotalData] = useState(0);
    
      const getUsersList = async () => {
        const queryParams = new URLSearchParams({
          search: searchInput,
          page: currentTablePage.current,
          limit: 10,
          orderby: 'name',
        });
    
        const response = await getUsersAction(queryParams);
        const { items, totalPages, currentPage, totalItems } = response;
        setData(items);
        currentTablePage.current = currentPage;
        setTotalPages(totalPages);
        setTotalData(totalItems);
      };
    
      useEffect(() => {
        getUsersList();
      }, [searchInput]);
    
      const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
      };
    
      const deleteUser = async (userId) => {
        const response = await deleteUserAction(userId);
        if (response === 'success') {
          getUsersList();
        }
      };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      defaultColumn,
    },
    useFilters,
    usePagination
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Paper style={{ padding: '2rem', margin: '2rem' }}>
        <div>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search by name"
          />
        </div>
        <Table
          {...getTableProps()}
          sx={{
            width: '100%',
            margin: '5rem',
          }}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const userId = row.original._id;
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteUser(userId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '1rem',
          }}
        >
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>
        </div>
      </Paper>
    </Grid>
  );
};

export default TableListing;
