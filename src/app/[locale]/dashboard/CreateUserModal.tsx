import React, { useState } from "react";
import { useActionState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { createUserFunction } from '@/actions/createUser';
import { useTranslations } from 'next-intl';
import { CreateUserFormState } from "@/types/general_interfaces";

interface CreateUserModalProps {
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose }) => {
  const t = useTranslations();
  const [formState, action] = useActionState(
    async (
      prevState: CreateUserFormState,
      formData: FormData
    ): Promise<CreateUserFormState> => {
      return await createUserFunction(prevState, formData);
    },
    { errors: {}, success: false }
  );
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    gender: 'male',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (formState.success) {
      const timeout = setTimeout(() => {
        onClose();
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [formState.success, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-fadeIn pointer-events-auto mx-2 sm:mx-0">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label={t('close')}
        >
          &times;
        </button>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-500 dark:text-white tracking-tight">{t('createUser')}</h2>
        <form action={action} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">{t('name')}</label>
            <Input name="name" value={form.name} onChange={handleChange}  placeholder={t('enterName')} />
            {formState.errors.name && (
              <p className="text-red-600 text-sm">{formState.errors.name[0]}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">{t('email')}</label>
            <Input name="email" type="email" value={form.email} onChange={handleChange}  placeholder={t('enterEmail')} />
            {formState.errors.email && (
              <p className="text-red-600 text-sm">{formState.errors.email[0]}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">{t('gender')}</label>
            <select name="gender" value={form.gender} onChange={handleChange}  className="border rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </select>
            {formState.errors.gender && (
              <p className="text-red-600 text-sm">{formState.errors.gender[0]}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">{t('phone')}</label>
            <Input name="phone" value={form.phone} onChange={handleChange}  placeholder={t('enterPhone')} />
            {formState.errors.phone && (
              <p className="text-red-600 text-sm">{formState.errors.phone[0]}</p>
            )}
          </div>
          {formState.errors._form && (
            <div className="text-center mb-2 text-red-600">
              {formState.errors._form[0]}
            </div>
          )}
          {formState.success && (
            <div className="text-center mb-2 text-green-600">
              {t('userCreated')}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-medium px-5"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow px-5"
              disabled={formState.success}
            >
              {t('save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
