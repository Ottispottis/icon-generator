
import { createTRPCRouter } from "~/server/api/trpc";
import { checkoutRouter } from './routers/checkout';
import { generateRouter } from './routers/generate';
import { iconsRouter } from "./routers/icons";
import { userRouter } from "./routers/user";



export const appRouter = createTRPCRouter({
  user: userRouter,
  generate: generateRouter,
  checkout: checkoutRouter,
  icons: iconsRouter,
});


export type AppRouter = typeof appRouter;
