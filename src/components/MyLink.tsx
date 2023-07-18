import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

export function MyLink(props: LinkProps & {children: ReactNode}){
    return <Link className="hover:text-cyan-400" {...props}>{props.children}</Link>;
}