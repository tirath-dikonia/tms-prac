import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  School,
  ChevronLeft,
} from "@mui/icons-material";
import Link from "next/link";
import CustomCollapse from "./sidebar/CustomCollapse";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// function GetCollapseList(){

// }
// class GetCollapseList {
//   constructor(main, ){

//   }
// }
export default function Sidebar({ collapsed, setOpen, open, isSmallScreen }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Drawer variant={isSmallScreen ? "temporary" : "permanent"} open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItem
          button
          component={Link}
          href="/"
          selected={selectedItem === "dashboard"}
          onClick={() => handleItemClick("dashboard")}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{ display: collapsed ? "none" : "block" }}
          />
        </ListItem>
        <CustomCollapse
          collapsed={collapsed}
          listItems={{
            main: "Admin",
            items: [
              { label: "Users", href: "/admin/users", identifier: "users" },
              { label: "Roles", href: "/admin/roles", identifier: "roles" },
            ],
          }}
        />
        <CustomCollapse
          collapsed={collapsed}
          listItems={{
            main: "Management",
            items: [
              {
                label: "Sheets",
                href: "/management/sheets",
                identifier: "sheets",
              },
              {
                label: "Projects",
                href: "/management/projects",
                identifier: "projects",
              },
              {
                label: "Tasks",
                href: "/management/tasks",
                identifier: "tasks",
              },
            ],
          }}
        />
      </List>
    </Drawer>
  );
}
