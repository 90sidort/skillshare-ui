import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../Shared/Spinner";
import AppModal from "../Shared/Modal";
import useStylesList from "../../styles/list.style";
import { getCategoriesAction } from "../../actions/category";

const CategoriesList = () => {
  const classes = useStylesList();
  const dispatch = useDispatch();
  const categoriesState = useSelector((state) => state.categories);
  const {
    user: { token },
  } = useSelector((state) => state.authentication);
  const { categories, error, loading } = categoriesState;
  useEffect(() => {
    dispatch(getCategoriesAction(token));
  }, [dispatch]);

  return (
    <React.Fragment>
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
