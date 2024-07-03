import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import { ExpandLess, ExpandMore, School } from "@mui/icons-material";
import Link from "next/link";

export default function CustomCollapse({ collapsed, listItems }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const [openTeacher, setOpenTeacher] = useState(false);
  const handleTeacherClick = () => {
    setOpenTeacher(!openTeacher);
    setSelectedItem(null); // Reset selected item when collapsing/expanding
  };

  return (
    <>
      <ListItem button onClick={handleTeacherClick}>
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText
          primary={listItems.main}
          sx={{ display: collapsed ? "none" : "block" }}
        />
        {openTeacher ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openTeacher} timeout="auto" unmountOnExit>
        {listItems.items.map((currentItem, key) => (
          <List component="div" disablePadding key={key}>
            <ListItem
              button
              component={Link}
              href={currentItem.href}
              selected={selectedItem === currentItem.identifier}
              onClick={() => handleItemClick(currentItem.identifier)}
              sx={{ pl: 4 }}
            >
              <ListItemText
                primary={currentItem.label}
                sx={{ display: collapsed ? "none" : "block" }}
              />
            </ListItem>
          </List>
        ))}
      </Collapse>
    </>
  );
}
