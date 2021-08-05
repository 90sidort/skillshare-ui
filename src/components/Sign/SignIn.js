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
import { validationSchemaSignIn as validationSchema } from "../../validators/sign.validator";
import { login } from "../../actions/auth";
import Spinner from "../Shared/Spinner";
import { initialValuesSignin as initialValues } from "../../utils/initialValues";

const SignIn = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setLoading(true);
      dispatch(login(values.username, values.password))
        .then((res) => {
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
        {!isLoading && (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <RouterLink to="/signup" style={{ textDecoration: "none" }}>
                    <Link variant="body2">Don't have an account? Sign up</Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SignIn;
