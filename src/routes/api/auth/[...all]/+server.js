// src/routes/api/auth/[...all]/+server.js

import { auth } from "$lib/auth";
import { toSvelteKitHandler } from "better-auth/svelte-kit";

const handler = toSvelteKitHandler(auth);

export const GET = handler;
export const POST = handler;