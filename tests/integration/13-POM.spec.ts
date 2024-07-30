import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend/project-2')
    loginPage = new LoginPage(page)
  })

  test('Test Positive', async () => {
    await loginPage.userLogin(process.env.USER_NAME, process.env.USER_PASSWORD)
    await loginPage.loginMessage.waitFor({ state: 'visible' })

    await expect(loginPage.loginMessage).toHaveText('You are logged in')
  })

  test('Test Negative', async () => {
    await loginPage.userLogin('error', 'error')
    await loginPage.errorMessage.waitFor({ state: 'visible' })

    await expect(loginPage.errorMessage).toHaveText('Invalid Username entered!')
  })
})