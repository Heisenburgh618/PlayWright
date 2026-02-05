const {test, expect} = require('@playwright/test');
test('First UI Test', async ({browser, page})=>
    {
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //console.log(await page.title());
    await expect(page).toHaveTitle("Practice Page")
});

test('Second UI Test', async ({browser,page})=>
{
await page.goto("https://google.com");
await expect(page).toHaveTitle("Google");
});