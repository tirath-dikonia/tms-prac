'use client';
// pages/add-report-page.js

import React, { useState } from 'react';
import {
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  MenuItem,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
  
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
      <form onSubmit={handleSubmit} style={{backgroundColor: 'white', padding: "2rem"}}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} sm={1}>
            <TextField
              select
              label="Number of hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              fullWidth
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={1}>
            <TextField
              select
              label="Minutes selected"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              required
              fullWidth
            >
              {[10, 20, 30, 40, 50, 60].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2} container direction="column" spacing={1}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" fullWidth>
                Send Mail
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

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
