import clsx from "clsx";

export function ColorInput(props: React.ComponentPropsWithoutRef<"input"> & { color: string}){
    return <input 
    {...props}
    style={{ background: props.color }}
    type="radio" 
    name="color"
    className={clsx(`h-14 w-14 appearance-none focus:ring rounded-lg checked:h-16 checked:w-16 bg-white`, props.className)}>
    {props.children}
    </input>
}

//pesjig-0baqge-kunceM