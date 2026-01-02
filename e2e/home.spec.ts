import {describe, expect, test} from 'vitest'
import {page} from 'vitest/browser'

describe('Home Page E2E', () => {
  test.beforeEach(async () => {
    console.log('PAGE KEYS:', Object.keys(page))
    window.history.pushState({}, '/')
  })

  test('should load home page successfully', async () => {
    const logo = page.getByAltText('logo')
    await expect.element(logo).toBeVisible()
  })

  test('should display the React logo with animation', async () => {
    const logo = page.getByAltText('logo')
    await expect.element(logo).toBeVisible()

    // Check if the logo has the spin animation class
    const logoElement = await logo.element()
    const className = await logoElement.getAttribute('class')
    expect(className).toContain('animate-[spin_20s_linear_infinite]')
  })

  test('should display edit instruction text', async () => {
    const editText = page.getByText(/Edit.*and save to reload/)
    await expect.element(editText).toBeVisible()
  })

  test('should have working external links', async () => {
    // Check React link
    const reactLink = page.getByRole('link', { name: /Learn React/i })
    await expect.element(reactLink).toBeVisible()
    await expect.element(reactLink).toHaveAttribute('href', 'https://reactjs.org')
    await expect.element(reactLink).toHaveAttribute('target', '_blank')

    // Check TanStack link
    const tanstackLink = page.getByRole('link', { name: /Learn TanStack/i })
    await expect.element(tanstackLink).toBeVisible()
    await expect.element(tanstackLink).toHaveAttribute('href', 'https://tanstack.com')
    await expect.element(tanstackLink).toHaveAttribute('target', '_blank')
  })

  test('should have proper header styling', async () => {
    const header = page.getByRole('banner')
    await expect.element(header).toBeVisible()

    const headerElement = await header.element()
    const className = await headerElement.getAttribute('class')
    expect(className).toContain('bg-[#282c34]')
    expect(className).toContain('min-h-screen')
  })
})
