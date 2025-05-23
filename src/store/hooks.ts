import { useDispatch } from 'react-redux';
import type { AppDispatch } from './index';

// Custom hook to use the typed dispatch function
export const useAppDispatch: () => AppDispatch = useDispatch;
