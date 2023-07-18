
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { MyLink } from "./MyLink";



export function Header(){
    const session = useSession();
    const isLoggedIn = !!session.data;
    return <header className="container mx-auto flex h-16 items-center justify-between px-4 dark: bg-gray-800">
        <MyLink href="/" >Icon Generator</MyLink>
        <ul>
            <li><MyLink href={"/generate"} >Generate</MyLink></li>
        </ul>
        <ul>
            {isLoggedIn ? <li>
                <Button variant="secondary"
                onClick={() => {
                      signOut().catch(console.error);
                  } }>Logout</Button></li> : <li>
                  <Button 
                  onClick={() => {
                        signIn().catch(console.error);
                    } }>Login</Button></li>}
        </ul>
        <div>Account</div>
    </header>
}