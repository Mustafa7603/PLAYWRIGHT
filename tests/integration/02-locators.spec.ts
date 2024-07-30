import { test, expect, Locator } from '@playwright/test'

// test.use({
//   launchOptions: {
//     slowMo: 3000
//   }
// })

test.describe('Playwright Locators', () => {

  test('Playwright locator() API', async ({ page }) => {
    await page.goto('https://techglobal-training.com/')

    // await page.click('#myLocator')

    // let myLocator: Locator;

    // myLocator = page.locator('#myLocator')

    // await myLocator.click()

    await page.locator('#logo').click()

    await page.click('#logo')

    const myLogo = page.locator('#logo')
  })

  test('Playwright - Custom Pseudo Classes', async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    const cards = page.locator('.card')

    await cards.locator(':has-text("HTML Elements")').click()

    // await page.locator('a', { hasText: "HTML Elements"}).click()

    await page.locator('button:has-text("Register")').click()
    await page.locator('button:has-text("Sign in"):visible').highlight()

    const countOfDivs = await page.locator('#radio-button-group > div').count()

    console.log(countOfDivs + ' is the amount of div elements in radio group')

    const javaRadioButton = page.locator('#java_radio')

    const javaParentDiv = page.locator('#radio-button-group > div', { has: javaRadioButton })

    console.log(await javaParentDiv.count() + ' is the real amount we need')

    const noJavaParentDiv = page.locator('#radio-button-group > div', { hasNot: javaRadioButton })

    console.log(await noJavaParentDiv.count() + ' is the real amount we need')
  })

  test('Playwright - Chaining the Locators', async({ page }) => {

    await page.goto('https://techglobal-training.com/frontend')
    await page.locator('a:has-text("HTML Elements")').click()

    const unorderedList = page.locator('#unordered_list')

    const childItem = unorderedList.locator('#unordered_list_item1')
  })

  test('Playwright - Handling multiple elements', async({ page }) => {

    await page.goto('https://techglobal-training.com/frontend')
    await page.locator('a:has-text("HTML Elements")').click()

    const unorderedList = page.locator('#unordered_list > li')

    await unorderedList.first().click()
    await unorderedList.nth(1).click()
    await unorderedList.last().click()

    console.log('SPECIFIC TEST')

    // This will return a failure because Playwright will find more than 1 element which violates the 'strict' mode
    // await unorderedList.click()

    const checkboxGroup = page.locator('#checkbox-button-group input')

    const checkboxCount = await checkboxGroup.count()

    for(let i = 0; i < checkboxCount; i++) {
      await checkboxGroup.nth(i).check()
    }

    const checkboxCount2 = await page.locator('#checkbox-button-group input').all()

    for(const checkbox of checkboxCount2 ) {
      await checkbox.check()
      // await expect(checkbox).toBeVisible()
    }
  })

  test('Playwright - Built-in locators', async({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await page.getByRole('link', { name: 'HTML Elements'}).click()

    await page.getByRole('heading', { name: 'HTML Elements'}).highlight()

    await page.getByRole('button', { name: 'Register'}).click()

    await page.getByPlaceholder('Enter text here').fill('TechGlobal')
  })


  test('Playwright - filter() locator API', async({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')

    // await page.locator('a:has-text("Html elements")').click();
    await page.getByRole('link', { name: 'Html Elements' }).click()

    const testingParagraps = page.locator('p').filter({ hasText: 'testing'})
    await testingParagraps.highlight()

    const languageHeadings = await page.locator('label').count()

    console.log(`Amount of elements with label tag is: ${languageHeadings}`)

    const noneLanguageHeadings = await page.locator('label').filter({ hasNotText: 'Java' }).count()

    console.log(`Amount of elements with label tag is but Java: ${noneLanguageHeadings}`)

    const wrappers = await page.locator('[data-identifier*="a"]').count()

    console.log(`Locaterd wrappers are: ${wrappers}`)

    const uniqueWrapper = await page.locator('[data-identifier*="a"]').filter({ has: page.locator('#java_radio') }).count()

    console.log(`Locaterd wrapper is: ${uniqueWrapper}`)
  })
})
