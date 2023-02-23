const puppet = require("puppeteer");
const fs = require("fs");

(async function(){
    // const getProblems = async page=>{
    //     await page.waitForSelector('[role="rowgroup"]')
    //     const table = await page.$('[role="rowgroup"]')
    //     await table.waitForSelector('[role="row"]')
    //     const problems = await table.$$eval('[role="row"]',problems=>{
    //         const res = []
    //         for(let i=0;i<problems.length;i++){
    //             const anchor = problems[i].querySelector("a.h-5");
    //             if(anchor.classList.contains("opacity-60"))continue;
    //             const title = anchor.innerHTML
    //             const link = anchor.href
    //             res.push([title,link])
    //         }
    //         return res
    //     })
    //     console.log(problems)
    //     return problems
    // }

    // const browser = await puppet.launch({headless:false});
    // const page = (await browser.pages())[0];
    // const problems = []

    // for(let i=1;i<=52;i++){
    //     await page.goto(`https://leetcode.com/problemset/all/?page=${i}`)
    //     await page.waitForTimeout(7000);
    //     problems.push(...(await getProblems(page)));
    //     fs.writeFile("problems.json",JSON.stringify(problems),(err)=>{
    //         if(err)console.log(err);
    //     });
    // }

    // const file = fs.readFileSync("problems.json");
    // const file2 = fs.readFileSync("likes.json");
    // const problems = JSON.parse(file)
    // const ratios = JSON.parse(file2)
    // const last = ratios.last
    // console.log(problems.length)
    // for(let i=last+1;i<problems.length;i++){
    // await page.goto(problems[i][1])
    // await page.waitForSelector("div.space-x-1")
    // const ratio = await page.$$eval("div.space-x-1",likes=>{
    //     const like = likes[0].querySelector("div.text-xs").innerHTML
    //     const dislike = likes[1].querySelector("div.text-xs").innerHTML
    //     return `${like}/${dislike}`
    // })
    // console.log(ratio);
    // ratios[problems[i][0].split(".")[0]] = ratio
    // ratios["last"] = i;
    // fs.writeFile("likes.json",JSON.stringify(ratios),err=>{if(err)console.log(err)})
    // await page.waitForTimeout(5000);
    // }
    const convertToNumber = (numString) =>{
        // Check if the string ends with "k" or "K"
        if (numString.slice(-1).toLowerCase() === "k") {
          // Remove the "k" or "K" from the string and convert to number
          const num = parseFloat(numString.slice(0, -1));
          // Multiply the number by 1000 and return
          return Math.round(num * 1000);
        }
        // If the string doesn't end with "k" or "K", convert to number and return
        return parseFloat(numString);
      }
      
    const file = fs.readFileSync("likes.json")
    const problems = JSON.parse(file)
    const ratios = {}
    for(const key of Object.keys(problems)){
        const vals = problems[key].split("/")
        ratios[key] = [convertToNumber(vals[0]),convertToNumber(vals[1])]
    }
    fs.writeFileSync("data.json",JSON.stringify(ratios))
})()
