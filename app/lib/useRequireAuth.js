import { useState, useLayoutEffect, memo } from "react";
import { useUserStore } from "../stores/UserStore";
import { useAppStore } from "../stores/AppStore";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

function useRequireAuth(forceAllow) {
  const router = useRouter();
  const [
    { isLoggedInUser, hasCompletedLoginCheck },
    { loginFromCookie, setHasCompletedLoginCheck, setSavedRedirect }
  ] = useUserStore();

  const [{}, { addNotification }] = useAppStore();

  const checkLogin = async () => {
    const cookies = parseCookies();
    if (!("emailForSignIn" in cookies) || !isLoggedInUser) {
      const redirect = {
        url: router.pathname
      };
      if (router.query && "slug" in router.query) {
        redirect["as"] = router.asPath;
      }
      setSavedRedirect(redirect);
      router.push("/espace-prive");
      return;
    }
  };

  useLayoutEffect(() => {
    if (!forceAllow && hasCompletedLoginCheck) {
      checkLogin();
    }
  }, [hasCompletedLoginCheck, isLoggedInUser]);
}

export default useRequireAuth;
