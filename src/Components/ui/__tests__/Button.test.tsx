// src/Components/ui/__tests__/Button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('fires onClick handler', () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
