const { By, Builder, until } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const assert = require("assert");
const { threadId } = require("worker_threads");
const { SeleniumServer } = require("selenium-webdriver/remote");
const { WebElement } = require("selenium-webdriver");

suite(function (env) {
    describe("Launch React", function () {
        let driver;

        before(async function () {
            driver = await new Builder().forBrowser("chrome").build();
            await driver.get("localhost:3000");
        });

        after(async () => await driver.quit());

        it("Login", async function () {
            await driver.get("http://localhost:3000");

            await driver.manage().setTimeouts({ implicit: 500 });

            await driver.wait(until.elementLocated(By.id("email-input-field")));

            let username = await driver.findElement(By.id("email-input-field"));
            let password = await driver.findElement(
                By.id("filled-password-input")
            );
            let login = await driver.findElement(By.id("login-button"));

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
            // let timer = await driver.wait(until.elementLocated(By.xpath("//a[@href='/teacherAbsences']")), 10000);

            // URL does not change during navigation with our current implementation of header
            // This may change in the future
            // let url = await driver.getCurrentUrl();
            // assert.equal("http://localhost:3000/teacherAbsences", url);
            // await driver.manage().setTimeouts({ implicit: 500 });
            /**/
        });

        it('Navigate to Absences', async function() {
            await driver.get("http://localhost:3000");
            await driver.manage().setTimeouts({ implicit: 500 });

            let title = await driver.getTitle();

            assert.equal("React App", title);

            await driver.wait(
                until.elementLocated(By.linkText("Teacher Absences"))
            );
            let found = await driver.findElement(
                By.linkText("Teacher Absences")
            );
            // await driver.wait(until.elementIsSelected(found));
            found.click();
            const iframe = await driver.findElement(By.xpath("//iframe[@name='frame']"));

            await driver.switchTo().frame(iframe);

            await driver.wait(
                until.elementLocated(By.xpath("//div[@class='absenceSchedule']"))
            );
            // TODO: click edit button, update absences and verify changes
        })

    });
});