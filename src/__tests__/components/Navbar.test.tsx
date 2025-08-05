import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Explore')).toBeInTheDocument()
    expect(screen.getByText('Saved')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders login button when user is not authenticated', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('renders logo with correct link', () => {
    render(<Navbar />)
    
    const logoLink = screen.getByRole('link', { name: /nomadnest/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })
}) 