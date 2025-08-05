// Mock the LazyMapboxMap component before importing LocationCard
jest.mock('../LazyMapboxMap', () => {
  return function MockLazyMapboxMap({ latitude, longitude, zoom, className }: any) {
    return (
      <div 
        data-testid="mapbox-map"
        data-latitude={latitude}
        data-longitude={longitude}
        data-zoom={zoom}
        className={className}
      >
        Mock Map Component
      </div>
    )
  }
})

// Mock the LoadingSpinner component before importing LocationCard
jest.mock('../LoadingSpinner', () => {
  return function MockLoadingSpinner({ message, size, className }: any) {
    return (
      <div 
        data-testid="loading-spinner"
        data-message={message}
        data-size={size}
        className={className}
      >
        {message}
      </div>
    )
  }
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocationCard } from '../LocationCard'

describe('LocationCard', () => {
  const defaultProps = {
    latitude: 32.7767,
    longitude: -96.7970,
    address: 'Dallas, TX, USA',
  }

  it('renders with basic props', () => {
    render(<LocationCard {...defaultProps} />)
    
    expect(screen.getByText('You are here')).toBeInTheDocument()
    expect(screen.getByText('Dallas, TX, USA')).toBeInTheDocument()
    expect(screen.getByTestId('mapbox-map')).toBeInTheDocument()
  })

  it('renders without address', () => {
    render(<LocationCard latitude={32.7767} longitude={-96.7970} />)
    
    expect(screen.getByText('You are here')).toBeInTheDocument()
    expect(screen.getByText('Getting your location...')).toBeInTheDocument()
    expect(screen.getByTestId('mapbox-map')).toBeInTheDocument()
  })

  it('passes correct props to map component', () => {
    render(<LocationCard {...defaultProps} />)
    
    const mapComponent = screen.getByTestId('mapbox-map')
    expect(mapComponent).toHaveAttribute('data-latitude', '32.7767')
    expect(mapComponent).toHaveAttribute('data-longitude', '-96.797')
    expect(mapComponent).toHaveAttribute('data-zoom', '12')
  })

  it('applies custom className', () => {
    const customClass = 'custom-location-card'
    render(<LocationCard {...defaultProps} className={customClass} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveClass(customClass)
  })

  it('has proper accessibility attributes', () => {
    render(<LocationCard {...defaultProps} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveAttribute('aria-label', 'Your current location')
    expect(card).toHaveAttribute('aria-describedby', 'location-address')
    
    const addressElement = screen.getByText('Dallas, TX, USA')
    expect(addressElement).toHaveAttribute('id', 'location-address')
    expect(addressElement).toHaveAttribute('aria-live', 'polite')
  })

  it('has proper map accessibility', () => {
    render(<LocationCard {...defaultProps} />)
    
    const mapContainer = screen.getByRole('img')
    expect(mapContainer).toHaveAttribute('aria-label', 'Interactive map showing your location at coordinates 32.7767, -96.797')
  })

  it('shows loading message when address is null and not loading', () => {
    render(<LocationCard {...defaultProps} address={null} />)
    
    expect(screen.getByText('Getting your location...')).toBeInTheDocument()
  })

  it('handles empty address string', () => {
    render(<LocationCard {...defaultProps} address="" />)
    
    expect(screen.getByText('Getting your location...')).toBeInTheDocument()
  })

  it('handles undefined address', () => {
    render(<LocationCard {...defaultProps} address={undefined} />)
    
    expect(screen.getByText('Getting your location...')).toBeInTheDocument()
  })

  it('responds to theme changes', () => {
    render(<LocationCard {...defaultProps} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveClass('border-2')
    expect(card).toHaveClass('hover:border-blue-200')
    expect(card).toHaveClass('dark:hover:border-blue-800')
  })

  it('has responsive design classes', () => {
    render(<LocationCard {...defaultProps} />)
    
    const card = screen.getByRole('region')
    
    // Desktop layout (≥1280px)
    expect(card).toHaveClass('xl:w-[300px]')
    expect(card).toHaveClass('xl:h-[220px]')
    
    // Tablet layout (<1280px)
    expect(card).toHaveClass('lg:w-full')
    expect(card).toHaveClass('lg:max-w-[400px]')
    
    // Mobile layout (≤640px)
    expect(card).toHaveClass('w-[90%]')
    expect(card).toHaveClass('h-[160px]')
  })

  it('handles missing coordinates gracefully', () => {
    render(<LocationCard latitude={0} longitude={0} />)
    
    expect(screen.getByText('You are here')).toBeInTheDocument()
    expect(screen.getByTestId('mapbox-map')).toBeInTheDocument()
  })
}) 