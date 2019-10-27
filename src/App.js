import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Home, FilterList } from "@material-ui/icons";
import Homes from "./components/homes.js";

export default function App() {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0
    }
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <div className="App">
      <div className="header">
        <div>Earring Akinator</div>
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homes />
          </Route>
        </Switch>
      </Router>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="FilterList" icon={<FilterList />} />
      </BottomNavigation>
    </div>
  );
}
