import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const Spinner = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CircularProgress
          color="secondary"
          style={{
            width: "30%",
            height: "30%",
            margin: "auto",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Spinner;
