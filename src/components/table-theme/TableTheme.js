import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Box, TableFooter } from "@mui/material";

import React from "react";
import TablePagination from "@mui/material/TablePagination";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTableFooter = ({ children }) => {
  return (
    <TableFooter sx={{ justifyContent: "center" }}>
      <StyledTableRow>
        <StyledTableCell colSpan={5}>
          <Box display="flex" justifyContent="center">
            {children}
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    </TableFooter>
  );
};

export const CustomTablePagination = styled(TablePagination)(({ theme }) => ({
  '& .MuiTablePagination-toolbar': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiTablePagination-spacer': {
    flex: 'none',
  },
}));
