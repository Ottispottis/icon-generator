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



export const iconsRouter = createTRPCRouter({
    getIcons: protectedProcedure.query(async({ctx}) =>{
        const icons = await ctx.prisma.icon.findMany({
            where: {
                userId: ctx.session.user.id,
        },
        orderBy: {
            createdAt: "desc"
        }
        });
            return icons;
        })     
});
