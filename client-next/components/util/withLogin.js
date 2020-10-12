import React, { useContext, useEffect } from "react";
import Config from "../../config";
import { useRouter } from "next/router";
import Auth from "./auth";

const PROFILE_ENDPOINT = `${Config.API_ENDPOINT}${Config.PROFILE}`;

function isBrowser() {
  return typeof window !== "undefined";
}

export default function withLogin(
  WrappedComponent,
  redirectRule = (context, user) => null
) {
  const AuthenticatedWithRedirect = ({ redirect, user, ...rest }) => {
    const router = useRouter();
    const [authState, authActions] = useContext(Auth);

    useEffect(() => {
      if (!authState.isLoggedIn && user._id) {
        authActions.handleLogin();
      }
    });

    if (redirect && isBrowser()) {
      router.push(redirect);
    }

    return <WrappedComponent user={user} {...rest} />;
  };

  AuthenticatedWithRedirect.getInitialProps = async (context) => {
    let token = context?.req?.cookies?.jwt;

    if (typeof window !== "undefined") {
      token = document.cookie
        ?.split("; ")
        ?.find((row) => row.startsWith("jwt"))
        ?.split("=")[1];
    }

    const response = await fetch(PROFILE_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
    }).then((res) => res.json());

    let redirect = redirectRule(context, response);

    if (!isBrowser() && context.res && redirect) {
      context.res.writeHead(302, { Location: redirect });
      context.res.end();
      redirect = null;
    }

    // Check if Page has a `getInitialProps`; if so, call it.
    const pageProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context));
    // Return props.
    return { ...pageProps, user: response, redirect };
  };

  return AuthenticatedWithRedirect;
}
