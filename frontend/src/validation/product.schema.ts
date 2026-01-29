import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    price: z.number().positive('Цена должна быть больше 0'),
    category_id: z.number(),
    description: z.string().optional().nullable(),
});

export type ProductForm = z.infer<typeof productSchema>;
