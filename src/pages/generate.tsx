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
    const colors = [
        "blue",
        "red",
        "pink",
        "green",
        "orange",
        "yellow",
        "white",
        "black",
      ];
    const [form, setForm] = useState({
        prompt: "",
        color: "",
    })
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
            prompt: form.prompt,
            color: form.color,
        });
        setForm((prev)=>({...prev}));
       
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
        <title>Icon Generation</title>
        <meta name="description" content="Icon Generation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" mt-12 sm:mt-24 flex min-h-screen flex-col container mx-auto px-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-4 sm:mb-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl sm:text-4xl">Start generating your icons.</h1> 
                <p className="text-1xl sm:text-2xl mb-12">Fill out the form below to generate your very own icons.</p>
            </div>
        </section>  
      {isLoggedIn ? <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-xl">1. Describe the what you want your icons to look like. </h2>
            <FormGroup className="mb-8">
                <label>Prompt</label>
                <Input 
                value={form.prompt} onChange={updateForm("prompt")}></Input>
            </FormGroup>

            <h2 className="text-xl">2. Pick the color of your icon. </h2>
            <FormGroup className="grid grid-cols-4 mb-8">
                {colors.map((color) => (
                <label key={color} className="flex gap-2 text-xl">
                    <input 
                    type="radio" 
                    name="color" 
                    value={color}
                    checked={color === form.color}
                    onChange={()=> setForm((prev)=>({...prev, color}))}>
                    </input>
                    {color}
                </label>
                ))}    
            </FormGroup>
            
            <Button isLoading={generateIcon.isLoading} disabled={generateIcon.isLoading}>Submit</Button>
            
            {imageUrl && 
            <>
            <h2 className="text-xl">Your Icons</h2>
            <section className="grid grid-cols-4 gap-4 mb-12">
                <Image src={imageUrl} alt="Generated prompt image" width="100" height="100" className="w-full"></Image>
            </section>
            

            </>}
        </form> : <div>Login to generate icons</div>}
      </main>
    </>
  );
};

export default GeneratePage;

