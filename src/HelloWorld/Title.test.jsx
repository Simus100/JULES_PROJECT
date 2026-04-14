import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Title } from './Title';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

// Mock the remotion hooks
vi.mock('remotion', () => ({
  useVideoConfig: vi.fn(),
  useCurrentFrame: vi.fn(),
  spring: vi.fn(),
}));

describe('Title Component', () => {
  beforeEach(() => {
    useVideoConfig.mockReturnValue({ fps: 30 });
    useCurrentFrame.mockReturnValue(10);
    spring.mockImplementation(({ frame }) => {
      return frame >= 0 ? 1 : 0;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders a simple title and splits words correctly', () => {
    render(<Title titleText="Hello World" titleColor="#ffffff" />);

    // We should see both words
    const hello = screen.getByText('Hello');
    const world = screen.getByText('World');

    expect(hello).toBeInTheDocument();
    expect(world).toBeInTheDocument();
  });

  it('applies the titleColor to each word', () => {
    render(<Title titleText="Red Title" titleColor="red" />);

    const redWord = screen.getByText('Red');
    const titleWord = screen.getByText('Title');

    expect(redWord).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(titleWord).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('calculates the scale transform using remotion spring', () => {
    useCurrentFrame.mockReturnValue(5);
    // spring calculation for word 1 (delay 0): frame 5 -> scale 1
    // spring calculation for word 2 (delay 5): frame 0 -> scale 1
    // spring calculation for word 3 (delay 10): frame -5 -> scale 0

    render(<Title titleText="One Two Three" titleColor="blue" />);

    const one = screen.getByText('One');
    const two = screen.getByText('Two');
    const three = screen.getByText('Three');

    expect(one).toHaveStyle({ transform: 'scale(1)' });
    expect(two).toHaveStyle({ transform: 'scale(1)' });
    expect(three).toHaveStyle({ transform: 'scale(0)' });

    // verify spring is called with correct arguments
    expect(spring).toHaveBeenCalledWith(expect.objectContaining({
      fps: 30,
      frame: 5,
      config: { damping: 200 }
    }));
    expect(spring).toHaveBeenCalledWith(expect.objectContaining({
      fps: 30,
      frame: 0,
      config: { damping: 200 }
    }));
    expect(spring).toHaveBeenCalledWith(expect.objectContaining({
      fps: 30,
      frame: -5,
      config: { damping: 200 }
    }));
  });
});
