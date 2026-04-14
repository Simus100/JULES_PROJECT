import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Arc } from './Arc';
import '@testing-library/jest-dom';

vi.mock('remotion', () => ({
  useVideoConfig: vi.fn(() => ({ width: 1920, height: 1080 })),
  random: vi.fn(() => 0.5),
}));

describe('Arc component', () => {
  it('renders SVG with correct viewBox and transform', () => {
    const { container } = render(
      <Arc progress={0.5} rotation={90} rotateProgress={1} />
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 1920 1080');
    expect(svgElement).toHaveStyle({ transform: 'rotate(90deg)' });
  });

  it('calculates strokeDashoffset based on progress', () => {
    // Math.PI * 2 * Math.sqrt((135 * 135 + 300 * 300) / 2)
    // ≈ 1489.15
    const progress = 0.5;
    const { container } = render(
      <Arc progress={progress} rotation={90} rotateProgress={1} />
    );

    const ellipseElement = container.querySelector('ellipse');
    expect(ellipseElement).toBeInTheDocument();

    const arcLength = Math.PI * 2 * Math.sqrt((135 * 135 + 300 * 300) / 2);
    const expectedOffset = String(arcLength - arcLength * progress);

    expect(ellipseElement).toHaveAttribute('stroke-dashoffset', expectedOffset);
    expect(ellipseElement).toHaveAttribute('stroke-dasharray', String(arcLength));
  });

  it('renders defs with gradient id', () => {
    const { container } = render(
      <Arc progress={0.5} rotation={90} rotateProgress={1} />
    );

    const linearGradient = container.querySelector('linearGradient');
    expect(linearGradient).toBeInTheDocument();
    expect(linearGradient).toHaveAttribute('id', '0.5'); // Mocked random returns 0.5

    const ellipseElement = container.querySelector('ellipse');
    expect(ellipseElement).toHaveAttribute('stroke', 'url(#0.5)');
  });
});
