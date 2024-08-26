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
  TableFooter,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  CustomTablePagination,
  StyledTableCell,
  StyledTableRow,
} from "@/components/table-theme/TableTheme";
import { Fragment, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { AssignmentTurnedIn } from "@mui/icons-material";
import { BASE_URL } from "@/config";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

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

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

export default function AssignUser({ open, setOpen }) {
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allUsersList, setAllUsersList] = useState([]);
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [userData, setUserData] = useState();
  const handleClose = () => {
    setOpen(prev => ({assignUser: !prev.assignUser, projectId: null}));
  };
  const handleSubmit = (values) => {
    console.log(values); // Handle submit logic here
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(()=> {
    if(!userData) return; 
    setPage(userData.data.page_number-1)
    setRowsPerPage(userData.data.per_page)
   setAllUsersList( userData.data.users)
   setAllUsersCount(userData.data.total_users)
  }, [userData])
  useEffect(()=> {
    async function getAllUsersList (){
      try{
        const gotResponse = await fetch(BASE_URL + "/admin/user/get-user-list?" + new URLSearchParams({
          search_term: "",
          sort_field:"createdAt",
          sort_order:"desc",
          per_page:rowsPerPage,
          page_number:page+1,
      }).toString())
      const dataGot = await gotResponse.json();
     
      // console.log(">>> users data got : ", dataGot)
      if(dataGot.success){
        setUserData(dataGot);
      }
      }catch(err){
        console.log(">>>error users data : ", err)
      }
    }
    getAllUsersList();
  }, [rowsPerPage, page])
  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open.assignUser}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Assign User
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        {/* Left side: Search bar */}
        <Box flexGrow={1}>
          <TextField
            label="Search users..."
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white" }}
            // Add any necessary props for handling search functionality
          />
        </Box>
      </Box>
      <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
            {allUsersList.map((row) => (
                <StyledTableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>
                    
                    <IconButton aria-label="add permissions to user"  >
                      <AssignmentTurnedIn color="primary" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <StyledTableRow>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={allUsersCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </StyledTableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
        </DialogContent>
       
      </BootstrapDialog>
    </Fragment>
  );
}
