import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FormGroup } from "~/components/formGroup";
import { Input } from "~/components/input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
    const [form, setForm] = useState({prompt: ""})

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data){
            console.log("mutation finished", data);
        }
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: Submit form data to the backend
        generateIcon.mutate({
            prompt: form.prompt
        });
       
    }

    function updateForm(key: string){
        return function(e: React.ChangeEvent<HTMLInputElement>){
            setForm(prev =>({
                ...prev, [key]: e.target.value}))}
        }
    
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormGroup>
                <label>Prompt</label>
                <Input 
                value={form.prompt} onChange={updateForm("prompt")}></Input>
            </FormGroup>
            
            <button className="bg-blue-400 px-4 py-2 rounded hover:bg-blue-500">Submit</button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;

