'use client';
// pages/add-report-page.js
// pages/add-report-page.js
// pages/add-report-page.js
// pages/add-report-page.js

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
  margin: '20px',
  padding: '20px',
});

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '16px',
});

const TableWrapper = styled(TableContainer)({
  marginTop: '16px',
});

const AddReportPage = () => {
  const [reports, setReports] = useState([
    {
      hours: 2,
      minutes: 30,
      title: 'Bug Fix in Dashboard',
      description: 'Resolved issue with data rendering in the dashboard.',
    },
    {
      hours: 3,
      minutes: 0,
      title: 'Feature Implementation',
      description: 'Implemented new feature for user notifications.',
    },
    {
      hours: 1,
      minutes: 45,
      title: 'Database Optimization',
      description: 'Optimized database queries for improved performance.',
    },
  ]);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReport = {
      hours: hours,
      minutes: minutes,
      title: title,
      description: description,
    };
    setReports([...reports, newReport]);
    // Clear form fields after submission
    setHours('');
    setMinutes('');
    setTitle('');
    setDescription('');
  };

  return (
    <RootContainer>
      {/* Form to add a new report */}
      <FormContainer onSubmit={handleSubmit}>
        <TextField
          label="Number of hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
        <TextField
          label="Minutes selected"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          required
        />
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button variant="contained" color="secondary">
          Send Mail
        </Button>
      </FormContainer>

      {/* Table to display added reports */}
      <TableWrapper component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Number of Hours</TableCell>
              <TableCell>Minutes Selected</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{report.hours}</TableCell>
                <TableCell>{report.minutes}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </RootContainer>
  );
};

export default AddReportPage;
