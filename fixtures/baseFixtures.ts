import { test as base, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { homePage } from '../pages/homePage';

type MyFixtures = {
    homePageFixture: homePage;
};

export const test = base.extend<MyFixtures>({
    homePageFixture: async ({ page, baseURL }, use, testInfo) => {
        const opencartLogin = new loginPage(page);
        await opencartLogin.goToOpenCart();

        const homePageFixture: homePage = await opencartLogin.loginToOpenCart(testInfo.project.metadata.username, testInfo.project.metadata.userpassword);      
        await use(homePageFixture); 
    }
});

export { expect };
