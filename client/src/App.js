import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "semantic-ui-css/semantic.min.css";
import "./styles/css/styles.css";
// Components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import MovieDetail from "./components/movie/MovieDetail";
import Discussion from "./components/comment/Discussion";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/detail/:id" component={MovieDetail} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/discussion/:id"
                component={Discussion}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
