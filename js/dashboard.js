const totalIssue = document.getElementById("total-issue");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const loadingSnipper = document.getElementById("loadingSnipper");

const cardContainer = document.getElementById("card-container");

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
    console.log(data.data);
    renderingAllData(data.data);
}

/* show card in browser by js*/
const renderingAllData = async (allData) => {
    
    allData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm ";
        if(item.status === "open"){
            card.className = "border-green-500";
            
        } else {
            card.className  = "border-green-500"
            
        }
        console.log(item.status);
        // console.log(item.priority);
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
                        <div class="flex flex-col md:flex-row sm:justify-start gap-2.5">
                            <div class="badge badge-warning">
                                ${item.status}
                            </div>
                            <div class="badge badge-warning">
                                Warning
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