import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../Shared/Spinner";
import AppModal from "../Shared/Modal";
import useStylesList from "../../styles/list.style";
import { getCategoriesAction } from "../../actions/category";

const CategoriesList = () => {
  const classes = useStylesList();
  const dispatch = useDispatch();
  const categoriesState = useSelector((state) => state.categories);
  const { categories, error, loading } = categoriesState;
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  return (
    <React.Fragment>
      {error && (
        <AppModal open={true} title={"Error"} message={error.message} />
      )}
      {loading && <Spinner />}
      {categories && !error && !loading && (
        <List className={classes.root}>
          {categories.map((category) => {
            return (
              <div>
                <ListItem alignItems="flex-start" key={category.id}>
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
                <Divider />
              </div>
            );
          })}
        </List>
      )}
    </React.Fragment>
  );
};

export default CategoriesList;
