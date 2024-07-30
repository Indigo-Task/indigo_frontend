import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
  createFilterOptions,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Link, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";
import axios from "axios";
import Subscribe from "../components/Subscribe";
import { toast } from "react-toastify";
const Input = styled(OutlinedInput)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));
const Search = () => {
  const location = useLocation();
  const [flightId, setFlightId] = useState(location.state?.flightId);
  const [from, setFrom] = useState(location.state?.from);
  const [to, setTo] = useState(location.state?.to);
  const [date, setDate] = useState(location.state?.date);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [flight, setFlight] = useState(null);
  const themes = useTheme();
  const [airports, setAirports] = useState(null);
  useEffect(() => {
    const getAirportData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_SERVER}info/airports`);
        setAirports(data.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message)
        setLoading(false);
      }
    }
    search();
    getAirportData();
  }, []);

  const handleChange = (e) => {
    // e.preventDefault();
    setFlightId(e.target.value);
  };


  const search = async () => {
    const flight = flightId && flightId !== "" ? `6E ${flightId}` : null;
    const params = { flightId: flight, scheduledDeparture: date ? data : null, lastData: data ? JSON.stringify(data):null };
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER}flights/`,
        { params }
      );
      setData(data.data)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
  useEffect(() => {
    search()
  }, [data])
  const clear = () => {
    setFlightId("");
    setFrom("");
    setTo("");
    setDate("");
  };

  const handleAlert = (e, flightId) => {
    setOpen(true);
    setFlight(flightId);
  };
  return (
    <Box minHeight={"100vh"} display={"flex"}>
      <Drawer
        variant="permanent"
        sx={{
          // height: "calc(100vh - 320px)",
          //   position: "absolute",
          width: "300px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            position: "relative",
            width: "300px",
            boxSizing: "border-box",
            background: themes.palette.primary.main,
          },
        }}
      >
        {/* <Toolbar style={{ width: "100%" }}>
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Link to="/">
              <Typography fontSize={20} fontWeight={"bold"} color={"white"}>
                FlightTrac
              </Typography>
            </Link>
            <FlightTakeoffIcon
              style={{ height: "20px", width: "20px", color: "white" }}
            />
          </Box>
        </Toolbar> */}
        <Box
          style={{
            height: "60%",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <FormControl fullWidth>
            <Typography
              fontWeight={"bold"}
              marginBottom={"20px"}
              color={"white"}
            >
              Flight Number
            </Typography>
            {/* <InputLabel htmlFor="flight-number">Flight Number</InputLabel> */}
            <Input
              fullWidth
              id="flight-number"
              type="number"
              key="flightNumber"
              //   label="Flight Number"
              startAdornment={<Typography>{`6E-`}</Typography>}
              placeholder="Flight Number"
              sx={{
                fontSize: "16px",
                background: "white",
                borderRadius: "10px",
              }}
              value={flightId}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <Typography fontWeight={"bold"} marginBottom={"20px"} color="white">
              From
            </Typography>
            {/* <InputLabel htmlFor="flight-from">From</InputLabel> */}
            <Autocomplete
              disablePortal
              id="combo-box-from"
              options={airports}
              sx={{ background: 'white', borderRadius: '10px' }}
              getOptionLabel={(option) => option.Location}
              autoHighlight
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  id={option.Rank}
                >
                  {option.Location}, {option.Airport}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
            />)}
            onChange={(e, value) => setFrom(value.Code)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Typography fontWeight={"bold"} marginBottom={"20px"} color="white">
              To
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-to"
              options={airports}
              sx={{ background: 'white', borderRadius: '10px' }}
              getOptionLabel={(option) => option.Location}
              autoHighlight
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  id={option.Rank}
                >
                  {option.Location}, {option.Airport}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
            />)}
            onChange={(e, value) => setTo(value.Code)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Typography fontWeight={"bold"} marginBottom={"20px"} color="white">
              Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <InputLabel htmlFor="flight-date">Date</InputLabel> */}
              <DatePicker
                // label="Date"
                id="flight-date"
                // defaultValue={dayjs(new Date())}
                value={dayjs(date)}
                onAccept={(e) => setDate(new Date(e).toDateString())}
                onChange={(e) => setDate(new Date(e).toDateString())}
                minDate={dayjs(new Date())}
                maxDate={dayjs(new Date().getTime() + 24 * 60 * 60 * 1000 * 3)}
                sx={{
                  fontSize: "16px",
                  background: "white",
                  borderRadius: "10px",
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                borderRadius: "5px",
                color: "white",
              }}
              onClick={(e) => clear()}
            >
              Clear
            </Button>
            <Button
              style={{
                borderRadius: "5px",
                backgroundColor: "white",
                color: "#004098",
              }}
              onClick={(e) => search()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box
        width="calc(100% - 300px)"
        height={"calc(100vh - 200px)"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {/* <Toolbar
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            style={{
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Subscribe
          </Button>
        </Toolbar> */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Box
            width="100%"
            height="100%"
            padding="30px"
            display={"flex"}
            flexDirection={"column"}
            gap={2}
          >
            {(data && data.length != 0) ? (
              data.map((entry, i) => (
                <Accordion style={{ background: "white" }} key={i}>
                  <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Box
                      sx={{
                        width: 'calc(100% - 300px)',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        // gap: 5,
                      }}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={2}>
                        <IconButton
                          onClick={(e) => handleAlert(e, entry.flightId)}
                        >
                          <NotificationsIcon
                            style={{
                              height: "40px",
                              width: "40px",
                              color: "#004098",
                            }}
                          />
                        </IconButton>
                        <Typography color="#004098" fontSize={24}>
                          {entry.airline}
                        </Typography>
                      </Box>
                      <Typography fontWeight={"bold"}>
                        {entry.flightId}
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={3}
                        fontWeight={"bold"}
                      >
                        <FlightTakeoffIcon
                          style={{
                            height: "40px",
                            width: "40px",
                            color: "#004098",
                          }}
                        />
                        {new Date(
                          entry.scheduledDeparture
                        ).toLocaleTimeString()}
                      </Typography>
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={3}
                        fontWeight={"bold"}
                      >
                        <FlightLandIcon
                          style={{
                            height: "40px",
                            width: "40px",
                            color: "#004098",
                          }}
                        />
                        {new Date(entry.scheduledArrival).toLocaleTimeString()}
                      </Typography>
                      <Typography
                        fontSize={20}
                        color={
                          entry.status === "On Time"
                            ? "green"
                            : entry.status === "Delayed"
                            ? "orange"
                            : "red"
                        }
                      >
                        {entry.status}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails style={{ background: "white" }}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        md={6}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          borderRight: "1px solid black",
                        }}
                      >
                        <Typography fontWeight={"bold"} fontSize={30}>
                          Departure
                        </Typography>
                        <Typography>
                          {new Date(
                            entry.scheduledDeparture
                          ).toLocaleDateString()}
                        </Typography>
                        <Grid container>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>
                                Scheduled
                              </Typography>
                              <Typography fontSize={25}>
                                {new Date(
                                  entry.scheduledDeparture
                                ).toLocaleTimeString()}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>
                                Actual
                              </Typography>
                              <Typography fontSize={25}>
                                {entry.actualDeparture
                                  ? new Date(
                                      entry.actualDeparture
                                    ).toLocaleTimeString()
                                  : "N/A"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>
                                Terminal
                              </Typography>
                              <Typography fontSize={25}>N/A</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>Gate</Typography>
                              <Typography fontSize={25}>
                                {entry.departureGate
                                  ? entry.departureGate
                                  : "N/A"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography fontWeight={"bold"} fontSize={30}>
                          Arrival
                        </Typography>
                        <Typography>
                          {new Date(
                            entry.scheduledDeparture
                          ).toLocaleDateString()}
                        </Typography>
                        <Grid container>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>
                                Scheduled
                              </Typography>
                              <Typography fontSize={25}>
                                {new Date(
                                  entry.scheduledArrival
                                ).toLocaleTimeString()}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>
                                Actual
                              </Typography>
                              <Typography fontSize={25}>
                                {entry.actualArrival
                                  ? new Date(
                                      entry.actualArrival
                                    ).toLocaleTimeString()
                                  : "N/A"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>
                                Terminal
                              </Typography>
                              <Typography fontSize={25}>N/A</Typography>
                            </Box>
                          </Grid>
                          <Grid item md={6}>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography fontWeight={"bold"}>Gate</Typography>
                              <Typography fontSize={25}>
                                {entry.arrivalGate ? entry.arrivalGate : "N/A"}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography fontWeight={"bold"} fontSize={25}>
                  There are no flights!
                </Typography>
              </div>
            )}
          </Box>
        )}
      </Box>
      {open && (
        <Subscribe
          open={open}
          handleClose={() => setOpen(false)}
          flight={flight}
        />
      )}
    </Box>
  );
};

export default Search;
