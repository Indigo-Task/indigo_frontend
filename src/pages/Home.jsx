import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Subscribe from "../components/Subscribe";
import { toast } from "react-toastify";
import axios from "axios";
const Home = () => {
  const themes = useTheme();
  const [flightId, setFlightId] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [airports, setAirports] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAirportData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_SERVER}info/airports`
        );
        setAirports(data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    getAirportData();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();

    navigate("/search", { state: { flightId, from, to, date } });
  };
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {/* <Navbar /> */}
      <Grid container>
        <Grid item xs={0} md={0} lg={1}></Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={10}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexDirection: "column",
            minHeight: "calc(100vh - 270px)",
          }}
        >
          <Box position="relative">
            <img
              src="./flight.jpeg"
              width={"100%"}
              style={{ filter: "brightness(80%)" }}
            />
            <Box
              position={"absolute"}
              width="100%"
              top={"50%"}
              left={"50%"}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography fontSize={40} color="white">
                Track Your Flights With GoStats
              </Typography>
              <Typography fontSize={"20"} color="white">
                Receive instant updates on flight status
              </Typography>
            </Box>
          </Box>
          <Box
            minWidth={"600px"}
            width={"70%"}
            style={{
              borderRadius: 100,
              padding: "20px 50px 20px 50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              backgroundColor: "white",
              boxShadow: "0px 1px 4px 2px lightgray",
            }}
          >

            <FormControl>
              <InputLabel htmlFor="flight-number">Flight Number</InputLabel>
              <Input
                variant="standard"
                id="flight-number"
                label="Flight Number"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                startAdornment={<Typography>6E-</Typography>}
                placeholder="Flight Number"
                sx={{ width: "80%", fontSize: "16px", background: "inherit" }}
              />
            </FormControl>
            {/* <FormControl > */}
              {/* <InputLabel htmlFor="flight-from">From</InputLabel> */}
              <Autocomplete
                disablePortal
                id="combo-box-from"
                options={airports}
                sx={{ fontSize: '16px' ,mr: '2vw', background: "white", "& .MuiAutocomplete-input ": { width: '8vw !important' } }}
                getOptionLabel={(option) => option.Location}
                autoHighlight
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { flexShrink: 0 } }}
                    {...props}
                    id={option.Rank}
                  >
                    {option.Location}, {option.Airport}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    label="From"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
                onChange={(e, value) => setFrom(value?.Code)}
              />
              {/* </FormControl> */}
              <Autocomplete
                disablePortal
                id="combo-box-to"
                options={airports}
                sx={{ mr: '2vw', "& .MuiAutocomplete-input ": { width: '8vw !important' } }}
                getOptionLabel={(option) => option.Location}
                autoHighlight
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { flexShrink: 0 } }}
                    {...props}
                    id={option.Rank}
                  >
                    {option.Location}, {option.Airport}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="To"
                    inputProps={{
                        
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
                onChange={(e, value) => setTo(value?.Code)}
              />
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  slotProps={{ textField: { variant: "standard" } }}
                  id="flight-date"
                  // defaultValue={dayjs(new Date())}
                  onAccept={(e) => setDate(new Date(e).toDateString())}
                  onChange={(e) => setDate(new Date(e).toDateString())}
                  minDate={dayjs(new Date())}
                  maxDate={dayjs(
                    new Date().getTime() + 24 * 60 * 60 * 1000 * 3
                  )}
                  sx={{
                    width: "80%",
                    fontSize: "16px",
                    background: "white",
                    borderRadius: "10px",
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <IconButton
              style={{
                borderRadius: 10,
                background: themes.palette.primary.main,
              }}
              onClick={submit}
            >
              <ArrowForwardIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box
            width="100%"
            alignSelf={"end"}
            sx={{ height: "100px", padding: "15px" }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: "0px 1px 3px 5px lightgray",
                borderRadius: "20px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <Box display={"flex"} alignItems={"center"} gap={5}>
                <NotificationsIcon
                  style={{ height: "40px", width: "40px", color: "#004098" }}
                />
                <Typography>
                  Subscribe to get Real-Time Udpates on flight status changes!
                </Typography>
              </Box>
              <Box>
                <Button
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#004098",
                    color: "white",
                  }}
                  onClick={() => setOpen(true)}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {open && <Subscribe open={open} handleClose={handleClose} />}
    </Box>
  );
};

export default Home;
