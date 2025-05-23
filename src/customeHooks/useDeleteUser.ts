import { useAppDispatch } from '@/store/hooks';
import { deleteUser } from '@/store/slices/usersSlice';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useDeleteUser(userId: number, onDeleteSuccess: () => void, onClose: () => void) {
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      onDeleteSuccess();
      onClose();
    } catch{
      toast.error(t('deleteUser.error'));
    }
  };

  return { handleDelete };
}