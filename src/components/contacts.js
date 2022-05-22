import React, { useState } from "react";
import { withStyles, TextField, Grid } from "@material-ui/core";
import { ladyIcon, phoneIcon } from "./iconPaths";
const style = (theme) => {
  return {
    root: {
      padding: theme.spacing.unit * 3,
      height: "100%",
      maxWidth: 450,
      margin: "0 auto",
      "& input:disabled": { opacity: 0.5 }
    },
    icon: {
      fill: theme.palette.grey[500]
    }
  };
};

const Contacts = ({ classes, formSubmitted }) => {
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") ?? "";
  });

  const [phone, setPhone] = useState(localStorage.getItem("phone") ?? "");
  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("name", JSON.stringify(e.target.value));
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    localStorage.setItem("phone", e.target.value);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid container direction="row" alignItems="center" alignContent="center">
        <Grid item xs={2}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={classes.icon}
            width="30px"
            height="30px"
          >
            {ladyIcon}
          </svg>
        </Grid>
        <Grid item xs={10}>
          <TextField
            name="name"
            id="name"
            value={name}
            fullWidth
            margin="normal"
            label="Enter your name"
            variant="filled"
            onChange={handleNameChange}
            disabled={formSubmitted}
          />
        </Grid>
      </Grid>{" "}
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 463.009 463.009"
            className={classes.icon}
            width="24px"
            height="24px"
          >
            {phoneIcon}
          </svg>
        </Grid>
        <Grid item xs={10}>
          <TextField
            name="phone"
            id="phone"
            value={phone}
            fullWidth
            margin="normal"
            label="Enter your phone number "
            variant="filled"
            onChange={handlePhoneChange}
            disabled={formSubmitted}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(Contacts);
