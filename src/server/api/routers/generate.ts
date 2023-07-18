import { TRPCError } from "@trpc/server";
import { z } from "zod";


import {
    createTRPCRouter, protectedProcedure
} from "~/server/api/trpc";

import AWS from 'aws-sdk';
import { Configuration, OpenAIApi } from "openai";
import { base64Image } from "~/data/b64Image";
import { env } from "~/env.mjs";

const s3 = new AWS.S3({
    credentials:{
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY
    },
    region: "eu-north-1"
});

const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function iconGeneration(prompt: string): Promise<string | undefined> {
    if (env.MOCK_DALLE === 'true'){
        return base64Image;
    }else{
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "256x256",
            response_format: "b64_json"
        });
        return response.data.data[0]?.b64_json;
    }
}

export const generateRouter = createTRPCRouter({
    generateIcon: protectedProcedure
    .input(
        z.object({
            prompt: z.string(),
            color: z.string(),
        })).mutation(async({ctx, input}) =>{
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

        const finalPrompt = `a modern icon in ${input.color} of ${input.prompt}`
        const base64EncodedImage = await iconGeneration(finalPrompt);

        const BUCKET_NAME = 'icon-generator-dalle';

        const icon = await ctx.prisma.icon.create({
            data: {
                prompt: input.prompt,
                userId: ctx.session.user.id,
            }
        });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Body: Buffer.from(base64EncodedImage!, "base64"),
            Key: icon.id,
            ContentEncoding: "base64",
            ContentType: "image/png"
        })
        .promise();

        return {
            imageUrl: `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${icon.id}`
        }
       
    }),
});
