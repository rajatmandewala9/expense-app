import React from 'react';
import './App.css';
import Category from './components/category/Category';
//import NavBar from './components/common/NavBar';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  return (
    // <div className="App">
    //   {/* <header className="App-header"> */}
    //     <Home/>
    //   {/* </header> */}
    // </div>
    
    <Router>
    <Switch>
      <Route path='/' exact={true} component={Home}></Route>
      <Route path='/categories'  component={Category}></Route>
    </Switch>
</Router>
  );
}

export default App;
