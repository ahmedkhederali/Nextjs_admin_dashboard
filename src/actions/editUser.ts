 'use server';
import { createUserSchema } from '@/schema/schema';
import { CreateUserFormState } from '@/types/general_interfaces';
import { cookies } from 'next/headers';

export async function editUserFunction(
  formState: CreateUserFormState,
  formData: FormData
): Promise<CreateUserFormState> {
 

  const result = createUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    gender: formData.get('gender'),
    phone: formData.get('phone'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const authToken = cookieStore.get('token')?.value || '';

  if (!authToken) {
    return {
      errors: {
        _form: ['No token found'],
      },
    };
  }

  try {
    return {
      errors: {},
      success: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }
}
