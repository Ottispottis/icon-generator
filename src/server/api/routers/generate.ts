import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter, protectedProcedure, publicProcedure
} from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";


const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function iconGeneration(prompt: string): Promise<string | undefined> {
    if (env.MOCK_DALLE === 'true'){
        return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-j2XZ8Jz3FD2ekVEA6yEF21sT/user-e9hOQXjjemrLbEIVBf1XQs4y/img-jPMnpVhxonqVpEaFUpRgIu59.png?st=2023-07-13T10%3A12%3A20Z&se=2023-07-13T12%3A12%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-12T20%3A26%3A06Z&ske=2023-07-13T20%3A26%3A06Z&sks=b&skv=2021-08-06&sig=UBQVH23JqwrFBqS1ACXaJmPS//pkWbk7rP5A4Zyy0P0%3D";
    }else{
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "256x256"
        });
        return response.data.data[0]?.url;
    }
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure.input(z.object({prompt: z.string()})).mutation(async({ctx, input}) =>{
            const {count} = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id, 
                credits: {
                    gte: 1,
                },
            },
            data: {
                credits: {
                    decrement: 1,
                },
            },
        });
        if (count <= 0) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You do not have enough credits'
            });
        }

        // TODO: Fetch request to DALLE api

        const url = await iconGeneration(input.prompt);

        return {
            imageUrl: url,
        }
       
    }),
});
