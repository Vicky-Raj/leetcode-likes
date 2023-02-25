(function() {
    'use strict';


    const waitForElm = function (selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
    }

    waitForElm('.reactable-data').then((elm) => {

        const sortLikesAsc = function(a, b) {
            if (!isNaN(a[0]) && !isNaN(b[0])) {
              return a[0] - b[0];
            } else if (isNaN(a[0])) {
              return 1;
            } else {
              return -1;
            }
        };
        const sortLikesDes = function(a, b) {
            if (!isNaN(a[0]) && !isNaN(b[0])) {
              return b[0] - a[0];
            } else if (isNaN(a[0])) {
              return 1;
            } else {
              return -1;
            }
        };
        const sortDiff = function(){
            const problems = elm.querySelectorAll("tr")
            const clones = []
            const diffdic = {"Easy":0,"Medium":1,"Hard":2}
            const header = document.querySelector(".reactable-column-header").children[5]
            for(const problem of problems){
                const diff = diffdic[problem.children[5].firstChild.innerHTML]
                clones.push([diff,problem.cloneNode(true)])
                problem.remove()  
            }
            if(header.dataset.sort == "asc"){
                clones.sort(sortLikesDes)
                header.setAttribute("data-sort","dsc")
            }else{
                clones.sort(sortLikesAsc)
                header.setAttribute("data-sort","asc")
            }
            console.log(header);
            for(const problem of clones){
                elm.appendChild(problem[1])
            }
        }
        const sortAcc = function(){
            const problems = elm.querySelectorAll("tr")
            const clones = []
            const header = document.querySelector(".reactable-column-header").children[4]
            for(const problem of problems){
                const acc = problem.children[4].innerHTML
                clones.push([parseFloat(acc),problem.cloneNode(true)])
                problem.remove()  
            }
            if(header.dataset.sort == "dsc"){
                clones.sort(sortLikesAsc)
                header.setAttribute("data-sort","asc")
            }else{
                clones.sort(sortLikesDes)
                header.setAttribute("data-sort","dsc")
            }
            console.log(header);
            for(const problem of clones){
                elm.appendChild(problem[1])
            }
        }

        const observer = new MutationObserver(function (event) {
            const problems = elm.querySelectorAll("tr")
            for(const problem of problems){
                const col = problem.children[3]
                const id = problem.children[1].innerHTML
                col.innerHTML = id in likesData ? 
                `<b>${convertToKFormat(likesData[id][0])} / ${convertToKFormat(likesData[id][1])}</b>` : "NA";
            }
        })
        const sortLikes = function(){
            const problems = elm.querySelectorAll("tr")
            const clones = []
            const header = document.querySelector(".reactable-column-header").children[3]
            for(const problem of problems){
                const id = problem.children[1].innerHTML
                if(id in likesData){
                    clones.push([likesData[id][0],problem.cloneNode(true)])
                }else{
                    clones.push(["NA",problem.cloneNode(true)])
                }
                problem.remove()
            }
            if(header.dataset.sort == "dsc"){
                clones.sort(sortLikesAsc)
                header.setAttribute("data-sort","asc")
            }else{
                clones.sort(sortLikesDes)
                header.setAttribute("data-sort","dsc")
            }
            for(const problem of clones){
                elm.appendChild(problem[1])
            }
            const diff = document.querySelector(".reactable-column-header").children[5]
            const acc = document.querySelector(".reactable-column-header").children[4]
            diff.onclick = sortDiff
            acc.onclick = sortAcc
            observer.disconnect()

        }

        function convertToKFormat(num) {
            if (num >= 1000) {
              return (num / 1000).toFixed(1) + "k";
            } else {
              return num.toString();
            }
        }
        const header = document.querySelector(".reactable-column-header") 
        const headers = header.children
        const likes = headers[3].cloneNode()
        likes.classList.remove("reactable-th-acceptance")
        likes.innerHTML = "Likes"
        likes.onclick = sortLikes
        header.insertBefore(likes,headers[3])
        const problems = elm.querySelectorAll("tr")
        for(const problem of problems){
            const col = problem.children[3].cloneNode()
            const id = problem.children[1].innerHTML
            col.innerHTML = id in likesData ? 
            `<b>${convertToKFormat(likesData[id][0])} / ${convertToKFormat(likesData[id][1])}</b>` : "NA";
            problem.insertBefore(col,problem.children[3])
        }

        const acc = document.querySelector(".reactable-th-acceptance")
        const diff = document.querySelector(".reactable-th-difficulty")


        observer.observe(acc, {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
        })
        observer.observe(diff, {
            attributes: true, 
            attributeFilter: ['class'],
            childList: false, 
            characterData: false
        })

    });
})();
