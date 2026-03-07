const totalIssue = document.getElementById("total-issue");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const loadingSnipper = document.getElementById("loadingSnipper");

const cardContainer = document.getElementById("card-container");


const btnContainer = document.getElementById("btn-container");
const allIssues = [];

btnContainer.addEventListener("click", (e)=> {
    console.log(e.target.innerText);
    const text = e.target.innerText.toLowerCase();
    if(text === "all"){
        renderingAllData(allIssues);
    }
    if(text === "open"){
        const openData = allIssues.filter(item => item.status === "open");
        // console.log(openData);
        renderingAllData(openData);
    }
    if(text === "closed"){
        const closeData = allIssues.filter(item =>item.status === "closed");
        // console.log(closeData);
        renderingAllData(closeData);
    }
})


/* active btn */
const activeBtn = (id) => {
    const dynamicBtns = document.querySelectorAll(".dynamicBtn");
    // console.log(dynamicBtns);
    dynamicBtns.forEach(item => {
        item.classList.remove("btn-primary");
        item.classList.add("btn-base-100");
        
    });
    const currentActiveBtn = document.getElementById(id);
    currentActiveBtn.classList.add("btn-primary");
    currentActiveBtn.classList.remove("btn-base-100");
    
}
activeBtn("all-btn");


/* all data fetch */

const loadAllData = async () => {
    loadingShow();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    loadingHide();
    // allIssues = data.data;
    allIssues.push(...data.data);
    console.log(allIssues);
    // console.log(sobIssues);
    renderingAllData(allIssues);
    
}


/* show card in browser by js*/
const renderingAllData = async (allData) => {
    cardContainer.innerHTML = "";
    totalIssue.innerText = allData.length ;
    // console.log(totalIssue);
    allData.forEach(item => {
        // console.log(item);
        const labels = [];
        labels.push(...item.labels);
        // console.log(labels);
        const div = document.createElement("div");
        div.classList = "flex flex-warp gap-4"

        labels.forEach(label => {
            const btn = document.createElement("div");
            btn.classList = "badge badge-warning";
            btn.innerHTML = label;
            // console.log(btn);
            div.appendChild(btn);
        })

        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm ";
        
        card.innerHTML = `
                <div class="card bg-base-100 shadow-sm border-t-5 ${item.status === "open" ? "border-green-500": "border-violet-500"}">

                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <img src="${item.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}"  alt="">
                            <div class="badge badge-warning">
                                ${item.priority}
                            </div>
                        </div>
                        <h2 class="card-title">${item.title}</h2>
                        <p class="line-clamp-2">${item.description}</p>
                        <div class="flex flex-col">
                            <div class="badge badge-warning mb-3">
                                ${item.status}
                            </div>
                            <div class="labels-container">
                                
                                
                            </div>
                        </div>
                        
                    </div>
                    <hr class="text-base-300">
                    <div class="p-4">
                        <div >
                            <p>${item.author}</p>
                            <p>${item.assignee}</p>
                            </div>
                            <div>
                            <p>${item.createdAt}</p>
                            <p>${item.updatedAt}</p>
                        </div>
                    </div>
        `
        card.querySelector(".labels-container").appendChild(div);
        cardContainer.appendChild(card);
    })
}

const loadingShow = () => {
    loadingSnipper.classList.remove("hidden");
}
const loadingHide = () => {
    loadingSnipper.classList.add("hidden");
}


loadAllData();