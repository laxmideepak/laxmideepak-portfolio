import { renderHook, act, waitFor } from '@testing-library/react'
import { useGeolocation } from '../useGeolocation'

// Mock the geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

// Mock the permissions API
const mockPermissions = {
  query: jest.fn(),
}

// Mock navigator.geolocation
Object.defineProperty(navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

// Mock navigator.permissions
Object.defineProperty(navigator, 'permissions', {
  value: mockPermissions,
  writable: true,
})

// Mock window.isSecureContext
Object.defineProperty(window, 'isSecureContext', {
  writable: true,
  value: true,
})

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Reset mocks
    mockGeolocation.getCurrentPosition.mockReset()
    mockGeolocation.watchPosition.mockReset()
    mockGeolocation.clearWatch.mockReset()
    mockPermissions.query.mockReset()
    
    // Default mock implementations
    mockPermissions.query.mockResolvedValue({ state: 'granted' })
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useGeolocation())

      expect(result.current.position).toBeNull()
      expect(result.current.error).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.permissionStatus).toBeNull()
    })
  })

  describe('permission handling', () => {
    it('should request permission successfully', async () => {
      mockPermissions.query.mockResolvedValue({ state: 'granted' })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        const status = await result.current.requestPermission()
        expect(status).toBe('granted')
      })

      expect(result.current.permissionStatus).toBe('granted')
      expect(result.current.error).toBeNull()
    })

    it('should handle permission denied', async () => {
      mockPermissions.query.mockResolvedValue({ state: 'denied' })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        const status = await result.current.requestPermission()
        expect(status).toBe('denied')
      })

      expect(result.current.permissionStatus).toBe('denied')
    })

    it('should handle permission query error', async () => {
      mockPermissions.query.mockRejectedValue(new Error('Permission query failed'))

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        try {
          await result.current.requestPermission()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      expect(result.current.error).toBeDefined()
    })
  })

  describe('getCurrentPosition', () => {
    it('should get current position successfully', async () => {
      const mockPosition = {
        coords: {
          latitude: 32.7767,
          longitude: -96.7970,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success(mockPosition)
      })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        const position = await result.current.getCurrentPosition()
        expect(position).toEqual(mockPosition)
      })

      expect(result.current.position).toEqual(mockPosition)
      expect(result.current.error).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('should handle geolocation error', async () => {
      const mockError = {
        code: 1, // PERMISSION_DENIED
        message: 'User denied geolocation',
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError)
      })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        try {
          await result.current.getCurrentPosition()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      await waitFor(() => {
        expect(result.current.error).toBeDefined()
        expect(result.current.error?.type).toBe('denied')
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('should handle timeout error', async () => {
      const mockError = {
        code: 3, // TIMEOUT
        message: 'Geolocation request timed out',
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError)
      })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        try {
          await result.current.getCurrentPosition()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      await waitFor(() => {
        expect(result.current.error).toBeDefined()
        expect(result.current.error?.type).toBe('timeout')
        expect(result.current.isLoading).toBe(false)
      })
    })
  })

  describe('watchPosition', () => {
    it('should start watching position', () => {
      const mockWatchId = 123
      mockGeolocation.watchPosition.mockReturnValue(mockWatchId)

      const { result } = renderHook(() => useGeolocation())

      act(() => {
        const watchId = result.current.watchPosition(() => {})
        expect(watchId).toBe(mockWatchId)
      })

      expect(mockGeolocation.watchPosition).toHaveBeenCalled()
    })

    it('should clear watch position', () => {
      const { result } = renderHook(() => useGeolocation())

      act(() => {
        result.current.clearWatch(123)
      })

      expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(123)
    })
  })

  describe('error handling', () => {
    it('should format permission denied error correctly', async () => {
      const mockError = {
        code: 1, // PERMISSION_DENIED
        message: 'User denied geolocation',
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError)
      })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        try {
          await result.current.getCurrentPosition()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      await waitFor(() => {
        expect(result.current.error?.type).toBe('denied')
        expect(result.current.error?.userMessage).toContain('Location access was denied')
        expect(result.current.error?.canRetry).toBe(false)
        expect(result.current.error?.requiresUserAction).toBe(true)
      })
    })

    it('should format position unavailable error correctly', async () => {
      const mockError = {
        code: 2, // POSITION_UNAVAILABLE
        message: 'Position unavailable',
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError)
      })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        try {
          await result.current.getCurrentPosition()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      await waitFor(() => {
        expect(result.current.error?.type).toBe('unavailable')
        expect(result.current.error?.userMessage).toContain('Unable to determine your location')
        expect(result.current.error?.canRetry).toBe(true)
        expect(result.current.error?.requiresUserAction).toBe(false)
      })
    })

    it('should format timeout error correctly', async () => {
      const mockError = {
        code: 3, // TIMEOUT
        message: 'Geolocation request timed out',
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError)
      })

      const { result } = renderHook(() => useGeolocation())

      await act(async () => {
        try {
          await result.current.getCurrentPosition()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      await waitFor(() => {
        expect(result.current.error?.type).toBe('timeout')
        expect(result.current.error?.userMessage).toContain('Location request timed out')
        expect(result.current.error?.canRetry).toBe(true)
        expect(result.current.error?.requiresUserAction).toBe(false)
      })
    })
  })
}) 