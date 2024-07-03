import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import {
  CustomTablePagination,
  StyledTableCell,
  StyledTableRow,
} from "@/components/table-theme/TableTheme";

function createData(name, calories) {
    return { name, calories };
  }
  
  const rows = [
    createData("Admin", 159),
    createData("Management", 237),
    createData("Employee", 262),
    createData("Super Admin", 305),
    createData("Project Coordinator", 356),
  ];
  


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddPermissions({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values) => {
    console.log(values); // Handle submit logic here
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Update Permissions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Grid container justifyContent="center">
      <Grid item xs={12}>
      <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Permissions</StyledTableCell>
                <StyledTableCell>Select</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>
                  <Checkbox size="small" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
        <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
      </Grid>
    </Grid>
        </DialogContent>
       
      </BootstrapDialog>
    </React.Fragment>
  );
}
