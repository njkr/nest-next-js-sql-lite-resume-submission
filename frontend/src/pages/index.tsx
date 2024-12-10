import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getResume } from '../redux/dashboardReducerSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, Button } from '@mui/material';
import { Paper } from '@mui/material';
import Link from 'next/link';
import { debounce } from 'lodash';

export default function Home() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.dashboard);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const debouncedDispatch = debounce(() => {
    dispatch(getResume({ page, limit: rowsPerPage }));
  }, 200);

  useEffect(() => {
    debouncedDispatch();
    return debouncedDispatch.cancel;
  }, [page, rowsPerPage]);

  return (
    <div className='pr-10 pl-10'>
      <div className="my-10">
        <Button
          variant="outlined"
          color="secondary"
          className=" float-right"
        >
          <Link href="/submit_resume" className="text-secondary">
            submit resume
          </Link>
        </Button>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }} >
        <TableContainer>
          <Table aria-label="user data table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Preferred Location</TableCell>
                <TableCell>Programming Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((values, index) => (
                <TableRow key={values.id}>
                  <TableCell>{values.id}</TableCell>
                  <TableCell>{values.fullName}</TableCell>
                  <TableCell>{values.dateOfBirth}</TableCell>
                  <TableCell>{values.preferredLocation}</TableCell>
                  <TableCell>
                    {values.programmingSkills.map((skill: string, idx: number) => (
                      <Chip key={skill} label={skill} sx={{ marginRight: 1 }} />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={1000}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper></div>
  );
}
