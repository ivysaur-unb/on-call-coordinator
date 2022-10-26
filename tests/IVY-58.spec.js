

const { By, Builder, until } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");
const { threadId } = require('worker_threads');
const { SeleniumServer } = require('selenium-webdriver/remote');

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
            
            let timer = await driver.wait(until.elementLocated(By.xpath("//a[@href='/teacherAbsences']")), 10000);
            let title = await driver.getTitle();

            assert.equal('React App', title);

            await driver.wait(until.elementLocated(By.xpath("//a[@href='/teacherAbsences']")));
            let found = driver.findElement(By.xpath("//a[@href='/teacherAbsences']"));
            driver.wait(until.elementIsSelected(found));
            found.click();
            let waiting = await driver.wait(until.elementLocated(By.xpath("//div[@class='teacherAbsenceForm']")), 10000);
            let url = await driver.getCurrentUrl();
            assert.equal('http://localhost:3000/teacherAbsences', url);
            await driver.manage().setTimeouts({ implicit: 500 });
        });

    });
});