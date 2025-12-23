import {Page, Locator} from '@playwright/test'
import {ElementUtil} from '../utils/ElementUtil'
import { homePage } from './homePage';

export class affiliateInfoPage
{
    private readonly page: Page;
    private readonly eleUtil;
    private readonly txtbxCompany: Locator;
    private readonly txtbxWebsite: Locator;
    private readonly txtbxTaxId: Locator;
    private readonly txtbxEmail: Locator;
    private readonly btnContinue: Locator;
    private readonly headerAffiliateInfo: Locator;

    //constructor
    constructor(page: Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.headerAffiliateInfo = page.getByRole('heading', { name: 'Your Affiliate Information' });
        this.txtbxCompany = page.getByRole('textbox', { name: 'Company' });
        this.txtbxWebsite = page.getByRole('textbox', { name: 'Web Site' });
        this.txtbxTaxId = page.getByRole('textbox', { name: 'Tax ID' });
        this.txtbxEmail = page.getByRole('textbox', { name: 'PayPal Email Account' });
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
    }

    //page actions
   async updateAffiliateInformation(company: string, website: string, taxId: string, paymentmethod: string, paypalEmail: string)
   {
        await this.eleUtil.waitForElementVisible(this.headerAffiliateInfo);
        await this.eleUtil.fill(this.txtbxCompany, company);
        await this.eleUtil.fill(this.txtbxWebsite, website);
        await this.eleUtil.fill(this.txtbxTaxId, taxId);
        await this.eleUtil.fill(this.txtbxEmail, paypalEmail);
        await this.eleUtil.click(this.btnContinue);
        return new homePage(this.page);
   }


}