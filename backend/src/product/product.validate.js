import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(100, "Name cannot be longer than 50 characters").trim(),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(3, "Category must be at least 3 characters").trim(),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
});

export const updateProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(100, "Name cannot be longer than 50 characters").trim().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  category: z.string().min(3, "Category must be at least 3 characters").trim().optional(),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer").optional(),
});

export const validationProduct = {
    createProductSchema,
    updateProductSchema
}
