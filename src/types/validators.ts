import { nanoid } from "nanoid";
import { z } from "zod";

export const PinValidator = z.object({
    id: z.string().default(() => nanoid()),
    title: z.string(),
    description: z.string().optional(),
    area: z.enum(["Azura", "Farmlands"]),
    imageUrl: z.string().optional(),
    x: z.number(),
    y: z.number(),
    typeId: z.string().nullable(),
    status: z.enum(["private", "public"]).default("private"),
});

export type PinInput = z.input<typeof PinValidator>;
export type PinOutput = z.output<typeof PinValidator>;