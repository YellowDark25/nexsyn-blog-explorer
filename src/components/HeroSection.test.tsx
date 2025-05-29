import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import React from 'react';

describe('HeroSection', () => {
  it('renderiza o título corretamente', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Seu negócio/i)).toBeInTheDocument();
  });
}); 