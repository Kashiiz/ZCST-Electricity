const puppeteer = require("puppeteer");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

exports.login = async () => {
    console.log("[ZCST]Login to AuthServer...")
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless:"new",
      args: ["--blink-settings=imagesEnabled=false"],
    });
    const page = await browser.newPage();
    await page.goto(
      "https://authserver.zcst.edu.cn/cas/login?service=https://diankong.zcst.edu.cn/App/index.aspx"
    );
    await page.setViewport({ width: 1080, height: 1024 });

    await sumbitInfo(page)
    let res = await getASPXAUTH(page);
    await browser.close();
    resolve(res);
  });

  
};

const sumbitInfo = async (page) => {
    //Type student account and password
    const username = await page.$("#username");
    const password = await page.$("#password");
  
    const loginBtn = await page.$("#passbutton");
    await username.click();
    await username.type(config.AuthServer.studentId);
  
    await password.click();
    await password.type(config.AuthServer.password);
  
    //Login
    await loginBtn.click();
  };

const getASPXAUTH = async (page) => {
  return new Promise((resolve, reject) => {
    let result;
    setTimeout(async () => {
      let cookie = await page.cookies();
      if (!cookie) return getASPXAUTH(page);
      if (cookie[0].domain != "diankong.zcst.edu.cn") return getASPXAUTH(page);
      resolve(cookie[0].value);
    }, 1500);
    
  });
};






