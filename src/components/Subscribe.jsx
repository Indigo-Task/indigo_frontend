import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getFirebaseToken } from "../utils/firebase";
import { toast } from "react-toastify";
const Input = styled(OutlinedInput)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

const Subscribe = ({ open, handleClose, flight = null }) => {
  // const [open, setOpen] = useState(open)
  const [flightId, setFlightId] = useState(null);
  const [method, setMethod] = useState(null);
  const [creds, setCreds] = useState(null);
  const [tokenFound, setTokenFound] = useState();
  const handleChange = (e) => {
    e.preventDefault();
    setFlightId(e.target.value);
  };
  useEffect(() => {
    if (flight != null)
    setFlightId(flight.split(" ")[1]);

    console.log(flight)
  }, [])
  const notify = async () => {
    try {

      const token = await getFirebaseToken(setTokenFound);
      const flight = `6E ${flightId}`;
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_SERVER}user/`,
          { flightId: flight, contact: creds, method: method, recepientToken: token }
        );
        console.log(data);
        handleClose();
    } catch (error) {
      toast.error(error.response.data.message)
      handleClose()
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent style={{ paddingTop: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="method-select">Method</InputLabel>
            <Select
              id="method-select"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              label="Method"
              fullWidth
              style={{ borderRadius: "10px" }}
            >
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="SMS">SMS</MenuItem>
            </Select>
          </FormControl>
          {method !== null && (
            <FormControl fullWidth>
              <InputLabel htmlFor="creds">
                {method === "Email" ? "Email" : "Phone"}
              </InputLabel>
              <Input
                fullWidth
                id="creds"
                type={method === "Email" ? "email" : "tel"}
                key="creds"
                label={method === "Email" ? "Email" : "Phone"}
                placeholder={method === "Email" ? "Email" : "Phone"}
                sx={{
                  fontSize: "16px",
                  background: "white",
                  borderRadius: "10px",
                }}
                value={creds}
                onChange={(e) => setCreds(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl fullWidth>
            <InputLabel htmlFor="flight-number">Flight Number</InputLabel>
            <Input
              fullWidth
              id="flight-number"
              type="number"
              key="flightNumber"
              label="Flight Number"
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
          <Typography variant="caption" >Click "Notify" to receive push notifications.</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={flightId == null || creds == null} onClick={notify}>
          Notify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Subscribe;
