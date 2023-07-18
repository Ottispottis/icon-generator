import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

export function MyLinkButton(props: LinkProps & {children: ReactNode; size: string}){
    const size = props.size;
    return <Link {...props} className={`px-4 py-2 rounded bg-blue-400 hover:bg-blue-500 ${size}`} >{props.children}</Link>;
}