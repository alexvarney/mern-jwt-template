import React, { Component } from "react";
import Config from "../../config";
import { useRouter } from "next/router";

const PROFILE_ENDPOINT = `${Config.API_ENDPOINT}${Config.PROFILE}`;

function isBrowser() {
  return typeof window !== "undefined";
}

export default function withLogin(
  WrappedComponent,
  redirectValid,
  redirectInvalid
) {
  const AuthenticatedWithRedirect = ({ redirect, ...rest }) => {
    const router = useRouter();
    if (redirect && isBrowser()) {
      router.push(redirect);
    }

    return <WrappedComponent {...rest} />;
  };

  AuthenticatedWithRedirect.getInitialProps = async (context) => {
    let token = context?.req?.cookies?.jwt;

    if (typeof window !== "undefined") {
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt"))
        .split("=")[1];
    }

    const response = await fetch(PROFILE_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
      },
    }).then((res) => res.json());

    let redirect = null;

    if (!isBrowser() && context.res) {
      //SSR
      if (!response._id && redirectInvalid) {
        context.res.writeHead(302, { Location: redirectInvalid });
        context.res.end();
      } else if (response._id && redirectValid) {
        context.res.writeHead(302, { Location: redirectValid });
        context.res.end();
      }
    } else {
      if (!response._id && redirectInvalid) {
        redirect = redirectInvalid;
      }
      if (response._id && redirectValid) {
        redirect = redirectValid;
      }
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
