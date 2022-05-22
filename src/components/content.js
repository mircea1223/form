import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Paper, Grid, Typography, withStyles, Button } from "@material-ui/core";
import WizardHeader from "./wizardHeader";
import RadioMasters from "./radioMasters";
import SelectService from "./selectService";
import SelectDateDaypart from "./selectDateDaypart";
import Contacts from "./contacts";

const style = (theme) => ({
  root: {
    border: `8px solid ${theme.palette.common.white}`,
    margin: 16,
    padding: "36px 0 0",
    background: `rgba(255,255,255,0.9)`,
    boxShadow: [
      `0px 16px 26px -10px ${theme.palette.primary.main}99`,
      theme.shadows[15]
    ]
  },
  navigation: {
    width: 110,
    fontSize: 12,
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      width: 90
    }
  },
  prevBtn: {
    color: theme.palette.grey[700],
    background: theme.palette.common.white,
    boxShadow: theme.shadows[5]
  }
});
const Content = ({ classes }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(
    localStorage.getItem("step") ? Number(localStorage.getItem("step")) : 0
  );
  const handleChange = (index) => (e) => {
    setActiveStep(index);
    localStorage.setItem("step", index);
  };
  const nandleNext = () => {
    setActiveStep(activeStep + 1);
    localStorage.setItem("step", activeStep + 1);
  };
  const nandlePrev = () => {
    setActiveStep(activeStep - 1);
    localStorage.setItem("step", activeStep - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    setFormSubmitted(true);
    const data = Array.from(e.target.elements)
      .map((el) => el.id)
      .filter(Boolean)
      .reduce((accObj, field) => {
        accObj[field] = e.target.elements[field].value;
        return accObj;
      }, {});
    alert(JSON.stringify(data, null, 2));
  };
  const tabs = ["Master", "Service", "Date", "Contact"];
  return (
    <Paper style={{}} elevation={1} className={classes.root}>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ padding: "0 8px" }}
      >
        Book your Appointment
      </Typography>
      <Typography gutterBottom>
        This information will let us know about your preferences.
      </Typography>
      <WizardHeader
        tabs={tabs}
        activeStep={activeStep}
        handleChange={handleChange}
        formSubmitted={formSubmitted}
      />

      <form onSubmit={handleSubmit}>
        <SwipeableViews index={activeStep} onChangeIndex={handleChange}>
          <RadioMasters />
          <SelectService />
          <SelectDateDaypart />
          <Contacts formSubmitted={formSubmitted} />
        </SwipeableViews>
        <Grid
          container
          justify="space-between"
          style={{ padding: "16px 16px" }}
        >
          <Grid item>
            <Button
              disabled={activeStep === 0 || formSubmitted}
              onClick={nandlePrev}
              variant="contained"
              color="default"
              className={`${classes.navigation} ${classes.prevBtn}`}
            >
              Back
            </Button>
          </Grid>
          {activeStep < tabs.length - 1 && (
            <Grid item>
              <Button
                color="primary"
                className={classes.navigation}
                variant="contained"
                onClick={nandleNext}
                disabled={formSubmitted}
              >
                Next
              </Button>
            </Grid>
          )}
          {activeStep === tabs.length - 1 && (
            <Grid item>
              <Button
                type="submit"
                color="primary"
                className={classes.navigation}
                variant="contained"
                disabled={formSubmitted}
              >
                Submit
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};
export default withStyles(style)(Content);
