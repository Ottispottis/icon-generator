import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "~/components/Button";
import { ColorInput } from "~/components/ColorInput";
import { FormGroup } from "~/components/formGroup";
import { Input } from "~/components/input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {


    const colors = [
        "blue",
        "PowderBlue",
        "red",
        "Magenta",
        "HotPink",
        "MediumSeaGreen",
        "green",
        "Olive",
        "orange",
        "yellow",
        "white",
        "black",
      ];

    const shapes = ["square", "circle","hexagon","triangle"];

    const styles = [
        "claymorphic",
        "3d rendered",
        "pixelated",
        "pencil drawn",
        "minecraft",
        "fractal art",
        "geometric",
        "low polygon",
        "synthware",
        "cyberpunk",
        "pop art",
        "realistic",
        "isometric"

      ];

    const [error, setError] = useState("")
    const [form, setForm] = useState({
        prompt: "",
        color: "",
        shape: "",
        style: "",
        numberOfIcons: "1",
    })
    const [imageUrls, setImageUrls] = useState<{imageUrl: string}[]>([])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data){
            if (!data) return;
            setImageUrls(data)
        },
        onError(error) {
            setError(error.message);
        }
    });

    useEffect(()=>{
        scrollToTop();
    }, [error])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('')
        generateIcon.mutate({
            ...form,
            numberOfIcons: parseInt(form.numberOfIcons)
        });
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

        {error &&
             
            <div className="text-center bg-red-500 text-white rounded p-4 text-xl">{error}</div>
            
        }
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
                value={form.prompt} 
                onChange={updateForm("prompt")} 
                required
                ></Input>
            </FormGroup>

            <h2 className="text-xl">2. Pick the color of your icon. </h2>
            <FormGroup className="grid grid-cols-4 grid-rows-2 gap-2">
                {colors.map((color) => (
                    <div key={color} className="h-16 w-16">
                    <><ColorInput
                    color={color}
                    value={color}
                    required
                    className={`bg-${color}-500 hover:bg-${color}-500`}
                    onChange={()=> setForm((prev)=>({...prev, color}))}>
                    </ColorInput>
                    
                    <label key={color} className="sr-only">

                            {color}
                        </label></>
                    </div>
                ))}    
            </FormGroup>

            <h2 className="text-xl">3. Pick the shape of your icon. </h2>
            <FormGroup className="grid grid-cols-2 mb-8 sm:grid-cols-4">
                {shapes.map((shape) => (
                <label key={shape} className="flex gap-2 text-xl">
                    <input 
                    type="radio" 
                    name="shape" 
                    value={shape}
                    checked={shape === form.shape}
                    required
                    onChange={()=> setForm((prev)=>({...prev, shape}))}>
                    </input>
                    {shape}
                </label>
                ))}    
            </FormGroup>

            <h2 className="text-xl">4. Pick the style of your icon. </h2>
            <FormGroup className="grid grid-cols-2 mb-8 sm:grid-cols-4">
                {styles.map((style) => (
                <label key={style} className="flex gap-2 text-xl">
                    <input 
                    type="radio" 
                    name="style" 
                    value={style}
                    checked={style === form.style}
                    required
                    onChange={()=> setForm((prev)=>({...prev, style}))}>
                    </input>
                    {style}
                </label>
                ))}    
            </FormGroup>

            <h2 className="text-xl">5. How many icons do you want? </h2>
            <FormGroup className="flex flex-col gap-4">
                <label>
                Count (Max 10)
                </label>
                <Input 
                inputMode="numeric"
                pattern="[1-9]|10"
                value={form.numberOfIcons}
                required
                onChange={updateForm("numberOfIcons")}
                ></Input>
                
                   
            </FormGroup>

            
            
            <Button isLoading={generateIcon.isLoading} disabled={generateIcon.isLoading}>Submit</Button>
            
            {imageUrls.length > 0 && 
            <>
            <h2 className="text-xl">Your Icons</h2>
            <section className="grid grid-cols-4 gap-4 mb-12">
                {imageUrls.map(({imageUrl}) =>(
                    <Image key={imageUrl} src={imageUrl} alt="Generated prompt image" width="512" height="512" className="w-full"></Image>
                ))}
                
            </section>
            

            </>}
        </form> : <div>Login to generate icons</div>}
      </main>
    </>
  );
};

export default GeneratePage;

