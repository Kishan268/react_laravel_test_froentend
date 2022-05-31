import './App.css';
import React from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import 'antd/dist/antd.css';
import Navigation from './components/LayoutComponent/Navigation/Navbar';
import Home from './components/HomeComponent/index';
import Register from './components/RegisterComponent/register';
import Book from './components/BookComponent/book';
import BookListing from './components/BookComponent/bookListing';
import Login from './components/LoginComponent/login';

function App() {
  var isLogin = localStorage.getItem('token');
  return (
    <>
     <Router>
            <Navigation />
            <Switch>
            {isLogin ? <> 
              <Route exact path="/"> <Home /></Route>
              <Route exact path="/book_register"><Book /></Route>
              <Route exact path="/book_listing"><BookListing /></Route></>
              :<>
               <Route exact path="/"> <Home /></Route>
              <Route exact path="/register"> <Register /></Route>
              <Route exact path="/login"><Login /></Route></>
              }
           

            </Switch>
         </Router>
    </>
  );
}

export default App;
