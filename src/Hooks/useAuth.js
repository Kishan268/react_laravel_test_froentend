import AuthRepository from '../Api/AuthRepository';
import cookies from "js-cookie";

import React,{useState} from 'react';
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';

export default function useAuth() {
  const history = useHistory();
    return {
        getUserRegister: async (data) => {
            var responseData = await AuthRepository.UserRegister(data);
            if (responseData.status === 200) {             

                notification.open({
                  message: "Register",
                  description: "Registration SuccessFully...!!",
                  icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
                  history.push('/login');
                return true
              } else{
                notification.open({
                  message: "Error",
                  description: "Registration Failed...!",
                  icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
                 history.push('/register');
                return false
              }
       },

       getUserLogin: async (data) => {     
        var responseData = await AuthRepository.UserLogin(data);
        if (responseData.status === 200) {
          notification.open({
            message: "Success",
            description: "Login Successfully...!!",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
          cookies.set('token', responseData.data.token)
          localStorage.setItem('token', responseData.data.token)
          localStorage.setItem("userId", responseData.data.user.id);
          history.push('/');
          window.location.reload(true);
          return  responseData.data;

          }

          else {
            notification.open({
              message: "Warning",
              description: "Login Failed...!!",
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
            history.push('/login');
            return false
          }
        },
        getBookRegister: async (data) => {
          var responseData = await AuthRepository.BookRegister(data);
          if (responseData.status === 200) {             
              notification.open({
                message: "Register",
                description: "Book Added SuccessFully...!!",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
              });
                history.push('/book_listing');
              return true
            } else{
              notification.open({
                message: "Error",
                description: "Failed...!",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
              });
               history.push('/book_register');
              return false
            }
     },
     userBooks: async (data) => {
       console.log(data)
      var responseData = await AuthRepository.userBooksListing(data);
      if (responseData.status === 200) {
          return responseData.data;
      }
      return false;
  },
   }
        
  }