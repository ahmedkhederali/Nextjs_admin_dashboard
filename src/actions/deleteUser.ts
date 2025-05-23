import { toast } from 'sonner';
import API_ROUTES from '@/lib/routes';

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      toast.error('No token provided');
      return false;
    }

    const res = await fetch(API_ROUTES.DELETE_USER(userId), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      toast.error(`Failed to delete user: ${errorText}`);
      return false;
    }

    toast.success('User deleted successfully');
    return true;
  } catch {
    toast.error('Something went wrong');
    return false;
  }
}
