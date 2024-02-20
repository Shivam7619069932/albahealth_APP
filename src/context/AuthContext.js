import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";
import { RootContext } from './RootContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../config/config";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const { setLoading, showToast } = useContext(RootContext);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  // Sign Up
  const [signupData, setSignupData] = useState({
    email: '', // 'test@test.com',
    password: '', // 'password123',
    password_confirmation: '', // 'password123'
  });
  // Consent Data
  const [agreeConsentA, setAgreeConsentA] = useState(false);
  const [agreeConsentB, setAgreeConsentB] = useState(false);
  // Sign In
  const [signinData, setSigninData] = useState({
    email: '', // 'test@test.com',
    password: '', // 'password123'
  });

  const axiosInstance = axios.create({
    baseURL: config.appApiUrl,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  });

  useEffect(() => {
    rememberSession();
  }, [token]);

  const rememberSession = async () => {
    try {
      const _token = await AsyncStorage.getItem('token');
      setToken(JSON.parse(_token));
      const _user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(_user));
    } catch (error) {
      console.log('err: ', error);
    }
  }

  const SignUp = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'signup',
      data: signupData
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      console.log('-- signup res --', data);
      if (data.success) {
        saveToken(data.token);
        saveUser(data.user);
      }
        return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
      showToast('Server has error! Try again later.');
    });
  }

  const SignIn = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'signin',
      data: signinData
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      if (data.success) {
        saveToken(data.token);
        saveUser(data.user);
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
      showToast('Server has error! Try again later.');
    });
  }

  const saveToken = async (token) => {
    setToken(token);
    try {
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.log('err: ', error);
    }
  }
  
  const saveUser = async (data) => {
    setUser(data);
    const tomorrow = new Date();
    const expires = tomorrow.setDate(tomorrow.getDate()+10);
    const _user = data;
    _user.expires = expires;
    try {
      await AsyncStorage.setItem('user', JSON.stringify(_user));
    } catch (error) {
      console.log('err: ', error);
    }
  }

  const SignOut = () => {
    setLoading(true);
    return axiosInstance({
      method: 'POST',
      url: 'signout',
    }).then((response) => {
      setLoading(false);
      const data = response.data;
      console.log('=== logout res ===', data);
      if (data.success) {
        removeSession();
      }
      return data;
    }).catch(error => {
      setLoading(false);
      console.log('err: ', error);
      showToast('Server has error! Try again later.');
    });
  }
  
  const removeSession = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log('err: ', error);
    }
  }

  const providerValue = {
    token,
    user,
    axiosInstance,
    signupData, setSignupData, SignUp, 
    agreeConsentA, setAgreeConsentA, agreeConsentB, setAgreeConsentB, 
    signinData, setSigninData, SignIn,
    SignOut,
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext, AuthContextProvider
}