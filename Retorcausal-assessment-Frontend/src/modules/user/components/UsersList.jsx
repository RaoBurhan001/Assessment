import  { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersAction, deleteUserAction } from '../apiCall/UserAction';
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
  const navigate = useNavigate();

  // Define default column settings
  const defaultColumn = useMemo(
    () => ({
      Filter: 'name', // Default column for filtering
    }),
    []
  );

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        defaultCanFilter: false, // Disable filtering for this column
      },
      {
        Header: 'Email',
        accessor: 'email',
        defaultCanFilter: false,
      },
      {
        Header: 'Country',
        accessor: 'country_id.name',
        defaultCanFilter: false,
      },
      {
        Header: 'State',
        accessor: 'state_id.name',
        defaultCanFilter: false,
      },
      {
        Header: 'City',
        accessor: 'city_id.name',
        defaultCanFilter: false,
      },
    ],
    []
  );

  // State to store table data
  const [data, setData] = useState([]);

  // State for search input
  const [searchInput, setSearchInput] = useState('');

  // State for current table page
  const currentTablePage = useRef(1);

  // State for total pages and total data
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  // Fetch user data from the API
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

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle user deletion
  const deleteUserHandler = async (userId) => {
    const response = await deleteUserAction(userId);
    if (response === 'success') {
      getUsersList();
    }
  };

  // Handle user editing
  const editUserHandler = async (userId) => {
    navigate(`/getuser/${userId}`);
  };

  // React-table hooks and configurations
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
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial page and page size
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
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => editUserHandler(userId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteUserHandler(userId)}
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
