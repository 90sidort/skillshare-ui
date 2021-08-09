import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import useStylesSign from "../../styles/sign.style";
import AppModal from "../Shared/Modal";
import Spinner from "../Shared/Spinner";
import { addCategoryAction } from "../../actions/category";
import { initialValuesCategory as initialValues } from "../../utils/initialValues";
import { validationCategory as validationSchema } from "../../validators/category.validator";

const CategoryAdd = () => {
  const classes = useStylesSign();
  const history = useHistory();
  const userState = useSelector((state) => state.authentication);
  const categoriesState = useSelector((state) => state.categories);
  const { error, loading } = categoriesState;
  const {
    user: { token },
  } = userState;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(addCategoryAction(token, values))
        .then((res) => {
          history.push("/");
        })
        .catch(() => {});
    },
  });
  return (
    <React.Fragment>
      {error && <AppModal open={true} title={"Error"} message={error} />}
      {loading && <Spinner />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {!loading && (
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                Create new category
              </Button>
            </form>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default CategoryAdd;
