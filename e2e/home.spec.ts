import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main elements are present
    await expect(page.getByRole('heading', { name: 'NomadNest' })).toBeVisible();
    await expect(page.getByText('Plan your next adventure with AI magic')).toBeVisible();
    
    // Check if form elements are present
    await expect(page.getByPlaceholder('Where do you want to go?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate' })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/');
    
    // Try to generate without filling form
    await page.getByRole('button', { name: 'Generate' }).click();
    
    // Should show error toast
    await expect(page.getByText('Please fill in all fields')).toBeVisible();
  });

  test('should fill form and generate itinerary', async ({ page }) => {
    await page.goto('/');
    
    // Fill the form
    await page.getByPlaceholder('Where do you want to go?').fill('Paris');
    await page.getByLabel('Start date').fill('2024-12-01');
    await page.getByLabel('End date').fill('2024-12-05');
    
    // Select interests
    await page.getByText('Culture').click();
    await page.getByText('Food').click();
    
    // Generate itinerary
    await page.getByRole('button', { name: 'Generate' }).click();
    
    // Should show loading state
    await expect(page.getByText('Generating...')).toBeVisible();
    
    // Should eventually show itinerary (or fallback)
    await expect(page.getByText(/Day 1/)).toBeVisible({ timeout: 10000 });
  });

  test('should reset form', async ({ page }) => {
    await page.goto('/');
    
    // Fill some data
    await page.getByPlaceholder('Where do you want to go?').fill('Paris');
    await page.getByText('Culture').click();
    
    // Reset form
    await page.getByRole('button', { name: 'Reset' }).click();
    
    // Check if form is cleared
    await expect(page.getByPlaceholder('Where do you want to go?')).toHaveValue('');
    await expect(page.getByText('Culture')).not.toHaveClass(/bg-violet-100/);
  });

  test('should navigate to other pages', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Explore
    await page.getByRole('link', { name: 'Explore' }).click();
    await expect(page).toHaveURL('/explore');
    
    // Navigate to About
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    
    // Navigate to Contact
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
  });
}); 