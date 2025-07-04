// utils/axiosApi.js
// import axios from "axios";

import axios from "axios";
import instance from "../lib/interceptors";
import Cookies from "js-cookie";
import { notifyerror, notifySuccess } from "./notify/notice";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your Firebase URL


export const get = async (endpint, query, id, header) => {
  // const cookiesData = Cookies.get();

  // const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  // const session = cookies["session"];
  let reqUrl = undefined;
  if (id) {
    reqUrl = baseURL + endpint + `/${id}`;
  }
  if (!id) {
    reqUrl = baseURL + endpint;
  }
  const option = {
    method: "get",
    url: reqUrl,
    headers: {
      // Authorization: "Bearer " + token,
      ...header
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e?.response?.data;

    //throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
export const getsingle = async (endpint, id, query) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];

  const option = {
    method: "get",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response.data;

    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
export const serverGetsingle = async (endpint, id, query) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  const option = {
    method: "get",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: token,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response.data;

    //  throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
export const getServerSingle = async (endpint, query, id) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];

  const option = {
    method: "get",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: token,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response.data;

    //  throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
export const post = async (endpint, data) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  const option = {
    method: "post",
    url: baseURL + endpint,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
      notifySuccess(response.data?.message || "Created successfully");
  } catch (e) {
    error = e.response.data;
 notifyerror(response.data?.message || "Something went wrong");
    // throw new Error(JSON.stringify(e.response));
  }

  // if success return value
  return response?.data ? response.data : error; // or set initial value
};
export const patch = async (endpint, data, id,header) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  const option = {
    method: "patch",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,...header
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response.data;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
export const put = async (endpint, data, id,header) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  const option = {
    method: "put",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,...header
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
   notifySuccess(response.data?.message || "Updated successfully");
    
  } catch (e) {
    error = e.response.data;
 notifyerror(response.data?.message || "Something went wrong");
    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
export const del = async (endpoint, id) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];

  const option = {
    method: "delete",
    url: baseURL + endpoint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {},
    data: {},
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
        notifySuccess(response.data?.message || "Deleted successfully");
  } catch (e) {
    error = e.response.data;
 notifyerror(response.data?.message || "Delete failed");
    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
