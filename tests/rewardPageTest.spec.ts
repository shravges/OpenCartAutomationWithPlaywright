import {test , expect} from '../fixtures/baseFixtures'
import { rewardPage } from "../pages/rewardPage";

test('Check reward page', async ({homePageFixture}) =>{
    let opencartReward: rewardPage = await homePageFixture.navigateToRewardPoints();
    let totlRewardPoints: number = await opencartReward.getRewardPoints();
    expect(totlRewardPoints).toBe(0);
})