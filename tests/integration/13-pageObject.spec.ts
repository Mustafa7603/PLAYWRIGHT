import { test, expect } from '../../fixtures/page-object-fixture'

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend/project-2')
  })

  test('Test Positive', async ({ loginPage }) => {
    await loginPage.userLogin(process.env.USER_NAME, process.env.USER_PASSWORD)
    await loginPage.loginMessage.waitFor({ state: 'visible' })

    await expect(loginPage.loginMessage).toHaveText('You are logged in')
  })

  test('Test Negative', async ({ loginPage }) => {
    await loginPage.userLogin('error', 'error')
    await loginPage.errorMessage.waitFor({ state: 'visible' })

    await expect(loginPage.errorMessage).toHaveText('Invalid Username entered!')
  })
})
