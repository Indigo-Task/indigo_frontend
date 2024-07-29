import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Link } from "react-router-dom";
import Subscribe from "./Subscribe";
const Navbar = () => {
  return (
    <AppBar position="static" style={{ height: '70px', backgroundColor: 'white', display: 'flex' ,alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Toolbar style={{ gap: "30px" }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "10px",
          }}
        >
          <FlightTakeoffIcon style={{ height: "50px", width: "50px", color: '#004098' }} />
          <Link to = "/">
          <Typography fontSize={30} color={"#004098"}>GoStats</Typography>
          </Link>
        </Box>
        <Box>
          <Link to="/search">
            <Typography color={"#004098"}>Check Status</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
