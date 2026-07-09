const { test, expect } = require('@playwright/test');

test('verify calendar function', async ({ browser }) => {
    const date="9";
    const month="9"
    const year="2002"
    const expectedList = [month,date,year];
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const offerLink = page.locator(".cart-header-navlink[href='#/offers']");

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        offerLink.click()
    ]);
//console.log(await page.title);
await expect(page).toHaveTitle('GreenKart - veg and fruits kart');

    //const selectedYear = '2002';
    await childPage.locator('.react-date-picker__inputGroup').click();
    await childPage.locator('.react-calendar__navigation__label').click();
    await childPage.locator('.react-calendar__navigation__label').click();
    const yearbackarrow=await childPage.locator("button[class='react-calendar__navigation__arrow react-calendar__navigation__prev-button']");
    //await childPage.locator('class="react-calendar__navigation__arrow').click();
     //await childPage.locator('.react-calendar__decade-view');
    await yearbackarrow.click();
    await yearbackarrow.click();
    const yearButtons = childPage.locator('.react-calendar__decade-view button');
    const yearCount = await yearButtons.count();
    for (let i = 0; i < yearCount; i++) {
        const yearText = await yearButtons.nth(i).innerText();
        if (yearText.trim() === year) {
            await yearButtons.nth(i).click();
            break;
        }
    }

    await childPage.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    
    
    //const datelist=await childPage.locator('.react-calendar__month-view__days').click();
     // await childPage.locator("//abbr[text()='9']").click();
     await childPage.locator("//abbr[text()='"+date+"']").click();
 
    const inputs =  childPage.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }




});
