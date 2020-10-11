import React from "react";
import NextLink from "next/link";

export default function Link({ href, children, ...rest }) {
  const isExternal = href.startsWith("http");

  return isExternal ? (
    <a href={href} {...rest}>
      {children}
    </a>
  ) : (
    <NextLink href={href}>
      <a {...rest}>{children}</a>
    </NextLink>
  );
}
