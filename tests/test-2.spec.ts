import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.techglobal-training.com/frontend/project-6');
  await page.getByText('Test Case 01 - Todo-App Modal').click();
  await expect(page.getByRole('navigation')).toContainText('My Tasks');
});