import { makeStyles } from "@material-ui/core";

const useStylesList = makeStyles((theme) => ({
  root: {
    marginTop: "2%",
    width: "80%",
    minWidth: "80%",
    display: "inline-block",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  item: {
    padding: "3%",
    float: "left",
    width: "20%",
    minWidth: "20%",
    border: "2px",
    borderColor: "black",
  },
}));

export default useStylesList;
