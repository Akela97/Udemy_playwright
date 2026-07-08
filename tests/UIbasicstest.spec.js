//import playywright
const {test, expect} =require('@playwright/test');

//synatax for test case

test('browser test case', async ({browser}) => 
    {
 // fresh browser context
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('learnin');
  await page.locator('[id="signInBtn"]').click();
console.log(await page.locator("[style*='block']").textContent());
await expect(await page.locator("[style*='block']")).toContainText('Incorrect username/password');

});


test('page test case', async ({page}) => 
    {

const username = page.locator('#username');
const password = page.locator('#password');
const signInBtn = page.locator('#signInBtn');
const cardTitles = page.locator('.card-body a');
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

  await username.fill('rahulshettyacademy');
  await password.fill('learnin');
  await signInBtn.click('Learning@830$3mK2');
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');
//fill funtioon is used to fill the text box with the value provided in the parameter.
//fill function will clear the text box and then fill the value provided in the parameter.
await username.fill(" ");
await username.fill("rahulshettyacademy");
await password.fill(" ");
await password.fill("Learning@830$3mK2");
await signInBtn.click();
console.log(await page.title());
await expect(page).toHaveTitle('ProtoCommerce');

console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(2).textContent());
console.log(await cardTitles.allTextContents());


});

test('Dropdown/popup controls', async ({page}) =>{

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  const dropdown =  page.locator('select.form-control');
  await dropdown.selectOption('consult');
await page.locator('.radiotextsty').last().click();
await page.locator('#okayBtn').click();
await expect(page.locator('.radiotextsty').last()).toBeChecked();
const agreeCheckBox = page.locator('#terms');
//await agreeCheckBox.click();
await agreeCheckBox.check();
await expect(agreeCheckBox).toBeChecked();




 // await page.pause();

});

test('child window controls', async ({browser}) =>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const childPage = await page.locator('[target="_blank"]').first();

const [childWindow] = await Promise.all([
  context.waitForEvent('page'),
  childPage.click()
]);

const text=await childWindow.locator('.red').textContent();
const arraytext=text.split('@');
const admin=arraytext[1].split(' ')[0];
console.log(admin);
await page.locator('#username').type(admin);

await page.pause();




});