import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";
import Seat from "../seat/Seat";
import Search from "../search/Search";
import Edit from "../reservations/Edit";

// Defines all the routes for the application.
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      {/* Redirect the root path to the /dashboard route */}
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      {/* Route for seating a reservation */}
      <Route exact path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      {/* Route for editing a reservation */}
      <Route exact path="/reservations/:reservation_id/edit">
        <Edit />
      </Route>
      {/* Route for creating a new reservation */}
      <Route exact path="/reservations/new">
        <Reservations />
      </Route>
      {/* Redirect the /reservations path to the /dashboard route */}
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      {/* Route for the dashboard, with an optional date parameter */}
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      {/* Route for creating new tables */}
      <Route path="/tables/new">
        <Tables />
      </Route>
      {/* Route for searching */}
      <Route path="/search">
        <Search />
      </Route>
      {/* Default route for handling 404 Not Found */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
