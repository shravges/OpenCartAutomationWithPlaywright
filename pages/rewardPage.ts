import {Page, Locator} from '@playwright/test'
import {ElementUtil} from '../utils/ElementUtil'

export class rewardPage
{
    private readonly page: Page;
    private readonly eleUtil;
    private readonly headerRewardPoints: Locator;
    private readonly lblRewardPoints: Locator;

    //constructor
    constructor(page: Page)
    {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.headerRewardPoints = page.getByRole('heading', { name: 'Your Reward Points' });
        this.lblRewardPoints = page.locator(`div#content p`);
    }

    //page actions
    async getRewardPoints(): Promise<number>
    {
        await this.eleUtil.waitForElementVisible(this.headerRewardPoints);
        let rpoints: string | null= await this.eleUtil.getText(this.lblRewardPoints);
        rpoints =  (rpoints?.split(':')[1])?.trim() || '';
        rpoints = rpoints.substring(0,rpoints.length-1);
        console.log("Total reward points received =" +rpoints);
        return Number(rpoints);
    }


}