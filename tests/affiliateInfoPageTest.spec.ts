import {test , expect} from '../fixtures/baseFixtures'
import { affiliateInfoPage } from '../pages/affiliateInfoPage';
import { homePage } from '../pages/homePage';
import fs from 'fs';

const environment:string = process.env.ENV || 'test';
console.log('Environment provided  =' +environment);

type affiliateData = {
    company: string,
    website: string,
    taxid: string,
    paymentmethod: string,
    paypalemail: string
}

let affiliateDetails: affiliateData = JSON.parse(fs.readFileSync('./data/'+environment+'/affiliateInfo.json','utf-8'));

test('Check affiliate information page', async ({homePageFixture}) =>{
    let opencartAffiliate: affiliateInfoPage = await homePageFixture.navigateToAffiliatePage();
    let opencartHome: homePage = await opencartAffiliate.updateAffiliateInformation(affiliateDetails.company, affiliateDetails.website, affiliateDetails.taxid, affiliateDetails.paymentmethod, affiliateDetails.paypalemail);
    let message: string = await opencartHome.validateSuccessMessage();
    expect(message).toContain('Success');
})