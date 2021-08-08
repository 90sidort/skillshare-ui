import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import useStylesCard from "../../styles/card.style";
import Spinner from "../Shared/Spinner";
import AppModal from "../Shared/Modal";
import { validationCategory as validationSchema } from "../../validators/category.validator";
import { updateCategoryAction } from "../../actions/category";
import { useFormik } from "formik";

const CategoryEdit = () => {
  const id = parseInt(useLocation().pathname.split("category/")[1]);
  const history = useHistory();
  const classes = useStylesCard();
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const {
    user: { token },
  } = useSelector((state) => state.authentication);
  const category = categories.find((category) => category.id === id);
  const formik = useFormik({
    initialValues: { name: category.name },
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(updateCategoryAction(token, id, values))
        .then(() => {
          history.push("/");
        })
        .catch(() => {});
    },
  });

  return (
    <React.Fragment>
      {error && (
        <AppModal open={true} title={"Error"} message={error.message} />
      )}
      {loading && <Spinner />}
      {category && (
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`Editing category ${category.name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`This category is related to ${category.skillCount}`}
            </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} className={classes.fields}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
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
              </Grid>
              <Button
                disabled={JSON.stringify(formik.errors) !== "{}"}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save changes
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={formik.handleReset}
              >
                Reset form
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default CategoryEdit;
