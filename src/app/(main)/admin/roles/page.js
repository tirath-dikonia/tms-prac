"use client";
import { Box, Button, TableFooter, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import PropTypes from "prop-types";
import AddRole from "@/components/admin/role/AddRole";
import {
  CustomTablePagination,
  StyledTableCell,
  StyledTableRow,
} from "@/components/table-theme/TableTheme";
import { AddCircle } from "@mui/icons-material";
import AddPermissions from "@/components/admin/role/AddPermissions";
import { BASE_URL } from "@/config";
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

export default function RolePage() {
  const [isAddRole, setIsAddRole] = useState(false);
  const [isAddPermissions, setIsAddPermissions] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allRoleList, setAllRolesList] = useState([]);
  const [allRoleCount, setAllRoleCount] = useState(0);
  const [roleData, setRoleData] = useState();
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = () => {
    setIsAddRole(true);
  };
  const handlePermissionOpen = () => {
    setIsAddPermissions(true);
  };
  const getAllRoles = useCallback(()=> {
    async function getAllRolesList (){
      try{
        const gotResponse = await fetch(BASE_URL + "/admin/role/get-role-list?" + new URLSearchParams({
          search_term: "",
          sort_field:"createdAt",
          sort_order:"desc",
          per_page:rowsPerPage,
          page_number:page+1,
      }).toString())
      const dataGot = await gotResponse.json();
     
      // console.log(">>> users data got : ", dataGot)
      if(dataGot.success){
        setRoleData(dataGot);
      }
      }catch(err){
        console.log(">>>error users data : ", err)
      }
    }
    getAllRolesList();
  },[page, rowsPerPage])
  useEffect(() => {
    if(isAddRole) return;
    getAllRoles();
  }, [isAddRole])
  useEffect(()=> {
    if(!roleData) return; 
    setPage(roleData.data.page_number-1)
    setRowsPerPage(roleData.data.per_page)
   setAllRolesList( roleData.data.roles)
   setAllRoleCount(roleData.data.total_roles)
  }, [roleData])
  useEffect(getAllRoles, [rowsPerPage, page])
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <AddPermissions open={isAddPermissions} setOpen={setIsAddPermissions}/>
        {/* Left side: Search bar */}
        <Box flexGrow={1}>
          <TextField
            label="Search roles..."
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white" }}
            // Add any necessary props for handling search functionality
          />
        </Box>

        {/* Right side: Add User button */}
        <Box ml={2}>
          {isAddRole && <AddRole open={isAddRole} setOpen={setIsAddRole} />}
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Role
          </Button>
        </Box>
      </Box>
      <Box mx="auto" maxWidth="calc(100% - 50rem)" overflow="auto">
        {/* mx="auto" centers the table horizontally */}
        {/* maxWidth="calc(100% - 6rem)" ensures there's margin of 3rem on both sides */}
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 20 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Add Permissions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {allRoleList.map((row) => (
                <StyledTableRow
                  key={row.role}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.role}
                  </StyledTableCell>
                  <StyledTableCell>
                    
                    <IconButton color="secondary" aria-label="add an alarm" onClick={handlePermissionOpen}>
                      <AddCircle/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>

            <TableFooter>
              <StyledTableRow>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={allRoleCount}
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
