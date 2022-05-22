import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  withStyles,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { calendar, clock } from "./iconPaths";

const dayparts = ["morning", "noon", "evening", "nomatter"];

const styles = (theme) => {
  return {
    root: {
      padding: theme.spacing.unit * 3,
      height: "100%",
      maxWidth: 450,
      margin: " 0 auto"
    },
    icon: {
      height: 28,
      width: 28,
      fill: theme.palette.grey[500]
    }
  };
};
function SelectDateDaypart({ classes }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date(localStorage.getItem("date") ?? Date.now())
  );
  const [selectedDaypart, setDaypart] = useState(
    localStorage.getItem("day-part") ?? "nomatter"
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("date", date);
  };
  const handleDaypartChange = (e) => {
    setDaypart(e.target.value);
    localStorage.setItem("day-part", e.target.value);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={2}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={classes.icon}
        >
          {calendar}
        </svg>
      </Grid>
      <Grid item xs={10}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.picker}>
            <DatePicker
              inputProps={{ id: "date" }}
              value={selectedDate}
              disablePast
              autoOk
              onChange={handleDateChange}
              name="date"
              id="date"
              fullWidth
              variant="filled"
            />
          </div>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={2}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          className={classes.icon}
        >
          {clock}
        </svg>
      </Grid>
      <Grid item xs={10}>
        <RadioGroup
          id="daypart"
          name="daypart"
          value={selectedDaypart}
          onChange={handleDaypartChange}
          row
        >
          {dayparts.map((part) => (
            <FormControlLabel
              key={part}
              value={part}
              control={<Radio color="primary" />}
              label={part}
              labelPlacement="bottom"
              checked={selectedDaypart === part}
            />
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SelectDateDaypart);
