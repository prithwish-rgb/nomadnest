import { validateItineraryInput, validateDateRange } from '@/lib/validation'

describe('Validation Utils', () => {
  describe('validateItineraryInput', () => {
    it('should validate correct input', () => {
      const validInput = {
        destination: 'Paris',
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        duration: '5',
        interests: ['Culture', 'Food']
      }

      const result = validateItineraryInput(validInput)
      expect(result.success).toBe(true)
    })

    it('should reject empty destination', () => {
      const invalidInput = {
        destination: '',
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        duration: '5',
        interests: ['Culture']
      }

      const result = validateItineraryInput(invalidInput)
      expect(result.success).toBe(false)
    })

    it('should reject empty interests array', () => {
      const invalidInput = {
        destination: 'Paris',
        startDate: '2024-01-01',
        endDate: '2024-01-05',
        duration: '5',
        interests: []
      }

      const result = validateItineraryInput(invalidInput)
      expect(result.success).toBe(false)
    })
  })

  describe('validateDateRange', () => {
    it('should validate correct date range', () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + 1); // tomorrow
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 4); // 5 days total

      const result = validateDateRange(
        startDate.toISOString().slice(0, 10),
        endDate.toISOString().slice(0, 10)
      );
      expect(result.valid).toBe(true);
    })

    it('should reject past start date', () => {
      const startDate = '2020-01-01'
      const endDate = '2024-12-05'

      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('cannot be in the past')
    })

    it('should reject end date before start date', () => {
      const startDate = '2024-12-05'
      const endDate = '2024-12-01'

      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('cannot be before start date')
    })

    it('should reject trips longer than 30 days', () => {
      const startDate = '2024-01-01'
      const endDate = '2024-02-15' // 45 days later

      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('cannot exceed 30 days')
    })
  })
})