import React, { useState } from "react";
import Link from "next/link";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Box,
    IconButton,
    Divider,
    useMediaQuery,
    useTheme,
    Typography,
} from "@mui/material";
import {
    ExpandLess,
    ExpandMore,
    Dashboard,
    School,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

function Sidebar({ isOpen, handleDrawerToggle }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [openTeacher, setOpenTeacher] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const handleTeacherClick = () => {
        setOpenTeacher(!openTeacher);
    };

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Drawer
            variant={isSmallScreen ? "temporary" : "persistent"}
            open={isOpen}
            onClose={handleDrawerToggle}
            sx={{
                width: collapsed ? 60 : 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: collapsed ? 60 : 240,
                    boxSizing: "border-box",
                    transition: "width 0.3s",
                },
            }}
        >
            <Box
                sx={{
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ m: 2, display: collapsed ? "none" : "block" }}
                >
                    Presence Admin Panel
                </Typography>
                <List>
                    <ListItem button component={Link} href="/">
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                            sx={{ display: collapsed ? "none" : "block" }}
                        />
                    </ListItem>
                    <ListItem button onClick={handleTeacherClick}>
                        <ListItemIcon>
                            <School />
                        </ListItemIcon>
                        <ListItemText
                            primary="Teacher"
                            sx={{ display: collapsed ? "none" : "block" }}
                        />
                        {openTeacher ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openTeacher} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem
                                button
                                component={Link}
                                href="/teacher/attendance"
                                sx={{ pl: 4 }}
                            >
                                <ListItemText
                                    primary="Take Attendance"
                                    sx={{
                                        display: collapsed ? "none" : "block",
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <Divider sx={{ flexGrow: 1 }} />
                <IconButton onClick={handleCollapseToggle} sx={{ m: 2 }}>
                    {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
