import React from "react";
import { Grid, withStyles, ButtonBase } from "@material-ui/core";

const style = (theme) => ({
  root: {
    overflow: "visible",
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    padding: 0,
    textTransform: "uppercase",
    height: 32,
    width: "calc(100% + 16px)",
    margin: "24px -8px",
    [theme.breakpoints.down("xs")]: {
      height: 28
    }
  },
  tab: {
    overflow: "visible",
    width: "100%",
    padding: 8,
    color: theme.palette.primary.main,
    opacity: 0.5,
    textTransform: "uppercase",
    fontSize: 12,
    [theme.breakpoints.down("xs")]: {
      fontSize: 10
    }
  },
  indicator: {
    height: 32,
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: [
      `0px 16px 26px -10px ${theme.palette.primary.main}a5`,
      theme.shadows[5]
    ],
    borderRadius: theme.shape.borderRadius,
    backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    opacity: 1,
    color: theme.palette.primary.main,
    fontSize: 12,
    transform: "scale(1.1)",

    transition: theme.transitions.create("all", {
      easing: "cubic-bezier(0.29, 1.42, 0.79, 1)"
    }),
    [theme.breakpoints.down("xs")]: {
      fontSize: 10
    },
    "& span": { color: theme.palette.primary.contrastText }
  }
});
const WizardHeader = ({
  classes,
  activeStep,
  handleChange,
  tabs,
  formSubmitted
}) => {
  const tabWidth = 100 / tabs.length;
  const indicatorLeft = activeStep * tabWidth;
  const indicatorStyle = {
    width: `${tabWidth}%`,
    left: `${indicatorLeft}%`
  };

  return (
    <Grid container className={classes.root}>
      {tabs.map((tab, index) => (
        <Grid item key={index} style={{ width: `${tabWidth}%` }}>
          <ButtonBase
            className={classes.tab}
            onClick={handleChange(index)}
            disabled={formSubmitted}
          >
            {tab}
          </ButtonBase>
        </Grid>
      ))}

      <div style={indicatorStyle} className={classes.indicator}>
        <span>{tabs[activeStep]}</span>
      </div>
    </Grid>
  );
};
export default withStyles(style)(WizardHeader);
