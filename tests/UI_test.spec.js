const {test, expect} = require('@playwright/test');
test('First UI Test', async ({browser,page})=> //browser is longer needed as playwright handles it.
    {
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //console.log(await page.title());
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    //console.log(await page.locator("[class*='success']").textContent());
    //await expect(page.locator("[class*='success']")).toContainText("incorrect.");
    console.log(await page.locator("div.card-body a").nth(1).textContent());
    console.log(await page.locator("div.card-body a").last().textContent());
});

test('Second UI Test', async ({page})=>
{
await page.goto("https://google.com");
await expect(page).toHaveTitle("Google");
});

test('UI Assesment Test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("reddy.g0967@gmail.com");
    await page.locator("#userPassword").fill("Hariprasad@18");
    await page.locator("#login").click();
    await page.locator("div.card-body h5 b").first().waitFor();
    const itemTitles = await page.locator("div.card-body h5 b").allTextContents();
    // console.log(await itemTitle.first().textContent());
    // console.log(await itemTitle.nth(3).textContent());
    // await page.waitForLoadState('networkidle'); //this is no longer encoraged.
    console.log(itemTitles);
});

test('Dropdown, Checkboxes & Attributes test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator(".radioButton:nth-child(1)").first().click();
    await expect(page.locator(".radioButton:nth-child(1)").first()).toBeChecked();
    await page.locator("#checkBoxOption1").click();
    await expect(page.locator("#checkBoxOption1")).toBeChecked();
    await page.locator("#checkBoxOption1").uncheck();
    expect(await page.locator("#checkBoxOption1").isChecked()).toBeFalsy();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
    //await page.pause();
});

test.only('Child Window Handling', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const childLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            childLink.click()
        ]
    );
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());
});