import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";

test('Check OpneCart Login', async ({page}, testInfo) =>{
    let openCartlogin: loginPage = new loginPage(page);
    await openCartlogin.goToOpenCart();
    await openCartlogin.loginToOpenCart(testInfo.project.metadata.username, testInfo.project.metadata.userpassword);
})

test.skip('sample test', async() =>{
    console.log('sample test case to be skipped');
})