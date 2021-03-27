import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/reducers";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostListPage from "./pages/PostListPage";
import CustomNavbar from "./components/CustomNavbar";

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <CustomNavbar />
          <Switch>
            <Route exact={true} path="/" component={PostListPage} />
            <Route
              exact={true}
              path="/post-details/:id"
              component={PostDetailsPage}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
