import { test, expect } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('Dialogs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Alerts')
  })

  test('Handing Dialogs', async ({ page }) => {
    // await clickButton(page, "Confirmation alert");
    // await clickButton(page, "Prompt alert");

    // page.on("dialog", async (dialog) => {
    //   const type = dialog.type();
    //   const message = dialog.message();

    //   await dialog.accept();

    //   console.log(type + " MESSAGE 1");
    //   console.log(message + " MESSAGE 2");
    // });

    // await clickButton(page, "Warning alert");

    // await page.pause()


    // page.on("dialog", async (dialog) => {
    //   const type = dialog.type();
    //   const message = dialog.message();

    //   await dialog.dismiss();

    //   console.log(type + " MESSAGE 1");
    //   console.log(message + " MESSAGE 2");
    // });

    // await clickButton(page, "Confirmation alert");

    // await page.pause()

    // page.on("dialog", async (dialog) => {
    //   const type = dialog.type();
    //   const message = dialog.message();

    //   if (type === "alert") {
    //     await dialog.accept();
    //   } else if (type === "confirm") {
    //     await dialog.dismiss();
    //   } else {
    //     await dialog.accept("My Message");
    //   }

    //   console.log(message);
    // });

    // await clickButton(page, "Warning alert");
    // await clickButton(page, "Confirmation alert");
    // await clickButton(page, "Prompt alert");

    page.once('dialog', async (dialog) => {
      await dialog.accept()
      const message = dialog.message()

      console.log(message + ' THIS IS THE FIRST DIALOG')
    })

    await clickButton(page, 'Warning alert')

    page.once('dialog', async (dialog) => {
      await dialog.dismiss()
      const message = dialog.message()

      console.log(message + ' THIS IS THE SECOND DIALOG')
    })

    await clickButton(page, 'Confirmation alert')

    page.once('dialog', async (dialog) => {
      await dialog.accept('My Message')

      console.log(dialog.message() + ' THIS IS THE THIRD DIALOG')
    })

    await clickButton(page, 'Prompt alert')
  })
})
