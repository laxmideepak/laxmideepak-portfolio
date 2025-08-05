import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FallbackLocationCard } from '../FallbackLocationCard'

describe('FallbackLocationCard', () => {
  const defaultProps = {
    onRetry: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default state', () => {
    render(<FallbackLocationCard {...defaultProps} />)
    
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Unable to get your current location')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('renders with permission denied error', () => {
    const error = {
      code: 1,
      message: 'User denied geolocation',
      userMessage: 'Location access was denied. Please enable location permissions in your browser settings to use this feature.',
      type: 'denied' as const,
      canRetry: false,
      requiresUserAction: true,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Location access was denied. Please enable location permissions in your browser settings to use this feature.')).toBeInTheDocument()
    expect(screen.getByText('Enable Location')).toBeInTheDocument()
  })

  it('renders with timeout error', () => {
    const error = {
      code: 3,
      message: 'Geolocation request timed out',
      userMessage: 'Location request timed out. Please check your internet connection and try again.',
      type: 'timeout' as const,
      canRetry: true,
      requiresUserAction: false,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Location request timed out. Please check your internet connection and try again.')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('renders with position unavailable error', () => {
    const error = {
      code: 2,
      message: 'Position unavailable',
      userMessage: 'Unable to determine your location. This might be due to poor GPS signal or network issues. Please try again.',
      type: 'unavailable' as const,
      canRetry: true,
      requiresUserAction: false,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Unable to determine your location. This might be due to poor GPS signal or network issues. Please try again.')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('renders with insecure context error', () => {
    const error = {
      code: 0,
      message: 'Geolocation requires a secure context (HTTPS)',
      userMessage: 'Location access requires a secure connection (HTTPS). Please access this site over a secure connection.',
      type: 'insecure' as const,
      canRetry: false,
      requiresUserAction: true,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Location access requires a secure connection (HTTPS). Please access this site over a secure connection.')).toBeInTheDocument()
    expect(screen.getByText('Use HTTPS')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup()
    const onRetry = jest.fn()

    render(<FallbackLocationCard onRetry={onRetry} />)
    
    const retryButton = screen.getByText('Try Again')
    await user.click(retryButton)
    
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('disables retry button when error cannot be retried', () => {
    const error = {
      code: 1,
      message: 'User denied geolocation',
      userMessage: 'Location access was denied. Please enable location permissions in your browser settings to use this feature.',
      type: 'denied' as const,
      canRetry: false,
      requiresUserAction: true,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    const retryButton = screen.getByText('Enable Location')
    expect(retryButton).toBeDisabled()
  })

  it('shows browser guidance for user-resolvable errors', () => {
    const error = {
      code: 1,
      message: 'User denied geolocation',
      userMessage: 'Location access was denied. Please enable location permissions in your browser settings to use this feature.',
      type: 'denied' as const,
      canRetry: false,
      requiresUserAction: true,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    expect(screen.getByText('How to enable location:')).toBeInTheDocument()
    expect(screen.getByText(/Check your browser settings/)).toBeInTheDocument()
  })

  it('does not show browser guidance for non-user-resolvable errors', () => {
    const error = {
      code: 3,
      message: 'Geolocation request timed out',
      userMessage: 'Location request timed out. Please check your internet connection and try again.',
      type: 'timeout' as const,
      canRetry: true,
      requiresUserAction: false,
    }

    render(<FallbackLocationCard {...defaultProps} error={error} />)
    
    expect(screen.queryByText('How to enable location:')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-fallback-card'
    render(<FallbackLocationCard {...defaultProps} className={customClass} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveClass(customClass)
  })

  it('has proper accessibility attributes', () => {
    render(<FallbackLocationCard {...defaultProps} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveAttribute('aria-label', 'Location unavailable')
    expect(card).toHaveAttribute('aria-describedby', 'fallback-location-description')
    
    const descriptionElement = screen.getByText('Unable to get your current location')
    expect(descriptionElement).toHaveAttribute('id', 'fallback-location-description')
  })

  it('has proper button accessibility', () => {
    render(<FallbackLocationCard {...defaultProps} />)
    
    const retryButton = screen.getByText('Try Again')
    expect(retryButton).toHaveAttribute('aria-label', 'Try Again - Retry location request (Ctrl/Cmd + R)')
  })

  it('renders without onRetry prop', () => {
    render(<FallbackLocationCard />)
    
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument()
  })

  it('shows different icons for different error types', () => {
    const deniedError = {
      code: 1,
      message: 'User denied geolocation',
      userMessage: 'Location access was denied.',
      type: 'denied' as const,
      canRetry: false,
      requiresUserAction: true,
    }

    const { rerender } = render(<FallbackLocationCard {...defaultProps} error={deniedError} />)
    
    // Should have Shield icon for denied error
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()

    const timeoutError = {
      code: 3,
      message: 'Geolocation request timed out',
      userMessage: 'Location request timed out.',
      type: 'timeout' as const,
      canRetry: true,
      requiresUserAction: false,
    }

    rerender(<FallbackLocationCard {...defaultProps} error={timeoutError} />)
    
    // Should have Wifi icon for timeout error
    expect(screen.getByText('Location Unavailable')).toBeInTheDocument()
  })

  it('has proper responsive classes', () => {
    render(<FallbackLocationCard {...defaultProps} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveClass('w-full')
    expect(card).toHaveClass('max-w-[300px]')
    expect(card).toHaveClass('md:max-w-[300px]')
  })

  it('has proper hover effects', () => {
    render(<FallbackLocationCard {...defaultProps} />)
    
    const card = screen.getByRole('region')
    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('hover:scale-[1.02]')
  })
}) 