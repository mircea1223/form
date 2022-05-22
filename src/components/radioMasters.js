import React, { useState } from "react";
import {
  withStyles,
  Grid,
  ButtonBase,
  FormControlLabel,
  Radio,
  Tooltip
} from "@material-ui/core";
import classNames from "classnames";
const masters = [
  {
    name: "Olga",
    url:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    tooltipTxt: "haircut, combing, colouring"
  },
  {
    name: "Irene",
    url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    tooltipTxt: "combing, colouring, waving"
  },
  {
    name: "Helene",
    url:
      "https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    tooltipTxt: "waving, and straightening hair "
  }
];
const style = (theme) => {
  // const active = {
  //   filter: "grayscale(0)",
  //   border: `3px solid ${theme.palette.primary.main}`
  // };
  return {
    root: {},
    mainClass: {
      height: 106,
      width: 106,
      borderRadius: "50%",
      boxShadow: [
        `0px 16px 26px -10px ${theme.palette.primary.main}a5`,
        theme.shadows[5]
      ],
      margin: 8,
      color: theme.palette.primary.light,
      border: `3px solid ${theme.palette.common.white}`,
      filter: "grayscale(1)",
      transition: theme.transitions.create(),
      "&:active": {
        filter: "grayscale(0)",
        border: `3px solid ${theme.palette.primary.main}`
      },
      "&:hover": {
        filter: "grayscale(0)",
        border: `3px solid ${theme.palette.primary.main}`
      }
    },
    mainLblClass: {
      color: theme.palette.grey[700],
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 16,
      cursor: "pointer"
    },
    //class for checked item
    checked: {
      filter: "grayscale(0)",
      border: `3px solid ${theme.palette.primary.main}`
    },
    LblChecked: { color: theme.palette.primary.main },
    itemInner: {
      height: 66,
      width: 66,
      borderRadius: "50%",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      boxShadow: theme.shadows[9]
    },
    input: {
      cursor: "pointer",
      height: 106,
      width: 106,
      position: "absolute",
      top: -6,
      left: -6,
      opacity: 0
    }
  };
};

const RadioMasters = ({ classes }) => {
  const [checked, setChecked] = useState(
    localStorage.getItem("master")
      ? JSON.parse(localStorage.getItem("master"))
      : -1
  );
  const handleChecked = (i) => (e) => {
    localStorage.setItem("master", i);
    setChecked(i);
  };

  const itemOuterClass = (i) =>
    classNames({
      [classes.mainClass]: true,
      [classes.checked]: checked === i
    });
  const labelClass = (i) =>
    classNames({
      [classes.mainLblClass]: true,
      [classes.LblChecked]: checked === i
    });
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      {masters.map((master, i) => (
        <Grid
          item
          xs={6}
          sm={4}
          key={i}
          container
          justify="center"
          alignItems="center"
          direction="column"
        >
          <ButtonBase className={itemOuterClass(i)}>
            <Tooltip title={master.tooltipTxt} placement="top-end">
              <input
                type="radio"
                name="master"
                // id={master.name}
                value={checked === i && master.name}
                checked={checked === i}
                onChange={handleChecked(i)}
                className={classes.input}
              />
            </Tooltip>
            <div
              className={classes.itemInner}
              style={{ backgroundImage: `url(${master.url})` }}
            />
          </ButtonBase>
          <label htmlFor={master.name} className={labelClass(i)}>
            {master.name}
          </label>
        </Grid>
      ))}
      <Grid item xs={8}>
        <FormControlLabel
          name="master"
          id="none"
          value={checked === -1 ? "none" : ""}
          checked={checked === -1}
          onChange={handleChecked(-1)}
          control={<Radio color="primary" />}
          label="I have no preferences"
          labelPlacement="end"
        />
      </Grid>
      <input
        type="text"
        id="selected-master"
        name="selected master"
        value={checked > -1 ? masters[checked].name : "none"}
        style={{ width: 1, height: 1, opacity: 0.1 }}
        readOnly
      />
    </Grid>
  );
};
export default withStyles(style)(RadioMasters);
