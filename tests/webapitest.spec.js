const {test,expect,request}= require('@playwright/test');
const loginpayload={userEmail: "sn2akela@gmai.com", userPassword: "Test@12345"}
let token;


test.beforeAll( async()=>
     {
const apicontext=await request.newContext();
const loginpageresponce=await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
  data: loginpayload
});
expect(loginpageresponce.ok()).toBeTruthy();
const loginresponcejson=await loginpageresponce.json();

token=loginresponcejson.token;
 console .log(token)
})







test('place the oder', async ({page}) => {

  page.addInitScript(value =>{
    window.localStorage.setItem('token',value)
  },token)

page.goto('https://rahulshettyacademy.com/client');
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




//await page.pause();



})

