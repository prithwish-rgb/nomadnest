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
    const format = (d: Date) => d.toISOString().slice(0, 10)

    it('should validate correct date range', () => {
      const start = new Date()
      start.setDate(start.getDate() + 10)
      const end = new Date(start)
      end.setDate(start.getDate() + 4)
      const startDate = format(start)
      const endDate = format(end)
      
      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(true)
    })

    it('should reject past start date', () => {
      const start = new Date()
      start.setDate(start.getDate() - 10) // past
      const end = new Date()
      end.setDate(end.getDate() + 5) // future
      const startDate = format(start)
      const endDate = format(end)
      
      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('cannot be in the past')
    })

    it('should reject end date before start date', () => {
      const start = new Date()
      start.setDate(start.getDate() + 10)
      const end = new Date(start)
      end.setDate(start.getDate() - 4)
      const startDate = format(start)
      const endDate = format(end)
      
      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('cannot be before start date')
    })

    it('should reject trips longer than 30 days', () => {
      const start = new Date()
      start.setDate(start.getDate() + 10)
      const end = new Date(start)
      end.setDate(start.getDate() + 45) // 45 days later
      const startDate = format(start)
      const endDate = format(end)
      
      const result = validateDateRange(startDate, endDate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('cannot exceed 30 days')
    })
  })
})