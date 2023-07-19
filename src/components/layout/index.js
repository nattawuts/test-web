import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSubExam, setCurrentSubExam] = useState(0);
  const [currentExam, setCurrentExam] = useState(1);
  const rounter = useRouter();

  return (
    <Box sx={{ flexFlow: 1 }}>
      <AppBar position="static">
        <Toolbar className="justify-center">
          <span>แบบทดสอบ</span>
        </Toolbar>
      </AppBar>

      <div className="flex min-h-screen">
        <div className="w-[240px]">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            className="bg-blue-300 h-full"
            component="nav"
          >
            <ListItemButton
              className={`${currentExam == 1 ? "bg-blue-500" : ""}`}
              onClick={() => {
                setCurrentExam(1);
                setCurrentSubExam(0);
                rounter.push("/example1");
              }}
            >
              <ListItemText primary="ข้อที่ 1" />
            </ListItemButton>
            <ListItemButton
              className={`${currentExam == 2 ? "bg-blue-500" : ""}`}
              onClick={() => {
                setCurrentExam(2);
                setMenuOpen(!menuOpen);
              }}
            >
              <ListItemText primary="ข้อที่ 2" />
              {menuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  className={`${currentSubExam == 1 ? "bg-blue-400" : ""}`}
                  onClick={() => {
                    setCurrentSubExam(1);
                    rounter.push("/example2/2-1");
                  }}
                >
                  <ListItemText primary="2.1" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  className={`${currentSubExam == 2 ? "bg-blue-400" : ""}`}
                  onClick={() => {
                    setCurrentSubExam(2);
                    rounter.push("/example2/2-2");
                  }}
                >
                  <ListItemText primary="2.2" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  className={`${currentSubExam == 3 ? "bg-blue-400" : ""}`}
                  onClick={() => {
                    setCurrentSubExam(3);
                    rounter.push("/example2/2-3");
                  }}
                >
                  <ListItemText primary="2.3" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </div>
        <main className="w-full">{children}</main>
      </div>
    </Box>
  );
};

export default Layout;
