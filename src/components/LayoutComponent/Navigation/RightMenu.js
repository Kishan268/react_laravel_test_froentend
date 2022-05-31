import React from 'react';
import { Menu , Button } from 'antd';
import './navigation_style.css';
import { useHistory,Link } from "react-router-dom";
import Cookies from "js-cookie";
// import Login from './components/LoginComponent/login';

const RightMenu = () => { 
  let history = useHistory();
  var isLogin = localStorage.getItem('token');
  const onLogout = () => {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    Cookies.remove('Token');
    history.push("/");

};
    
    
    return (
     
      <Menu mode="horizontal">
         <Menu.Item  className='list'>
         <Link className="navbar-brand" to="#">
         <img style={{width:'40px'}} src="https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg" alt="" />
         </Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/">Home</Link>
        </Menu.Item>
       {!isLogin ? <>
       
        <Menu.Item  className='list'>
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/login">Login</Link>
        </Menu.Item>
        </>
        :
        <>
         <Menu.Item  className='list'>
          <Link to="/book_register">Create Books</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/book_listing">BookListing</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
            <Button href='/' color="inherit" onClick={(()=>onLogout())}>logout</Button>
        </Menu.Item></>
        }
      </Menu>
    );
  }

export default RightMenu;