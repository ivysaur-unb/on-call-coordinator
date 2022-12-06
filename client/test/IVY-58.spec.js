const { By, Builder, until } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const assert = require("assert");
const { threadId } = require("worker_threads");
const { SeleniumServer } = require("selenium-webdriver/remote");
const { WebElement } = require("selenium-webdriver");
const { doesNotMatch } = require("assert");

suite(function (env) {
    describe("Launch React", function () {
        let driver;

        // eslint-disable-next-line no-undef
        before(async function () {
            driver = await new Builder().forBrowser("chrome").build();
            await driver.get("localhost:3000");
        });

        // eslint-disable-next-line no-undef
        after(async () => await driver.quit());

        it("Login", async function () {
            await driver.get("http://localhost:3000");

            await driver.manage().setTimeouts({ implicit: 500 });

            await driver.wait(until.elementLocated(By.id("email-input-field")));

            let username = await driver.findElement(By.id("email-input-field"));
            let password = await driver.findElement(
                By.id("filled-password-input")
            );
            let login = await driver.findElement(By.xpath("//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-sghohy-MuiButtonBase-root-MuiButton-root']"))

            await username.sendKeys("admin@unb.ca");
            await password.sendKeys("password");
            login.click();
            await driver.wait(
                until.elementLocated(By.className("header-name"))
            );
            // Wait for the App to render
            let token = await driver.executeScript(
                'return sessionStorage.getItem("token")'
            );
            assert.notEqual(token, undefined);
        });

        it('Navigate to Absences', async function() {
            await driver.get("http://localhost:3000");
            await driver.manage().setTimeouts({ implicit: 500 });

            let title = await driver.getTitle();

            assert.equal("React App", title);

            await driver.wait(
                until.elementLocated(By.id("Teacher Absences"))
            );
            let found = await driver.findElement(
                By.id("Teacher Absences")
            );
            found.click();
            //const iframe = await driver.findElement(By.xpath("//div[@name='frame']"));

            //await driver.switchTo().frame(iframe);

            await driver.wait(
                until.elementLocated(By.xpath("//div[@class='absenceSchedule']"))
            );
            // TODO: click edit button, update absences and verify changes
        })

    });
});