import { type Locator, type Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly logo: Locator
  readonly testingDropdown: Locator
  readonly exercisesDropdown: Locator
  readonly navigationDropdown: Locator
  readonly heading: Locator

  constructor(page: Page) {
    this.page = page
    this.logo = page.locator('#logo')
    this.testingDropdown = page.locator('#dropdown-testing')
    this.exercisesDropdown = page.locator('#dropdown-exercises')
    this.navigationDropdown = page.locator('#dropdown-menu')
    this.heading = page.locator('#main_heading')
  }

  async selectDropdownOption(option: string): Promise<void> {
    await this.navigationDropdown.locator(`a:has-text("${option}")`).click()
  }
}
