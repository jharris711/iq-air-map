import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

export const paperStyles = makeStyles(theme => ({
  root: {
    zIndex: 999,
    position: "absolute",
    width: "20vw",
    top: "10px",
    left: "10px",
    minHeight: "98vh",
    maxHeight: "98vh",
    overflow: "auto",
  }
}));

export const listStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));