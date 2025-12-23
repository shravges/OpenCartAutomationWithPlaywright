import { Page, Locator, expect } from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil
{
    private page:Page;
    private defaultTimeout: number = 30000;

    constructor(page:Page, timeout:number= 30000)
    {
        this.page = page;
        this.defaultTimeout = timeout;
    }


   //************************************************************************locator level methods****************************************************************************************//
   /**
    * This method returns locator. If the locator type is string, it will locate by string else return the origian locator sent
    * @param locator 
    * @param index 
    * @returns 
    */
   private getLocator(locator: flexibleLocator, index?: number): Locator {
    if(typeof locator === 'string'){
        if(index){
            return this.page.locator(locator).nth(index);
        }
        else{
             return this.page.locator(locator).first();
        }
    }
    else{
        if(index){
            return locator.nth(index);
        }
        else{
            return locator.first();
        }
    }
   }

   /**
    * This method clicks on given locator
    * @param locator 
    */
   async click(locator: flexibleLocator, index?: number,  options?: {force?: boolean, timeout?: number}): Promise<void>
   {
      await this.getLocator(locator, index).click({
        force: options?.force,
        timeout: options?.timeout || this.defaultTimeout
      });
      console.log(`Clicked on element ${locator}`);
   }

   /**
    * This method right clicks on a given locator
    * @param locator 
    * @param index 
    */
   async rightClick(locator: flexibleLocator, index?: number): Promise<void>
   {
      await this.getLocator(locator, index).click({
        button:"right",
        timeout: this.defaultTimeout
      });
      console.log(`Right clicked on locator ${locator}`);
   }

   /**
    * This method double clicks on given locator
    * @param locator 
    * @param index 
    */
   async doubleClick(locator: flexibleLocator, index?: number): Promise<void>
   {
      await this.getLocator(locator, index).dblclick({
        timeout: this.defaultTimeout
      });
      console.log(`Double clicked on locator ${locator}`);
   }

   /**
    * This method fill the given text in given locator
    * @param locator 
    * @param text 
    * @param index 
    */
   async fill(locator: flexibleLocator, text: string, index?: number): Promise<void>
   {
    await this.getLocator(locator, index).fill(text, {
        timeout: this.defaultTimeout
    });
    console.log(`Entered text ${text} in locator ${locator}`);
   }

   /**
    * This method clears the given locator
    * @param locator 
    * @param index 
    */
   async clear(locator: flexibleLocator, index?: number): Promise<void>
   {
        await this.getLocator(locator,index).clear({
            timeout: this.defaultTimeout
        });
        console.log(`Cleared data from locator ${locator}`);
   }

   /**
    * This method will get the text of a locator
    * @param locator 
    * @param index 
    * @returns 
    */
   async getText(locator: flexibleLocator, index?: number): Promise<string | null>
   {
        let locatorText: string | null =  await this.getLocator(locator, index).textContent({
            timeout: this.defaultTimeout
        });
        console.log(`Text received from locator ${locator} is ` +locatorText);
        return locatorText;
   }

   /**
    * This methos will give you the inner text of a locator
    * @param locator 
    * @param index 
    * @returns 
    */
   async getInnerText(locator: flexibleLocator, index?: number): Promise<string>
   {
        let innerText: string =  await this.getLocator(locator, index).innerText({
            timeout: this.defaultTimeout
        });
        return innerText.trim();
   }

   /**
    * This method returns text of an input field
    * @param locator 
    * @param index 
    * @returns 
    */
   async getInputValue(locator: flexibleLocator, index?: number)
   {
        let inputText: string =  await this.getLocator(locator, index).inputValue({
            timeout: this.defaultTimeout
        });
        return inputText.trim();
   }

  /**
   * This method press the keyboard key
   * @param locator 
   * @param keyboardKey 
   * @param index 
   */
   async pressKeyboardKey(locator: flexibleLocator, keyboardKey:string, index?: number)
   {
       await this.getLocator(locator, index).press(keyboardKey);
       console.log(`Pressed key ${keyboardKey} from keyboard`);
   }
   
   async getElementCount(locator: Locator): Promise<number>
   {
        let totalElements: number = await locator.count();
        console.log(`Total elements found for locator ${locator} are `+totalElements);
        return totalElements;
   }

   async checkElementVisible(locator: Locator, index?: number): Promise<boolean>
   {
        return this.getLocator(locator, index).isVisible();
   }

   //**************************************************************Page level methods***************************************************************************** */
   
      
   
   async getTitle(): Promise<string>
   {
        let title: string = await this.page.title();
        console.log('Current page title = ' +title)
        return title;
   }

   async waitForURL(url: string)
   {
        await this.page.waitForURL(`**\/`+url);
   }
  
   //**************************************************************Wait utils******************************************************************************/
   /**
    * This method will wait for a given timeout
    * @param timeout 
    */
   async waitForTimeout(timeout: number): Promise<void>
   {
        await this.page.waitForTimeout(timeout);
        console.log(`Waited for timeout ${timeout}`);
   }

   async waitForPageLoadState(loadState: 'load' | 'domcontentloaded' | 'load' = 'load'): Promise<void>
   {
        await this.page.waitForLoadState(loadState);
        console.log(`Waited for load state ${loadState}`);
   }

   //wait for element to be visible
   async waitForElementVisible(locator: flexibleLocator, index?: number)
   {
        await this.getLocator(locator, index).waitFor({
            state: 'visible',
            timeout: this.defaultTimeout
        });
        console.log(`Waited for visibility of locator ${locator}`);
   }    

















}