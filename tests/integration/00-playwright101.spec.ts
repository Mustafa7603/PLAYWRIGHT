import { test, chromium } from '@playwright/test'

test.describe('Playwright 101', async () => {
  // This below 'test' function will trigger the test runner.
  test('Playwright 101 - Test Case', () => {
    console.log('Tech Global') 
    // Tests to be executed.
  })

  // test("Playwright 101 - Test Case 2", ({ page }) => {});

  // Marks a function as asynchronous using 'async' keyword
  // meaning it might take some time to complete
  test('Playwright 101 - Test Case 3', async ({ page }) => {
    // The await keyword pauses function execution untill a Promiise is resolved,
    // ensuring code runs only after the Promise is fulfilled or rejected.
    await page.goto('https://techglobal-training.com')
  })

  // Imagine this is any BDD keywrod (Given, When, Then)
  // Given('Playwright 101 - Cucumber Syntax', async() => {
  test('Playwright 101 - Cucumber Syntax', async() => {

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://techglobal-training.com')

    await page.close()
  })

  test('Playwright 101 - Browser Fixture', async({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://techglobal-training.com')

    await page.close()
  })

  test('Playwright 101 - Context Fixture', async({ context }) => {
    const page = await context.newPage()

    await page.goto('https://techglobal-training.com')

    await page.close()
  })
})