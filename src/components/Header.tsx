
import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";
import { Button } from "./Button";
import { MyLink } from "./MyLink";




export function Header(){
    const {buyCredits} = useBuyCredits();
    const session = useSession();
    const isLoggedIn = !!session.data;
    const credits = api.user.getCredits.useQuery(undefined, {enabled: isLoggedIn});
    return <header className="bg-gray-300 dark:bg-gray-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
            <MyLink href="/" >Icon Generator</MyLink>
            <ul className="flex gap-4">
                <li><MyLink href={"/generate"} >Generate</MyLink></li>
                <li><MyLink href={"/community"} >Community</MyLink></li>
                {isLoggedIn && <li><MyLink href={"/collection"} >Collection</MyLink></li>}
            </ul>
            <ul className="flex gap-4">
                {isLoggedIn ? <>
                <div className="flex items-center">
                    CREDITS: {credits.data}
                </div>
                
                <li>
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
        </div>
    </header>
}