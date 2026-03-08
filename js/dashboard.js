const totalIssue = document.getElementById("total-issue");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const loadingSnipper = document.getElementById("loadingSnipper");

const cardContainer = document.getElementById("card-container");

const modalContainer = document.getElementById("modal-container");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const noIssue = document.getElementById("noIssue");

const btnContainer = document.getElementById("btn-container");
const allIssues = [];

btnContainer.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    const text = e.target.innerText.toLowerCase();
    if (text === "all") {
        renderingAllData(allIssues);
    }
    if (text === "open") {
        const openData = allIssues.filter(item => item.status === "open");
        // console.log(openData);
        renderingAllData(openData);
    }
    if (text === "closed") {
        const closeData = allIssues.filter(item => item.status === "closed");
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
    // console.log(allIssues);
    // console.log(sobIssues);
    renderingAllData(allIssues);

}


/* show card in browser by js*/
const renderingAllData = async (allData) => {
    noIssue.innerHTML = "";
    cardContainer.innerHTML = "";
    totalIssue.innerText = allData.length;
    // console.log(totalIssue);
    allData.forEach(item => {
        // console.log(item);
        const labels = [];
        labels.push(...item.labels);
        // console.log(labels);
        const div = document.createElement("div");
        div.classList = "flex flex-col md:flex-row gap-4"

        labels.forEach(label => {
            // console.log(label);
            const btn = document.createElement("div");
            if (label === "bug") {
                btn.classList = `badge bg-amber-400`;
            } else if (label === "enhancement") {
                btn.classList = "badge bg-red-200";
            } else if (label === "help wanted") {
                btn.classList = "badge bg-green-300";
            } else {
                btn.classList = "badge bg-[#FDE68A]";
            }
            btn.innerHTML = label;
            // console.log(btn);
            div.appendChild(btn);
        })

        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm ";

        card.innerHTML = `
                <div class="card bg-base-100 shadow-sm border-t-5 ${item.status === "open" ? "border-green-500" : "border-violet-500"}">

                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <img src="${item.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}"  alt="">
                            <div class="badge ${item.priority === "low" ? "bg-gray-200" : item.priority === "medium" ? "bg-blue-200" : "bg-amber-200"}">
                               <span class="font-semibold">Priority :</span> ${item.priority}
                            </div>
                        </div>
                        <h2 onclick="openModalTree('${item.id}')" class="card-title cursor-pointer hover:text-blue-500">${item.title}</h2>
                        <p class="line-clamp-2">${item.description}</p>
                        <div class="flex flex-col">
                            <div class="badge ${item.status === "open" ? "bg-green-200" : "bg-violet-200"} mb-3">
                                ${item.status}
                            </div>
                            <div class="labels-container">
                                
                                
                            </div>
                        </div>
                        
                    </div>
                    <hr class="text-base-300">
                    <div class="p-4 space-y-4">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-centre gap-2">
                            <p class= ""><span class="font-semibold">Author :</span> ${item.author}</p>
                            <p>${item.createdAt.split("T")[0]}</p>
                        </div>
                        <div class="flex flex-col md:flex-row md:justify-between md:items-centre gap-2">
                            <p> <span class="font-semibold ${item.assignee ? "" : "Unknown"}">Assignee :</span> ${item.assignee}</p>
                            <p>${item.updatedAt.split("T")[0]}</p>
                        </div>
                    </div>
        `
        card.querySelector(".labels-container ").appendChild(div);
        cardContainer.appendChild(card);
    })
}

const loadingShow = () => {
    cardContainer.innerHTML ="";
    loadingSnipper.classList.remove("hidden");
}
const loadingHide = () => {
    loadingSnipper.classList.add("hidden");
}

// modal open when click title of a card
const openModalTree = async (treeId) => {
    loadingShow();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${treeId}`)
    const data = await res.json();
    loadingHide();
    // console.log(data.data);
    const issuesDetails = data.data;
    showModalInfo(issuesDetails);
    // console.log(issuesDetails);

    issueCardInfo.showModal();
}


const showModalInfo = async (item) => {
    noIssue.innerHTML = "";
    modalContainer.innerHTML = "";
    const labels = [];
    labels.push(...item.labels);
    // console.log(labels);
    const div = document.createElement("div");
    div.classList = "flex flex-col md:flex-row gap-4"

    labels.forEach(label => {
        const btn = document.createElement("div");
        // btn.classList = "badge badge-warning";

        if (label === "bug") {
            btn.classList = `badge bg-amber-400`;

        } else if (label === "enhancement") {
            btn.classList = "badge bg-red-200";
        } else if (label === "help wanted") {
            btn.classList = "badge bg-green-300";
        } else {
            btn.classList = "badge bg-[#FDE68A]";
        }

        btn.innerHTML = label;
        // console.log(btn);
        div.appendChild(btn);
        // console.log(div);
    })

    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm ";

    card.innerHTML = `
                <div class="card bg-base-100 shadow-sm border-t-5 ${item.status === "open" ? "border-green-500" : "border-violet-500"}">

                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <img src="${item.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}"  alt="">
                            <div class="badge ${item.priority === "low" ? "bg-gray-200" : item.priority === "medium" ? "bg-blue-200" : "bg-amber-200"}"><span class="font-semibold">Priority :</span>
                                ${item.priority}
                            </div>
                        </div>
                        <h2 onclick="openModalTree('${item.id}')" class="card-title">${item.title}</h2>
                        <p class="">${item.description}</p>
                        <div class="flex flex-col">
                            <div class="badge mb-3 ${item.status === "open" ? "bg-green-200" : "bg-violet-200"}">
                                ${item.status}
                            </div>
                            <div class="labels-container">
                                
                                
                                
                            </div>
                        </div>
                        
                    </div>
                    <hr class="text-base-300">
                    <div class="p-4 space-y-4">
                        <div class="flex md:justify-between md:items-centre gap-4">
                            <p class= ""><span class="font-semibold">Author :</span> ${item.author}</p>
                            <p>${item.createdAt.split("T")[0]}</p>
                        </div>
                        <div class="flex flex-col md:flex-row md:justify-between md:items-centre gap-4">
                            <p> <span class="font-semibold">Assignee :</span> ${item.assignee}</p>
                            <p>${item.updatedAt.split("T")[0]}</p>
                        </div>
                    </div>
        `
    card.querySelector(".labels-container").appendChild(div);
    modalContainer.appendChild(card);
    // modalContainer.appendChild(div);
    card.querySelector(".labels-container").appendChild(div);
}

searchBtn.addEventListener("click", () => {
    const searchInputValue = searchInput.value.trim().toLowerCase()
    searchInput.value = "";

    // console.log(searchInputValue);
    searchFunction(searchInputValue);
    activeBtn("all-btn");
    
    
    // const matchingData = data.data;
    // console.log(data.data);
    
})

const searchFunction = async (searchValues) => {
    console.log(searchValues);
    loadingShow();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValues}`);
    const data = await res.json();
    loadingHide();
    renderingAllData(data.data);

    // console.log(allIssues.length);
    if(searchValues === "" || data.data.length <=0 ){
            noIssuesFunction();
        }



}


const noIssuesFunction = () => {
    noIssue.innerHTML = "";
    cardContainer.innerHTML = "";
    const issueCard = document.createElement("div");
    issueCard.className = "card card-body border-2 bg-red-100";
    issueCard.innerHTML = `
        <h1 class="text-4xl font-bold text-center text-red-300 ">! No Issues here</h1>
    `
    noIssue.appendChild(issueCard);
}


loadAllData();