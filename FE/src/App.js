import './App.scss';
import Nav from './components/Navigation/Nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './components/Login/Login'
import Register from './components/Register/Register';
function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/contact">
            <Nav />
            about
          </Route>
          <Route path="/news">
            <Nav />
            user
          </Route>
          <Route path="/about">
            <Nav />
            user
          </Route>
          <Route path="/">
            <Nav />
            hello react!
          </Route>
        </Switch>

      </div>
    </Router>


  );
}

export default App;
