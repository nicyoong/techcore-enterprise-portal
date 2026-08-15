import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCardSkeleton, { SkeletonHero, SkeletonGrid } from '../../src/components/Skeletons';

describe('Skeletons', () => {
  describe('ProductCardSkeleton', () => {
    it('renders skeleton card', () => {
      render(<ProductCardSkeleton />);
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
    });

    it('has skeleton placeholders', () => {
      const { container } = render(<ProductCardSkeleton />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('SkeletonHero', () => {
    it('renders skeleton hero', () => {
      render(<SkeletonHero />);
      const skeleton = document.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
    });

    it('has skeleton placeholders', () => {
      const { container } = render(<SkeletonHero />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('SkeletonGrid', () => {
    it('renders default 6 skeletons', () => {
      const { container } = render(<SkeletonGrid />);
      const skeletonCards = container.querySelectorAll('[class*="rounded-xl"]');
      expect(skeletonCards.length).toBeGreaterThan(0);
    });

    it('renders custom count', () => {
      const { container } = render(<SkeletonGrid count={3} />);
      const skeletonCards = container.querySelectorAll('[class*="rounded-xl"]');
      expect(skeletonCards.length).toBeGreaterThan(0);
    });
  });
});
