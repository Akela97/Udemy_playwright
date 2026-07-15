const { test, expect } = require('@playwright/test');

test("hide elment",async({page})=>  {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#hide-textbox').click();

    await expect(page.locator('#displayed-text')).toBeHidden();

    //page.on('dialog',dailog=>dailog.accept);

    page.on('dialog', dialog => dialog.accept());

    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').hover();
 const iframe=page.frameLocator('#courses-iframe');
 await iframe.locator('li a[href="lifetime-access"]:visible').click();
 




})


