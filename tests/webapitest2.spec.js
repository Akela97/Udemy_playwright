const{expect,test}=require('@playwright/test');
let webContext;


test.beforeAll(async({browser})=>{
   const context =await browser.newContext();
    const page=await context.newPage()

    const username="sn2akela@gmai.com";
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(username);
    await page.locator('#userPassword').fill('Test@12345');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    context.storageState({path:'state.json'})
    webContext=await browser.newContext({storageState:'state.json'})





})


test('Verify login functionality', async() => {
   
   const page=await webContext.newPage();
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.title();
  // console.log(await page.title());
await expect(page).toHaveTitle("Let's Shop");
await page.waitForLoadState('networkidle');
await page.locator('.card-body b').first().waitFor();

  const productlist =await page.locator('.card-body');
  const count=await productlist.count();
  const productname='iphone 13 pro';

  for(let i=0;i<count;i++)
    {
        //await productlist.nth(i).locator("text='Add To Cart'").click();
if(await productlist.nth(i).locator('b').textContent()===productname)
    {
        await productlist.nth(i).locator("text='Add To Cart'").click();
        break;
  }}

  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.locator('div li').first().waitFor();
 const bool= await page.locator(`h3:has-text("${productname}")`).isVisible();
 expect(bool).toBeTruthy();

await page.locator('.totalRow [type="button"]').click();
//expect(await page.locator('.mt-5 [type="text"]').first()).toHaveText(username);

await page.locator('[placeholder="Select Country"]').pressSequentially('ind');
await page.locator('.list-group').waitFor();
const country = await page.locator('.list-group [type="button"]');
const countryCount = await country.count();

for(let i=0;i<countryCount;i++){
    const text=await country.nth(i).textContent();
    if(text === ' India'){
        await country.nth(i).click(); 
        break; 
    }
}
//await page.pause();
//await page.locator('.btnn.fng-star-inserted').click();
await page.getByText('Place Order').click();
await expect(await page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
const orderid = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(orderid);

await page.locator('.btn.btn-custom[routerlink=\'/dashboard/myorders\']').click();
await page.locator('tbody').waitFor();
const rowtable = await page.locator('tbody tr');
const rowcount= await rowtable.count();

for(let i=0;i<rowcount;i++)
    {

     const roworderid=await rowtable.nth(i).locator('th').textContent();
     if(orderid.includes(roworderid))
     {
      await rowtable.nth(i).locator('button').first().click();
      break;    
     }

}

const orderDetails = await page.locator('.col-text').textContent();
//console.log(orderDetails);
//expect (orderDetails.includes(orderid)).toBeTruthy();
expect (orderid.includes(orderDetails)).toBeTruthy();


})


test('Verify login newfunctionality', async() => {
   
   const page=await webContext.newPage();
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.title();
   console.log(await page.title());

})