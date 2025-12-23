//import { test , expect} from "@playwright/test";
import {test , expect} from '../fixtures/baseFixtures'
import { loginPage } from "../pages/loginPage";
import { homePage } from "../pages/homePage"; 

test('Check home page', async ({homePageFixture}) =>{
    let homePagelanded: boolean = await homePageFixture.checkHeaderPresent();
    expect(homePagelanded).toBeTruthy();
})