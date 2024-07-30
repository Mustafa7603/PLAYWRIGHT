import test from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Element Properties', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'HTML Elements')
  })

  test('Getting the Element Properties', async ({ page }) => {

    const headings = page.locator('[data-identifier="Headings"]')

    // Will always return an array
    const allInnerText = await headings.allInnerTexts()

    // Returns a single string, which already has the child elements
    const innerText = await headings.innerText()

    // Returns the element of inner elements
    const innerHtml = await headings.innerHTML()

    console.log(allInnerText)
    console.log(innerText)
    console.log(innerHtml)

    const textContent = await headings.textContent()
    console.log(textContent)

    const innerElemenets = headings.locator('h4')
    console.log(await innerElemenets.count() + ' count of web elements')

    const attr = await headings.getAttribute('data-identifier')
    console.log(attr)

    const companyDropdown = page.locator('#company_dropdown1')
    await companyDropdown.selectOption({ index: 2 })

    const valueOfDropdown = await companyDropdown.inputValue()

    console.log(valueOfDropdown)
  })

  test('Executing JavaScript code in Playwright', async({ page }) => {

    const title = await page.title()
    console.log(title)

    const result = await page.evaluate(() => {
      return document.title
    })

    console.log(result)

    const href = await page.evaluate(() => {
      return document.location.href
    })
    console.log(href)

    const element = page.locator('#main_heading')

    const getColor = await element.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('color')
    })


    console.log(getColor)
  })
})