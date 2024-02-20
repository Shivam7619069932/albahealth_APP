import React, { createContext, useContext } from "react";
import axios from "axios";
import Config from "../config/config";
import { AuthContext } from "./AuthContext";

const AxiosContext = createContext(undefined);

const AxiosContextProvider = (props) => {
  const { token } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: Config.appApiUrl,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  });

  const providerValue = {
    axiosInstance
  }

  return (
    <AxiosContext.Provider value={providerValue}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export {
  AxiosContext,
  AxiosContextProvider
}
