import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Logo } from './Logo';

// Mock remotion hooks and functions
vi.mock('remotion', () => ({
  useVideoConfig: vi.fn(() => ({
    fps: 30,
    durationInFrames: 300,
    width: 1920,
    height: 1080,
  })),
  useCurrentFrame: vi.fn(() => 0),
  spring: vi.fn(({ frame }) => frame * 0.1), // Dummy implementation for testing
  interpolate: vi.fn(() => 45), // Dummy implementation
  AbsoluteFill: ({ children, style }) => (
    <div data-testid="absolute-fill" style={style}>
      {children}
    </div>
  ),
  random: vi.fn(() => 0.5),
}));

describe('Logo', () => {
  it('renders correctly with expected animations', () => {
    const { getByTestId } = render(<Logo />);

    const container = getByTestId('absolute-fill');
    expect(container).toBeInTheDocument();

    // Check if correct styles are applied based on our mocks
    expect(container.style.transform).toBe('scale(0) rotate(45deg)');
  });

  it('renders arcs and atom', () => {
    const { container } = render(<Logo />);

    // 3 Arcs (ellipses) and 1 Atom (circle) expected based on the Logo component structure
    const ellipses = container.querySelectorAll('ellipse');
    const circles = container.querySelectorAll('circle');

    expect(ellipses.length).toBe(3);
    expect(circles.length).toBe(1);
  });
});
