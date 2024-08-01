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
import AddProject from "@/components/management/projects/AddProject";
import UpdateProject from "@/components/management/projects/UpdateProject";
import { BASE_URL } from "@/config";
import { format, parseISO } from "date-fns";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", "some val", "some val", "some val", "some val"),
  createData(
    "Ice cream sandwich",
    "some val",
    "some val",
    "some val",
    "some val"
  ),
  createData("Eclair", "some val", "some val", "some val", "some val"),
  createData("Cupcake", "some val", "some val", "some val", "some val"),
  createData("Gingerbread", "some val", "some val", "some val", "some val"),
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

export default function ProjectPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddItemModal, setIsAddItemModal] = useState(false);
  const [isUpdateScreen, setIsUpdateScreen] = useState(false);
   const [allListItems, setAllListItems] = useState([]);
  const [allListCount, setAllUsersCount] = useState(0);
  const [listDataGot, setListData] = useState();
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
    setIsAddItemModal(true);
  };
  const handleUpdateUserOpen = () => {
    setIsUpdateScreen(true);
  };


  useEffect(()=> {
    if(!listDataGot) return; 
    setPage(listDataGot.data.page_number-1)
    setRowsPerPage(listDataGot.data.per_page)
   setAllListItems( listDataGot.data.items)
   setAllUsersCount(listDataGot.data.total_items)
  }, [listDataGot])

  useEffect(()=> {
    async function getAllItemsList (){
      try{
        const gotResponse = await fetch(BASE_URL + "/admin/project/list?" + new URLSearchParams({
          search_term: "",
          sort_field:"createdAt",
          sort_order:"desc",
          per_page:rowsPerPage,
          page_number:page+1,
      }).toString())
      const dataGot = await gotResponse.json();
     
      // console.log(">>> users data got : ", dataGot)
      if(dataGot.success){
        setListData(dataGot);
      }
      }catch(err){
        console.log(">>>error items data : ", err)
      }
    }
    getAllItemsList();
  }, [rowsPerPage, page])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <UpdateProject open={isUpdateScreen} setOpen={setIsUpdateScreen} />
        {/* Left side: Search bar */}
        <Box flexGrow={1}>
          <TextField
            label="Search projects..."
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "white" }}
            // Add any necessary props for handling search functionality
          />
        </Box>

        {/* Right side: Add User button */}
        <Box ml={2}>
          {isAddItemModal && <AddProject open={isAddItemModal} setOpen={setIsAddItemModal} />}
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Project
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
              <StyledTableCell>Sr.No</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Desc</StyledTableCell>
                <StyledTableCell>Time Allocated</StyledTableCell>
                <StyledTableCell>Time Consumed</StyledTableCell>
                <StyledTableCell>Started From</StyledTableCell>
                <StyledTableCell>Deadline</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
            {allListItems && allListItems.map((row, i) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {i+(page* rowsPerPage)+1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.desc}</StyledTableCell>
                  <StyledTableCell>{row.hours_allocated}</StyledTableCell>
                  <StyledTableCell>{row.time_spent}</StyledTableCell>
                  <StyledTableCell>{format(parseISO(row.start_date), "dd MMM, yy")}</StyledTableCell>
                  <StyledTableCell>{format(parseISO(row.deadline), "dd MMM, yy")}</StyledTableCell>
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
                  colSpan={8}
                  count={rows.length}
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
