import {
  formatGeolocationError,
  isSecureContext,
  getInsecureContextError,
  getBrowserLocationGuidance,
  getRetryGuidance,
  isUserResolvableError,
  getActionButtonText,
  GEOLOCATION_ERROR_CODES,
} from '../geolocation-errors'

describe('geolocation-errors', () => {
  describe('GEOLOCATION_ERROR_CODES', () => {
    it('should have correct error codes', () => {
      expect(GEOLOCATION_ERROR_CODES.PERMISSION_DENIED).toBe(1)
      expect(GEOLOCATION_ERROR_CODES.POSITION_UNAVAILABLE).toBe(2)
      expect(GEOLOCATION_ERROR_CODES.TIMEOUT).toBe(3)
    })
  })

  describe('formatGeolocationError', () => {
    it('should format permission denied error', () => {
      const mockError = {
        code: GEOLOCATION_ERROR_CODES.PERMISSION_DENIED,
        message: 'User denied geolocation',
      }

      const result = formatGeolocationError(mockError)

      expect(result.code).toBe(1)
      expect(result.message).toBe('User denied geolocation')
      expect(result.type).toBe('denied')
      expect(result.userMessage).toContain('Location access was denied')
      expect(result.canRetry).toBe(false)
      expect(result.requiresUserAction).toBe(true)
    })

    it('should format position unavailable error', () => {
      const mockError = {
        code: GEOLOCATION_ERROR_CODES.POSITION_UNAVAILABLE,
        message: 'Position unavailable',
      }

      const result = formatGeolocationError(mockError)

      expect(result.code).toBe(2)
      expect(result.message).toBe('Position unavailable')
      expect(result.type).toBe('unavailable')
      expect(result.userMessage).toContain('Unable to determine your location')
      expect(result.canRetry).toBe(true)
      expect(result.requiresUserAction).toBe(false)
    })

    it('should format timeout error', () => {
      const mockError = {
        code: GEOLOCATION_ERROR_CODES.TIMEOUT,
        message: 'Request timed out',
      }

      const result = formatGeolocationError(mockError)

      expect(result.code).toBe(3)
      expect(result.message).toBe('Request timed out')
      expect(result.type).toBe('timeout')
      expect(result.userMessage).toContain('Location request timed out')
      expect(result.canRetry).toBe(true)
      expect(result.requiresUserAction).toBe(false)
    })

    it('should format unknown error', () => {
      const mockError = {
        code: 999,
        message: 'Unknown error',
      }

      const result = formatGeolocationError(mockError)

      expect(result.code).toBe(999)
      expect(result.message).toBe('Unknown error')
      expect(result.type).toBe('unknown')
      expect(result.userMessage).toContain('An unexpected error occurred')
      expect(result.canRetry).toBe(true)
      expect(result.requiresUserAction).toBe(false)
    })
  })

  describe('isSecureContext', () => {
    it('should return true for secure context', () => {
      Object.defineProperty(window, 'isSecureContext', {
        writable: true,
        value: true,
      })

      expect(isSecureContext()).toBe(true)
    })

    it('should return false for insecure context', () => {
      Object.defineProperty(window, 'isSecureContext', {
        writable: true,
        value: false,
      })

      expect(isSecureContext()).toBe(false)
    })

    it('should handle server-side rendering', () => {
      // Mock window as undefined (server-side)
      const originalWindow = global.window
      // @ts-ignore
      global.window = undefined

      expect(isSecureContext()).toBe(false)

      // Restore window
      global.window = originalWindow
    })
  })

  describe('getInsecureContextError', () => {
    it('should return correct insecure context error', () => {
      const error = getInsecureContextError()

      expect(error.code).toBe(0)
      expect(error.message).toBe('Geolocation requires a secure context (HTTPS)')
      expect(error.userMessage).toContain('Location access requires a secure connection')
      expect(error.type).toBe('insecure')
      expect(error.canRetry).toBe(false)
      expect(error.requiresUserAction).toBe(true)
    })
  })

  describe('getBrowserLocationGuidance', () => {
    beforeEach(() => {
      // Reset navigator.userAgent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: '',
      })
    })

    it('should return Chrome guidance', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      })

      const guidance = getBrowserLocationGuidance()
      expect(guidance).toContain('Chrome: Settings')
    })

    it('should return Firefox guidance', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      })

      const guidance = getBrowserLocationGuidance()
      expect(guidance).toContain('Firefox: Settings')
    })

    it('should return Safari guidance', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      })

      const guidance = getBrowserLocationGuidance()
      expect(guidance).toContain('Safari: Safari')
    })

    it('should return Edge guidance', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
      })

      const guidance = getBrowserLocationGuidance()
      expect(guidance).toContain('Chrome: Settings')
    })

    it('should return generic guidance for unknown browser', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Unknown Browser',
      })

      const guidance = getBrowserLocationGuidance()
      expect(guidance).toBe('Check your browser settings and enable location permissions')
    })

    it('should handle server-side rendering', () => {
      // Mock navigator as undefined (server-side)
      const originalNavigator = global.navigator
      // @ts-ignore
      global.navigator = undefined

      expect(getBrowserLocationGuidance()).toBe('Check your browser settings and enable location permissions')

      // Restore navigator
      global.navigator = originalNavigator
    })
  })

  describe('getRetryGuidance', () => {
    it('should return timeout guidance', () => {
      const error = {
        code: 3,
        message: 'Timeout',
        userMessage: 'Location request timed out',
        type: 'timeout' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      const guidance = getRetryGuidance(error)
      expect(guidance).toContain('GPS signal')
    })

    it('should return unavailable guidance', () => {
      const error = {
        code: 2,
        message: 'Position unavailable',
        userMessage: 'Unable to determine location',
        type: 'unavailable' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      const guidance = getRetryGuidance(error)
      expect(guidance).toContain('refreshing the page')
    })

    it('should return denied guidance', () => {
      const error = {
        code: 1,
        message: 'Permission denied',
        userMessage: 'Location access denied',
        type: 'denied' as const,
        canRetry: false,
        requiresUserAction: true,
      }

      const guidance = getRetryGuidance(error)
      expect(guidance).toContain('enable location permissions')
    })

    it('should return insecure guidance', () => {
      const error = {
        code: 0,
        message: 'Insecure context',
        userMessage: 'Requires HTTPS',
        type: 'insecure' as const,
        canRetry: false,
        requiresUserAction: true,
      }

      const guidance = getRetryGuidance(error)
      expect(guidance).toContain('HTTPS')
    })

    it('should return default guidance for unknown error', () => {
      const error = {
        code: 999,
        message: 'Unknown error',
        userMessage: 'Unknown error',
        type: 'unknown' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      const guidance = getRetryGuidance(error)
      expect(guidance).toContain('refreshing the page')
    })
  })

  describe('isUserResolvableError', () => {
    it('should return true for denied error', () => {
      const error = {
        code: 1,
        message: 'Permission denied',
        userMessage: 'Location access denied',
        type: 'denied' as const,
        canRetry: false,
        requiresUserAction: true,
      }

      expect(isUserResolvableError(error)).toBe(true)
    })

    it('should return true for insecure error', () => {
      const error = {
        code: 0,
        message: 'Insecure context',
        userMessage: 'Requires HTTPS',
        type: 'insecure' as const,
        canRetry: false,
        requiresUserAction: true,
      }

      expect(isUserResolvableError(error)).toBe(true)
    })

    it('should return false for timeout error', () => {
      const error = {
        code: 3,
        message: 'Timeout',
        userMessage: 'Location request timed out',
        type: 'timeout' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      expect(isUserResolvableError(error)).toBe(false)
    })

    it('should return false for unavailable error', () => {
      const error = {
        code: 2,
        message: 'Position unavailable',
        userMessage: 'Unable to determine location',
        type: 'unavailable' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      expect(isUserResolvableError(error)).toBe(false)
    })
  })

  describe('getActionButtonText', () => {
    it('should return correct text for denied error', () => {
      const error = {
        code: 1,
        message: 'Permission denied',
        userMessage: 'Location access denied',
        type: 'denied' as const,
        canRetry: false,
        requiresUserAction: true,
      }

      expect(getActionButtonText(error)).toBe('Enable Location')
    })

    it('should return correct text for insecure error', () => {
      const error = {
        code: 0,
        message: 'Insecure context',
        userMessage: 'Requires HTTPS',
        type: 'insecure' as const,
        canRetry: false,
        requiresUserAction: true,
      }

      expect(getActionButtonText(error)).toBe('Use HTTPS')
    })

    it('should return correct text for timeout error', () => {
      const error = {
        code: 3,
        message: 'Timeout',
        userMessage: 'Location request timed out',
        type: 'timeout' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      expect(getActionButtonText(error)).toBe('Try Again')
    })

    it('should return correct text for unavailable error', () => {
      const error = {
        code: 2,
        message: 'Position unavailable',
        userMessage: 'Unable to determine location',
        type: 'unavailable' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      expect(getActionButtonText(error)).toBe('Try Again')
    })

    it('should return correct text for unknown error', () => {
      const error = {
        code: 999,
        message: 'Unknown error',
        userMessage: 'Unknown error',
        type: 'unknown' as const,
        canRetry: true,
        requiresUserAction: false,
      }

      expect(getActionButtonText(error)).toBe('Try Again')
    })
  })
}) 