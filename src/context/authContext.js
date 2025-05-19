"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { post } from "@/lib/http";
import { setToken, storeCookiesOfObject } from "@/helper/function";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);
  const [authError, setAuthError] = useState(undefined);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      const decoded = jwtDecode(session["accessToken"]);
      const id_token = jwtDecode(session["id_token"]);
      const decodedrefersh = jwtDecode(session["refreshToken"]);
      // console.log(id_token);
      setToken(
        "accessToken",
        session["accessToken"],
        decoded["exp"]
      );
      setToken("refreshToken", session["refreshToken"], decodedrefersh["exp"]);
      if (session["accessToken"]) {
        const token = session["accessToken"].split(".");
        setToken("headerPayload", `${token[0]}.${token[1]}`, decoded["exp"]);
        setToken("signature", `${token[2]}`, decoded["exp"]);
      }
      storeCookiesOfObject(id_token,id_token.exp);
    }
  }, [session]);

  const handleLoginAuth = async (body) => {
    // const res = await post("/user/auth/login", body);
    // //console.log(res);
    try {
      const res = await post("/user/auth/login", body);
      if (res.statusCode != 200) {
        setAuthError(res);
      } else {
        const decoded = jwtDecode(res.access_token);
        const decodedrefersh = jwtDecode(res.refresh_token);
        setToken(
          "accessToken",
          res.access_token,
          decoded["exp"],
          "ACCESS_TOKEN"
        );
        setToken("refreshToken", res.refresh_token, decodedrefersh["exp"]);
        setUserId(decoded);
        setUser(jwtDecode(res.id_token));
        setAuthError(undefined);
        router.push("/dashboard");
      }
    } catch (err) {
      //console.log(err);
    }
  };

  const Logout = async () => {
    try {
      const res = await post("/user/auth/logout");
      if (res.statusCode == "200") {
        router.push("/auth/login");
        window.sessionStorage.clear();
        window.localStorage.clear();
        const cookies = Cookies.get();
        for (const cookie in cookies) {
          Cookies.remove(cookie);
        }
        setUser(undefined);
        setUserId(undefined);

        setAuthError(undefined);
      } else {
        setAuthError(res);
      }
    } catch (error) {}
  };

  // const unsubscribe = async () => {
  //   const cookiesData = Cookies.get();
  //   try {
  //     if (cookiesData["headerPayload"]) {
  //       const decodedToken = jwtDecode(
  //         cookiesData["headerPayload"] + "." + cookiesData["signature"]
  //       );

  //       if (decodedToken["user_id"]) {
  //         const res = await post("/user/auth/verify/session");

  //         const decoded = jwtDecode(res.accessToken);
  //         setToken(
  //           "accessToken",
  //           res.accessToken,
  //           decoded["exp"],
  //           "ACCESS_TOKEN"
  //         );
  //         setUserId(decoded);
  //         setUser(jwtDecode(res.id_token));
  //       }
  //     }
  //     setAuthError(undefined);
  //   } catch (error) {
  //     setUser(undefined);
  //     setUserId(undefined);
  //     setAuthError(error.message);
  //   }
  // };

  const getToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        const res = await post("/user/auth/session/refresh/token", {
          token: refreshToken,
        });
        const decoded = jwtDecode(res.access_token);
        setToken(
          "accessToken",
          res.access_token,
          decoded["exp"],
          "ACCESS_TOKEN"
        );
        setUserId(decoded);
      }
    } catch (error) {
      setUser(undefined);
      setUserId(undefined);
    }
  };

  // React.useEffect(() => {
  //   unsubscribe();
  // }, []);

  useEffect(() => {
    const tokenRefreshInterval = setInterval(getToken, 10 * 60 * 1000);

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLoginAuth, Logout, userId, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
