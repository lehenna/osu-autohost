import * as React from "react";
import Link, { LinkProps as NextLinkProps } from "next/link";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    NextLinkProps {
  href: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ ...props }, ref) => {
    return <Link ref={ref} {...props} prefetch={false} />;
  }
);
CustomLink.displayName = "CustomLink";

export { CustomLink };
