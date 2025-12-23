import {Page, Locator} from '@playwright/test'
import {ElementUtil} from '../utils/ElementUtil'
import {rewardPage} from '../pages/rewardPage'
import {affiliateInfoPage} from  '../pages/affiliateInfoPage'

export class homePage
{
    private readonly page: Page;
    private readonly eleUtil;
    private readonly headerMyAccount : Locator;
    private readonly lnkMyRewardPoints: Locator;
    private readonly lnkAffiliateInfo : Locator;
    private readonly divSuccess: Locator;

    //constructor
    constructor(page: Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.headerMyAccount = page.getByRole('heading', { name: 'My Account' });
        this.lnkMyRewardPoints = page.getByRole('link', { name: 'Your Reward Points' });
        this.divSuccess = page.locator('div.alert.alert-success.alert-dismissible');
        this.lnkAffiliateInfo = page.getByRole('link', { name: 'Edit your affiliate information' });
    }

    //page actions
    async checkHeaderPresent(): Promise<boolean>
    {
        await this.eleUtil.waitForURL('account');
        return await this.eleUtil.checkElementVisible(this.headerMyAccount);
    }
   
    async navigateToRewardPoints()
    {
        await this.eleUtil.click(this.lnkMyRewardPoints);
        await this.eleUtil.waitForURL('reward');
        return new rewardPage(this.page);
    }

    async navigateToAffiliatePage()
    {
        await this.eleUtil.click(this.lnkAffiliateInfo);
        //await this.eleUtil.waitForURL('affiliate');
        return new affiliateInfoPage(this.page);
    }

    async validateSuccessMessage(): Promise<string>
    {
        await this.eleUtil.waitForElementVisible(this.headerMyAccount);
        await this.eleUtil.waitForElementVisible(this.divSuccess);
        let successMessage: string | null = await this.eleUtil.getText(this.divSuccess);
        return successMessage || '';
    }


}