import { SVGProps } from "react";

export function CrownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2.005 19h20v2h-20zm0-14l5 3.5l5-6.5l5 6.5l5-3.5v12h-20zm2 3.841V15h16V8.841l-3.42 2.394l-4.58-5.955l-4.58 5.955z"
      />
    </svg>
  );
}
