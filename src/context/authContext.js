"use client";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { post } from "@/lib/http";
import { setToken } from "@/helper/function";
import Cookies from "js-cookie";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  const handleLoginAuth = async (body) => {
    try {
      const res = await post("/user/auth/login", body);
      const decoded = jwt_decode(res.access_token);
      const decodedrefersh = jwt_decode(res.refresh_token);
      console.log(user);
      setToken("accessToken", res.access_token, decoded["exp"], "ACCESS_TOKEN");
      setToken("refreshToken", res.refresh_token, decodedrefersh["exp"]);
      setUserId(decoded);
      setUser(jwt_decode(res.id_token));
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = async () => {
    function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    try {
      const res = await post("/user/auth/signout");
      if (res.statusCode == "200") {
        sessionStorage.removeItem("user");
        deleteCookie("accessToken");
        deleteCookie("session");
        window.sessionStorage.clear();
        window.localStorage.clear();
        setUser(undefined);
        setUserId(undefined);
        router.push("/auth/login");
      }
    } catch (error) {}
  };

  const unsubscribe = async () => {
    const cookiesData = Cookies.get();
    try {
      if (cookiesData["headerPayload"]) {
        const decodedToken = jwt_decode(
          cookiesData["headerPayload"] + "." + cookiesData["signature"]
        );

        if (decodedToken["user_id"]) {
          const res = await post("/user/auth/verify/session");
          console.log(res);
          const decoded = jwt_decode(res.access_token);
          setToken(
            "accessToken",
            res.access_token,
            decoded["exp"],
            "ACCESS_TOKEN"
          );
          setUserId(decoded);
          setUser(jwt_decode(res.id_token));
        }
      }
    } catch (error) {
      setUser(undefined);
      setUserId(undefined);
    }
  };

  const getToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        const res = await post("/user/auth/session/refresh/token", {
          token: refreshToken,
        });
        const decoded = jwt_decode(res.access_token);
        console.log(user);
        setToken(
          "accessToken",
          res.access_token,
          decoded["exp"],
          "ACCESS_TOKEN"
        );
        setUserId(decoded);
        setUser(decoded);
      }
    } catch (error) {
      setUser(undefined);
      setUserId(undefined);
    }
  };

  React.useEffect(() => {
    unsubscribe();
  }, []);

  useEffect(() => {
    const tokenRefreshInterval = setInterval(getToken, 10 * 60 * 1000);

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLoginAuth, Logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
