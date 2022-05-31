import React,{useState,useEffect} from 'react';
import { Menu , Button } from 'antd';
import './navigation_style.css';
import { useHistory,Link } from "react-router-dom";
import Cookies from "js-cookie";
import { PlusOutlined,LogoutOutlined,UnorderedListOutlined,LoginOutlined } from '@ant-design/icons';

const RightMenu = () => { 
  let history = useHistory();
  const [check, setCheck] = useState();

  var isLogin = localStorage.getItem('token');
  const onLogout = () => {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    Cookies.remove('Token');
    history.push('/')
    window.location.reload(false);

   setCheck(localStorage.getItem('token'))
};
  useEffect( () => {
    setCheck()
  }, []);
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
          <Link to="/login"><LoginOutlined />Login</Link>
        </Menu.Item>
        </>
        :
        <>
         <Menu.Item  className='list'>
          <Link to="/book_register" ><PlusOutlined />Create Books</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/book_listing"><UnorderedListOutlined />BookListing</Link>
        </Menu.Item>
        <Menu.Item  className='list' style={{float:'left'}}>
            <Button color="inherit" onClick={(()=>onLogout())} ><LogoutOutlined />Logout</Button>
        </Menu.Item></>
        }
      </Menu>
    );
  }

export default RightMenu;