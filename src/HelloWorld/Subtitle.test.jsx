import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Subtitle } from './Subtitle';
import * as remotion from 'remotion';

// Mock di Remotion
vi.mock('remotion', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useCurrentFrame: vi.fn(),
  };
});

describe('Subtitle', () => {
  it('dovrebbe avere opacità 0 al frame 0', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    const { container } = render(<Subtitle />);
    const div = container.firstChild;
    expect(div.style.opacity).toBe('0');
  });

  it('dovrebbe avere opacità 0.5 al frame 15', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(15);
    const { container } = render(<Subtitle />);
    const div = container.firstChild;
    expect(div.style.opacity).toBe('0.5');
  });

  it('dovrebbe avere opacità 1 al frame 30', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(30);
    const { container } = render(<Subtitle />);
    const div = container.firstChild;
    expect(div.style.opacity).toBe('1');
  });

  it('dovrebbe avere opacità 1 al frame 60 (oltre il range di interpolazione)', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(60);
    const { container } = render(<Subtitle />);
    const div = container.firstChild;
    expect(div.style.opacity).toBe('1');
  });

  it('dovrebbe avere opacità 0 al frame -10 (sotto il range di interpolazione)', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(-10);
    const { container } = render(<Subtitle />);
    const div = container.firstChild;
    expect(div.style.opacity).toBe('0');
  });
});
