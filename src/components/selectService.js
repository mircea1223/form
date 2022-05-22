import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, FormControlLabel, Grid, Switch } from "@material-ui/core";
import { curl, straight, color, haircut, shampoo } from "./iconPaths";

const services = [
  {
    name: "hair care and washing",
    iconPath: shampoo,
    iconViewBox: "-20 -20 640.01063 640"
  },
  { name: "haircut", iconPath: haircut, iconViewBox: "-20 -20 640 640" },
  { name: "coloring", iconPath: color, iconViewBox: "-150 -20 640 640" },
  { name: "waving", iconPath: curl, iconViewBox: "-20 -20 640.01038 640" },
  {
    name: "straightening",
    iconPath: straight,
    iconViewBox: "-97 -20 640 640"
  }
];
const getInitialState = () => {
  return services.reduce((obj, item) => {
    obj[item.name] = false;
    return obj;
  }, {});
};
const style = (theme) => ({
  root: {
    padding: 8,
    height: "100%",
    alignItems: "center",
    maxWidth: 400,
    margin: " 0 auto"
  },
  row: { borderBottom: `1px solid ${theme.palette.grey[100]}` },
  icon: {
    fill: theme.palette.grey[700],
    width: 28,
    height: 28
  }
});
const SelectService = ({ classes }) => {
  const [serviceSelected, setServiceSelected] = useState(
    JSON.parse(localStorage.getItem("services")) ?? getInitialState()
  );
  const handleChange = (name) => (e) => {
    const selected = { ...serviceSelected, [name]: e.target.checked };
    setServiceSelected(selected);
    localStorage.setItem("services", JSON.stringify(selected));
  };

  const textSelected = Object.keys(serviceSelected)
    .filter((key) => serviceSelected[key])
    .join(", ");

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
      spacing={0}
    >
      {services.map((service, i) => (
        <Grid
          item
          key={service.name}
          container
          justify="space-between"
          alignItems="center"
          className={classes.row}
        >
          <svg
            className={classes.icon}
            viewBox={service.iconViewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            {service.iconPath}
          </svg>
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange(service.name)}
                value={service.name}
                color="primary"
              />
            }
            label={service.name}
            checked={serviceSelected[service.name]}
            labelPlacement="start"
          />
        </Grid>
      ))}
      <input
        type="text"
        value={textSelected}
        name="selected services"
        id="selected-services"
        style={{ width: 1, height: 1, opacity: 0.1 }}
        readOnly
      />
    </Grid>
  );
};

SelectService.propTypes = {
  classes: PropTypes.object
};
export default withStyles(style)(SelectService);
