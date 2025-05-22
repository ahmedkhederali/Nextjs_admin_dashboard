import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  gender: z.enum(['male', 'female']),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
});