import { Page } from '@playwright/test'

/**
 * Method to click on the button depending on its visible text.
 * 
 * @param page 
 * @param buttonText 
 */
async function clickButton(page: Page, buttonText: string) {
  await page.getByRole('button', { name: buttonText }).click()
}

/**
 * Method to click on the link depending on its visible text.
 * 
 * @param page 
 * @param buttonText 
 */
async function clickLink(page: Page, linkText: string) {
  await page.getByRole('link', { name: linkText }).click()
}

export { clickButton, clickLink }