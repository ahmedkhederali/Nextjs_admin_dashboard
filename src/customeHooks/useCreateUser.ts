import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { createUser, fetchUsers } from '@/store/slices/usersSlice';
import { toast } from 'sonner';
import { createUserFunction } from '@/actions/createUser';
import { CreateUserFormState } from '@/types/general_interfaces';
import { useTranslations } from 'next-intl';
import { parseErrorMessage } from '@/lib/utils';

export const useCreateUser = (onClose: () => void) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<CreateUserFormState>({
    errors: {},
    success: false,
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: 'male',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationResponse = await createUserFunction({ errors: {}, success: false }, formData);

    if (!validationResponse.success) {
      toast.error(t('validationError'));
      setFormState(validationResponse);
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      gender: form.gender,
      phone: form.phone,
    };

  try {
    await dispatch(createUser(newUser)).unwrap();  
    toast.success(t('userCreated'));
    setFormState({ errors: {}, success: true });
    onClose();
    dispatch(fetchUsers());
  } catch (error) {
    const message = parseErrorMessage(error);
    toast.error(t('userCreationError', { error: message }));
    setFormState({ errors: {}, success: false });
  }
};



  return {
    form,
    formState,
    handleChange,
    handleSubmit,
  };
};
