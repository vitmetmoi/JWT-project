import './App.scss';
import Nav from './components/Navigation/Nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './components/Login/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login">
          <Login></Login>
        </Route>

        <Switch>
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
          <Route path="/home">
            <Nav />
            hello react!
          </Route>
        </Switch>

      </div>
    </Router>


  );
}

export default App;
