import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import Spinner from "../Shared/Spinner";
import AppModal from "../Shared/Modal";
import useStylesList from "../../styles/list.style";
import {
  deleteCategoryAction,
  getCategoriesAction,
} from "../../actions/category";

const CategoriesList = () => {
  const classes = useStylesList();
  const dispatch = useDispatch();
  const categoriesState = useSelector((state) => state.categories);
  const {
    user: { token, admin },
  } = useSelector((state) => state.authentication);
  const { categories, error, loading } = categoriesState;

  const deleteCategory = (cid) => dispatch(deleteCategoryAction(token, cid));

  useEffect(() => {
    dispatch(getCategoriesAction(token));
  }, [dispatch]);
  return (
    <React.Fragment>
      {admin && (
        <Link to={`/addCategory`}>
          <Button>Add category</Button>
        </Link>
      )}
      <Typography variant="h3" gutterBottom>
        What would you like to learn today?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Select category of skills that you'd like to master.
      </Typography>
      {error && (
        <AppModal open={true} title={"Error"} message={error.message} />
      )}
      {loading && <Spinner />}
      {categories && !error && !loading && (
        <List className={classes.root}>
          {categories.map((category) => {
            return (
              <div>
                <ListItem key={category.id} className={classes.item}>
                  <Link to={`/skills?categoryId=${category.id}`}>
                    <ListItemText
                      primary={`${category.name}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Skills count
                          </Typography>
                          {` — ${category.skillCount}`}
                        </React.Fragment>
                      }
                    />
                  </Link>
                  {admin && (
                    <Link to={`/category/${category.id}`}>
                      <Button>Edit</Button>
                    </Link>
                  )}
                  {admin && (
                    <Button onClick={() => deleteCategory(category.id)}>
                      Delete
                    </Button>
                  )}
                </ListItem>
              </div>
            );
          })}
        </List>
      )}
    </React.Fragment>
  );
};

export default CategoriesList;
