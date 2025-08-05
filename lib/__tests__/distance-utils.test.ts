import {
  calculateDistance,
  calculateDistanceFromDallas,
  isUserFarFromDallas,
  formatDistanceFromDallas,
  getDistanceCategory,
  getDistanceMessage,
  getCTAText,
  getCTAVariant,
  DALLAS_COORDINATES,
  REMOTE_CONNECTION_THRESHOLD_KM,
} from '../distance-utils'

describe('distance-utils', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      // Dallas to New York (approximately 2200 km)
      const distance = calculateDistance(32.7767, -96.7970, 40.7128, -74.0060)
      expect(distance).toBeCloseTo(2200, -2) // Within 100km accuracy
    })

    it('should calculate distance between same point as zero', () => {
      const distance = calculateDistance(32.7767, -96.7970, 32.7767, -96.7970)
      expect(distance).toBeCloseTo(0, 0)
    })

    it('should calculate distance between antipodal points', () => {
      // Dallas to its antipode (approximately 20000 km)
      const distance = calculateDistance(32.7767, -96.7970, -32.7767, 83.2030)
      expect(distance).toBeCloseTo(20000, -2) // Within 100km accuracy
    })

    it('should handle negative coordinates', () => {
      const distance = calculateDistance(-32.7767, -96.7970, 32.7767, -96.7970)
      expect(distance).toBeGreaterThan(0)
    })
  })

  describe('calculateDistanceFromDallas', () => {
    it('should calculate distance from Dallas correctly', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const distance = calculateDistanceFromDallas(userCoords)
      expect(distance).toBeCloseTo(2200, -2) // Within 100km accuracy
    })

    it('should return zero for Dallas coordinates', () => {
      const userCoords = { latitude: DALLAS_COORDINATES.latitude, longitude: DALLAS_COORDINATES.longitude }
      const distance = calculateDistanceFromDallas(userCoords)
      expect(distance).toBeCloseTo(0, 0)
    })

    it('should handle coordinates near Dallas', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const distance = calculateDistanceFromDallas(userCoords)
      expect(distance).toBeCloseTo(50, -1) // Within 10km accuracy
    })
  })

  describe('isUserFarFromDallas', () => {
    it('should return true for users far from Dallas', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const isFar = isUserFarFromDallas(userCoords)
      expect(isFar).toBe(true)
    })

    it('should return false for users near Dallas', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const isFar = isUserFarFromDallas(userCoords)
      expect(isFar).toBe(false)
    })

    it('should return false for users in Dallas', () => {
      const userCoords = { latitude: DALLAS_COORDINATES.latitude, longitude: DALLAS_COORDINATES.longitude }
      const isFar = isUserFarFromDallas(userCoords)
      expect(isFar).toBe(false)
    })

    it('should use the correct threshold', () => {
      expect(REMOTE_CONNECTION_THRESHOLD_KM).toBe(50)
    })
  })

  describe('formatDistanceFromDallas', () => {
    it('should format distance in meters for short distances', () => {
      const userCoords = { latitude: 32.7767, longitude: -96.7970 } // Same as Dallas
      const formatted = formatDistanceFromDallas(userCoords)
      expect(formatted).toBe('0m from Dallas')
    })

    it('should format distance in kilometers for medium distances', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const formatted = formatDistanceFromDallas(userCoords)
      expect(formatted).toMatch(/^\d+km from Dallas$/)
    })

    it('should format distance in kilometers for long distances', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const formatted = formatDistanceFromDallas(userCoords)
      expect(formatted).toMatch(/^\d+km from Dallas$/)
    })
  })

  describe('getDistanceCategory', () => {
    it('should return local for distances <= 10km', () => {
      const userCoords = { latitude: 32.7767, longitude: -96.7970 } // Dallas
      const category = getDistanceCategory(userCoords)
      expect(category).toBe('local')
    })

    it('should return nearby for distances <= 50km', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const category = getDistanceCategory(userCoords)
      expect(category).toBe('nearby')
    })

    it('should return remote for distances > 50km', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const category = getDistanceCategory(userCoords)
      expect(category).toBe('remote')
    })
  })

  describe('getDistanceMessage', () => {
    it('should return local message for local users', () => {
      const userCoords = { latitude: 32.7767, longitude: -96.7970 } // Dallas
      const message = getDistanceMessage(userCoords)
      expect(message).toBe("You're in the Dallas area! Let's meet up! 🤝")
    })

    it('should return nearby message for nearby users', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const message = getDistanceMessage(userCoords)
      expect(message).toBe("You're nearby! We could meet halfway! 🚗")
    })

    it('should return remote message for remote users', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const message = getDistanceMessage(userCoords)
      expect(message).toBe("👋 Let's connect remotely!")
    })
  })

  describe('getCTAText', () => {
    it('should return local CTA for local users', () => {
      const userCoords = { latitude: 32.7767, longitude: -96.7970 } // Dallas
      const ctaText = getCTAText(userCoords)
      expect(ctaText).toBe('Meet in Dallas')
    })

    it('should return nearby CTA for nearby users', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const ctaText = getCTAText(userCoords)
      expect(ctaText).toBe('Meet Halfway')
    })

    it('should return remote CTA for remote users', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const ctaText = getCTAText(userCoords)
      expect(ctaText).toBe('Connect Remotely')
    })
  })

  describe('getCTAVariant', () => {
    it('should return default variant for local users', () => {
      const userCoords = { latitude: 32.7767, longitude: -96.7970 } // Dallas
      const variant = getCTAVariant(userCoords)
      expect(variant).toBe('default')
    })

    it('should return secondary variant for nearby users', () => {
      // Fort Worth coordinates (about 50km from Dallas)
      const userCoords = { latitude: 32.7555, longitude: -97.3308 }
      const variant = getCTAVariant(userCoords)
      expect(variant).toBe('secondary')
    })

    it('should return outline variant for remote users', () => {
      // New York coordinates
      const userCoords = { latitude: 40.7128, longitude: -74.0060 }
      const variant = getCTAVariant(userCoords)
      expect(variant).toBe('outline')
    })
  })

  describe('DALLAS_COORDINATES', () => {
    it('should have correct Dallas coordinates', () => {
      expect(DALLAS_COORDINATES.latitude).toBe(32.7767)
      expect(DALLAS_COORDINATES.longitude).toBe(-96.7970)
    })
  })

  describe('edge cases', () => {
    it('should handle coordinates at the equator', () => {
      const distance = calculateDistance(0, 0, 0, 1)
      expect(distance).toBeGreaterThan(0)
    })

    it('should handle coordinates at the poles', () => {
      const distance = calculateDistance(90, 0, 89, 0)
      expect(distance).toBeGreaterThan(0)
    })

    it('should handle very small distances', () => {
      const distance = calculateDistance(32.7767, -96.7970, 32.7768, -96.7971)
      expect(distance).toBeGreaterThan(0)
      expect(distance).toBeLessThan(1) // Should be less than 1km
    })

    it('should handle very large distances', () => {
      const distance = calculateDistance(32.7767, -96.7970, -32.7767, 83.2030)
      expect(distance).toBeGreaterThan(10000) // Should be more than 10,000km
    })
  })
}) 