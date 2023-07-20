import { type Icon } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";


const CollectionPage: NextPage = () => {

    const icons = api.icons.getCommunityIcons.useQuery();
    
    
  return (
    <>
      <Head>
        <title>Community Icons</title>
        <meta name="description" content="Community Icons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" mt-12 sm:mt-24 flex min-h-screen flex-col container mx-auto px-4">
        <h1 className="text-4xl mb-5">Icons created by the community</h1>
        <ul className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4  md:grid-cols-6">
            {icons.data?.map((icon: Icon) =>(
                <li key={icon.id}>
                    <Image
                    className="w-full rounded-lg" 
                    src={`https://icon-generator-dalle.s3.eu-north-1.amazonaws.com/${icon.id}`}
                    width={'512'}
                    height={'512'}
                    alt={icon.prompt ?? 'an image of an icon'}
                    />
                </li>
            ))}
            
        </ul>
       
      </main>
    </>
  );
};

export default CollectionPage;

