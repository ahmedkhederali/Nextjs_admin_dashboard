import React from 'react';
import { Button } from '@/Components/ui/button';
import { useTranslations } from 'next-intl';
import { DeleteUserModalProps } from '@/types/general_interfaces';
import { useDeleteUser } from '@/customeHooks/useDeleteUser';



const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ userId, onClose, onDeleteSuccess }) => {
  const t = useTranslations();
  const { handleDelete } = useDeleteUser(userId, onDeleteSuccess, onClose);

 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-fadeIn pointer-events-auto mx-2 sm:mx-0">
        <h2 className="text-xl font-extrabold mb-6 text-center text-gray-500 dark:text-white tracking-tight">
          {t('deleteUser.confirmation')}
        </h2>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            type="button"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-medium px-5"
            onClick={onClose}
          >
            {t('deleteUser.cancel')}
          </Button>
          <Button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700 font-semibold shadow px-5"
            onClick={handleDelete}
          >
            {t('deleteUser.delete')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
