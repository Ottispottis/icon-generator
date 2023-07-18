import { Spinner } from "./Spinner";

export function Button(props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: 'primary'|'secondary';
    isLoading?: boolean;
}){

    const color = (props.variant ?? 'primary') === 'primary' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-400 hover:bg-gray-500';

    return <button {...props} className={`flex gap-2 items-center justify-center px-4 py-2 rounded ${color} disabled:bg-gray-500`}>{props.isLoading && <Spinner></Spinner>}{props.children}</button>
}