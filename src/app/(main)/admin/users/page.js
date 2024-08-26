"use client";
import {
  Box,
  Button,
  TableCell,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import AddUser from "@/components/admin/user/AddUser";
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from "prop-types";
import {
  CustomTablePagination,
  StyledTableCell,
  StyledTableFooter,
  StyledTableRow,
} from "@/components/table-theme/TableTheme";
import UpdateUser from "@/components/admin/user/UpdateUser";
import { BASE_URL } from "@/config";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddUser, setIsAddUser] = useState(false);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [allUsersList, setAllUsersList] = useState([]);
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [userData, setUserData] = useState();
  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = () => {
    setIsAddUser(true);
  };
  const handleUpdateUserOpen = () => {
    setIsUpdateUser(true);
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
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <UpdateUser open={isUpdateUser} setOpen={setIsUpdateUser} />
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

        {/* Right side: Add User button */}
        <Box ml={2}>
          {isAddUser && <AddUser open={isAddUser} setOpen={setIsAddUser} />}
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add User
          </Button>
        </Box>
      </Box>
      <Box mx="auto" maxWidth="calc(100% - 6rem)" overflow="auto">
        {/* mx="auto" centers the table horizontally */}
        {/* maxWidth="calc(100% - 6rem)" ensures there's margin of 3rem on both sides */}
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 20 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>User Type</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
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
                  <StyledTableCell>{row.user_type}</StyledTableCell>
                  <StyledTableCell>{row?.role?.role}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell>
                    
                    <IconButton aria-label="add permissions to user" onClick={handleUpdateUserOpen} >
                      <EditIcon  color="primary" />
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
      </Box>
    </>
  );
}
