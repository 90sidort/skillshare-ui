import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TablePagination,
  TextField,
  Typography,
} from "@material-ui/core";

import Spinner from "../Shared/Spinner";
import AppModal from "../Shared/Modal";
import useStylesList from "../../styles/list.style";
import { getSkillsAction } from "../../actions/skill";
import { getParameters } from "../../utils/parameter";

const SkillsList = () => {
  const history = useHistory();
  const cid = parseInt(useLocation().search.split("categoryId=")[1]);
  const url = useLocation().search;
  const classes = useStylesList();
  const dispatch = useDispatch();
  const [searchObject, setSearchObject] = useState(getParameters(url));
  const { categories: categories } = useSelector((state) => state.categories);
  const category = categories.find((cat) => cat.id === cid);
  const skillsState = useSelector((state) => state.skills);
  const {
    user: { token, admin },
  } = useSelector((state) => state.authentication);
  const {
    skills: { data, last, limit, total },
    loading,
    error,
  } = skillsState;

  const onSearchChange = (search) => {
    const {
      target: { value },
    } = search;
    const searchValue = value.trim().length === 0 ? "" : value;
    setSearchObject({ name: searchValue });
    history.push(`?name=${searchValue}&currentPage=${1}&limit=${limit}`);
  };

  const handleChangePage = (e, newPage) => {
    history.push(
      `?currentPage=${newPage + 1}&limit=${limit}&name=${
        searchObject.name ? searchObject.name : ""
      }`
    );
  };
  const handleChangeRowsPerPage = (e) =>
    history.push(
      `?currentPage=${1}&limit=${e.target.value}&name=${
        searchObject.name ? searchObject.name : ""
      }`
    );

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = getParameters(url);
      dispatch(getSkillsAction(token, search));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, url]);

  return (
    <React.Fragment>
      {admin && (
        <Link to={`/addSkill`}>
          <Button>Add skill</Button>
        </Link>
      )}
      {!cid && (
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          onChange={onSearchChange}
          value={searchObject.name}
        />
      )}
      {category && (
        <Typography variant="h3" gutterBottom>
          {`${category.name} skills`}
        </Typography>
      )}
      <Typography variant="subtitle1" gutterBottom>
        Select skill to browse offers.
      </Typography>
      {error && (
        <AppModal open={true} title={"Error"} message={error.message} />
      )}
      {loading && <Spinner />}
      {data && (
        <TablePagination
          component="div"
          count={total}
          page={Math.ceil(last / limit) - 1}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
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
