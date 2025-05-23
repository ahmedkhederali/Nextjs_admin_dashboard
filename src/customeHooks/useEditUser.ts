import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateUser } from '@/store/slices/usersSlice';
import { toast } from 'sonner';
import { editUserFunction } from '@/actions/editUser';
import { CreateUserFormState } from '@/types/general_interfaces';
import { useTranslations } from 'next-intl';

import { User } from '@/types/general_interfaces';

export const useEditUser = (user: User, onClose: () => void) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<CreateUserFormState>({
    errors: {},
    success: false,
  });

  const [form, setForm] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationResponse = await editUserFunction({ errors: {}, success: false }, formData);

    if (!validationResponse.success) {
      toast.error(t('validationError'));
      setFormState(validationResponse);
      return; // Stop submission if validation fails
    }

    const updatedUser = {
      name: form.name,
      email: form.email,
      gender: form.gender ?? '',
      phone: form.phone ?? '',
    };

    dispatch(updateUser({ id: form.id, ...updatedUser }));
    toast.success(t('userUpdated'));
    setFormState({ errors: {}, success: true });
    onClose();
  };

  return {
    form,
    formState,
    handleChange,
    handleSubmit,
  };
};
