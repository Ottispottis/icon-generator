
import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { Button } from "./Button";
import { MyLink } from "./MyLink";




export function Header(){
    const {buyCredits} = useBuyCredits();
    const session = useSession();
    const isLoggedIn = !!session.data;
    return <header className="bg-gray-300 dark:bg-gray-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
            <MyLink href="/" >Icon Generator</MyLink>
            <ul>
                <li><MyLink href={"/generate"} >Generate</MyLink></li>
            </ul>
            <ul className="flex gap-4">
                {isLoggedIn ? <><li>
                    <Button variant="secondary"
                        onClick={() => {
                            signOut().catch(console.error);
                        } }>Logout
                    </Button>
                </li>
                <li><Button onClick={() => { 
                    buyCredits().catch(console.error); 
                    } }>Buy Credits
                    </Button>
                </li>
                </>
                    : 
                    <li>
                        <Button 
                            onClick={() => {
                                signIn().catch(console.error);
                                } }>Login
                        </Button>
                    </li>
                        
                }
            </ul>
            <div>Account</div>
        </div>
    </header>
}