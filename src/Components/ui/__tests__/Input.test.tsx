// src/Components/ui/__tests__/Input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('allows typing in the input', async () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;

    await userEvent.type(input, 'Hello World');

    expect(input.value).toBe('Hello World');
  });

  it('applies disabled state', () => {
    render(<Input placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });
});
