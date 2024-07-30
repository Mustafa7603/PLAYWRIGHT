import {test, expect} from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'
import fs from 'fs'
import path from 'path'

test.describe('Download & Upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/frontend')

    await clickLink(page, 'File Download & Upload')
  })

  test('download a File', async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#file_download')
    ])

    // const path = await download.path()
    // console.log(path)

    /**
     * Provide the correct path to save the file
     * const downloadPath = downloads/fileName
     */

    // const donwloadPath = 'downloads/' + download.suggestedFilename()
    const donwloadPath = path.join('downloads', download.suggestedFilename())


    // save the file
    await download.saveAs(donwloadPath)

    const isDownloaded = fs.existsSync(donwloadPath)
    console.log(isDownloaded)

    expect(isDownloaded, { message: 'Test is FAILED'}).toBeTruthy()
  })

  test('Upload a file', async({ page }) => {
    const uploadLink = page.locator('#file_upload')
    const uploadPath = 'downloads/SampleText.txt'

    await uploadLink.setInputFiles(uploadPath)

    // Uploading multiple fiels use array of paths
    // await uploadLink.setInputFiles(['path/file', 'path/file2'])

    await clickButton(page, 'UPLOAD')

    const result = page.locator('#result')

    await expect(result).toHaveText(`You uploaded ${uploadPath.slice(uploadPath.lastIndexOf('/') +1)}`)
  })
})



