import {Page, Locator} from '@playwright/test'
import {ElementUtil} from '../utils/ElementUtil'
import { homePage } from './homePage';

export class loginPage
{
    private readonly page: Page;
    private readonly eleUtil;
    private readonly txtbxEmail: Locator;
    private readonly txtbxPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly headerLogin : Locator;

    //constructor
    constructor(page: Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.txtbxEmail = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.txtbxPassword = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.headerLogin = page.getByRole('heading', { name: 'Returning Customer' });
    }

    //page actions
    async goToOpenCart()
    {
        await this.page.goto('/opencart/index.php?route=account/login');
        console.log(this.page.url());
        await this.eleUtil.waitForElementVisible(this.headerLogin);     
    }

    async loginToOpenCart(name: string, password: string)
    {
        await this.txtbxEmail.fill(name);
        await this.txtbxPassword.fill(password);
        await this.btnLogin.click();
        return new homePage(this.page);
    }






}