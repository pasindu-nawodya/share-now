import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
    <Router>
      <Switch>            
          <Route path="/" exact component={Login}/>
          <Route path="/home" exact component={Home}/>
      </Switch>
    </Router>
  </div>
  );
}

export default App;
