import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";

import useStylesSign from "../../styles/sign.style";
import AppModal from "../Shared/Modal";
import Spinner from "../Shared/Spinner";
import { initialValuesSkill as initialValues } from "../../utils/initialValues";
import { validationSkill as validationSchema } from "../../validators/skill.validator";
import { addSkillsAction } from "../../actions/skill";

const SkillAdd = () => {
  const classes = useStylesSign();
  const history = useHistory();
  const userState = useSelector((state) => state.authentication);
  const categoriesState = useSelector((state) => state.categories);
  const { categories, errorCat: error, loadingCat: loading } = categoriesState;
  const {
    user: { token },
  } = userState;
  const dispatch = useDispatch();
  const optionCategory = categories.map((category) => (
    <MenuItem key={category.id} value={category.id}>
      {category.name}
    </MenuItem>
  ));
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(addSkillsAction(token, values))
        .then((res) => {
          history.push("/skills");
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
              Add skill
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    id="catId"
                    name="catId"
                    label="Category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.catId && formik.errors.catId}
                    error={formik.touched.catId && Boolean(formik.errors.catId)}
                    SelectProps={{
                      value: formik.values.catId,
                    }}
                  >
                    {optionCategory}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
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
                Create new skill
              </Button>
            </form>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SkillAdd;
