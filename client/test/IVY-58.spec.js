

const { By, Builder, until } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");
const { threadId } = require('worker_threads');
const { SeleniumServer } = require('selenium-webdriver/remote');
const { WebElement } = require('selenium-webdriver');

suite(function(env) {
    describe('Launch React', function() {
        let driver;

        before(async function() {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('localhost:3000');
        });

        after(async () => await driver.quit());

        it('Open Page', async function() {
            await driver.get('http://localhost:3000');

            await driver.manage().setTimeouts({ implicit: 500 });

            await driver.wait(until.elementLocated(By.id("email-input-field")));

            let username = driver.findElement(By.id("email-input-field"));
            let password = driver.findElement(By.id("filled-password-input"));
            let login = driver.findElement(By.xpath("./button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-sghohy-MuiButtonBase-root-MuiButton-root']"));
            
            driver.wait(until.elementIsSelected(username));
            username.sendKeys("admin@unb.ca");
            driver.wait(until.elementIsSelected(password));
            password.sendKeys("password");
            login.click();
            
            let loggedin = driver.findElement(By.xpath("./div[@class='header-name']"));

            assert.equal('header-name', loggedin);  
            
            /*let timer = await driver.wait(until.elementLocated(By.xpath("//a[@href='/teacherAbsences']")), 10000);
            let title = await driver.getTitle();

            assert.equal('React App', title);

            await driver.wait(until.elementLocated(By.xpath("//a[@href='/teacherAbsences']")));
            let found = driver.findElement(By.xpath("//a[@href='/teacherAbsences']"));
            driver.wait(until.elementIsSelected(found));
            found.click();
            let waiting = await driver.wait(until.elementLocated(By.xpath("//div[@class='teacherAbsenceForm']")), 10000);
            let url = await driver.getCurrentUrl();
            assert.equal('http://localhost:3000/teacherAbsences', url);
            await driver.manage().setTimeouts({ implicit: 500 });*/
        });

    });
});