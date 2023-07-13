import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Button } from "~/components/Button";
import { FormGroup } from "~/components/formGroup";
import { Input } from "~/components/input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
    const [form, setForm] = useState({prompt: ""})
    const [imageUrl, setImageUrl] = useState('')

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data){
            if (!data.imageUrl) return;
            setImageUrl(data.imageUrl)
        }
    });


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: Submit form data to the backend
        generateIcon.mutate({
            prompt: form.prompt
        });
        setForm({prompt: ""});
       
    }

    function updateForm(key: string){
        return function(e: React.ChangeEvent<HTMLInputElement>){
            setForm(prev =>({
                ...prev, [key]: e.target.value}))}
        }

    const session = useSession();

    const isLoggedIn = !!session.data;
    
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!isLoggedIn && 
        <Button onClick={()=>{
            signIn().catch(console.error);
        }}>Login</Button>
        }
        {isLoggedIn && 
        <Button onClick={()=>{
            signOut().catch(console.error);
        }}>Logout</Button>
        }  
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormGroup>
                <label>Prompt</label>
                <Input 
                value={form.prompt} onChange={updateForm("prompt")}></Input>
            </FormGroup>
            
            <Button>Submit</Button>
        </form>
        <Image src={`data:image/png;base64,${imageUrl}`} alt="Generated prompt image" width="100" height="100"></Image>
      </main>
    </>
  );
};

export default GeneratePage;

