import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly inputBox: Locator
  readonly todoItems: Locator
  readonly modalHeader: Locator
  readonly searchbox: Locator
  readonly addbttn: Locator
  readonly noItemsfound: Locator
  readonly checkComplete: Locator
  readonly checkedItemremove: Locator
  readonly errorMessage: Locator

  constructor(page: Page)  {
    super(page)
    this.inputBox = page.getByPlaceholder('New todo')
    this.todoItems = page.locator('.todo-item:not(.has-text-danger)')
    this.modalHeader = page.getByRole('navigation')
    this.searchbox = page.getByPlaceholder('Type to search')
    this.addbttn = page.getByRole('button', { name: 'ADD' })
    this.noItemsfound = page.locator('.has-text-danger')
    this.checkComplete = page.locator('.panel-icon:not(.has-text-danger)')
    this.checkedItemremove = page.locator('#clear')
    this.errorMessage = page.locator('.is-danger')
    
  }

  async goto() {
    await this.page.goto('https://www.techglobal-training.com/frontend/project-6')
  }

  async addTodo(text: string) {
    await this.inputBox.fill(text)
    await this.inputBox.press('Enter')
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text })
    await todo.hover()

    await todo.locator('.destroy').click()
  }

  async removeAll() {

    while((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover()
      await this.todoItems.locator('.destroy').first().click()
    }
  }
}