import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { getSkillsAction } from "../../actions/skill";

const SkillsList = () => {
  const cid = parseInt(useLocation().search.split("=")[1]);
  const classes = useStylesList();
  const dispatch = useDispatch();
  const { categories: categories } = useSelector((state) => state.categories);
  const category = categories.find((cat) => cat.id === cid);
  const skillsState = useSelector((state) => state.skills);
  const {
    user: { token, admin },
  } = useSelector((state) => state.authentication);
  const {
    skills: { data },
    loading,
    error,
  } = skillsState;
  useEffect(() => {
    dispatch(getSkillsAction(token, cid));
  }, [dispatch]);
  console.log(category);

  return (
    <React.Fragment>
      {
        <Typography variant="h3" gutterBottom>
          {`${category.name} skills`}
        </Typography>
      }
      <Typography variant="subtitle1" gutterBottom>
        Select skill to browse offers.
      </Typography>
      {error && (
        <AppModal open={true} title={"Error"} message={error.message} />
      )}
      {loading && <Spinner />}
      {data && !error && !loading && (
        <List className={classes.root}>
          {data.length > 0 ? (
            data.map((skill) => {
              return (
                <div>
                  <Link to={`/skills/${skill.id}`}>
                    <ListItem key={skill.id} className={classes.item}>
                      <ListItemText
                        primary={`${skill.name}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {skill.description}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      {admin && (
                        <Link to={`/category/${skill.id}`}>
                          <Button>Edit</Button>
                        </Link>
                      )}
                      {admin && <Button>Delete</Button>}
                    </ListItem>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No skills found.</p>
          )}
        </List>
      )}
    </React.Fragment>
  );
};

export default SkillsList;
