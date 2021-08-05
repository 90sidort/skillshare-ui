import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import {
  Avatar,
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import useStyles from "../../styles/sign.style";
import { validationSchemaSignUp as validationSchema } from "../../validators/sign.validator";
import { register } from "../../actions/auth";
import Spinner from "../Shared/Spinner";
import { initialValuesSignup as initialValues } from "../../utils/initialValues";

const SignUp = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setLoading(true);
      dispatch(
        register(
          values.username,
          values.name,
          values.surname,
          values.email,
          values.password,
          values.retype,
          values.about
        )
      )
        .then((res) => {
          console.log(res);
          setLoading(false);
          // history.push("/");
        })
        .catch(() => {
          setLoading(false);
        });
    },
  });
  return (
    <React.Fragment>
      {isLoading && <Spinner />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="surname"
                  name="surname"
                  label="Surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="retype"
                  name="retype"
                  label="Repeat password"
                  type="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.retype}
                  onChange={formik.handleChange}
                  error={formik.touched.retype && Boolean(formik.errors.retype)}
                  helperText={formik.touched.retype && formik.errors.retype}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="about"
                  name="about"
                  label="About"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  error={formik.touched.about && Boolean(formik.errors.about)}
                  helperText={formik.touched.about && formik.errors.about}
                />
              </Grid>
            </Grid>
            <Button
              disabled={JSON.stringify(formik.errors) !== "{}"}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signin" style={{ textDecoration: "none" }}>
                  <Link variant="body2">Already have an account? Sign in</Link>
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
