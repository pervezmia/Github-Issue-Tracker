const totalIssue = document.getElementById("total-issue");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");

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
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data);
    renderingAllData(data.data);
}


const renderingAllData = async (allData) => {
    
    allData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card bg-base-100 shadow-sm";
        card.innerHTML = `
                <div class="card bg-base-100 shadow-sm">

                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <img src="./assets/Open-Status.png" alt="">
                            <div class="badge badge-warning">
                                ${item.priority}
                            </div>
                        </div>
                        <h2 class="card-title">Fix navigation menu on mobile devices</h2>
                        <p class="line-clamp-2">The navigation menu doesn't collapse properly on mobile devices The navigation menu doesn't collapse properly on mobile devices</p>
                        <div class="flex flex-col md:flex-row sm:justify-start gap-2.5">
                            <div class="badge badge-warning">
                                Warning
                            </div>
                            <div class="badge badge-warning">
                                Warning
                            </div>
                        </div>
                        
                    </div>
                    <hr class="text-base-300">
                    <div class="card-body rounded-2xl">
                        <p>#1 by john_doe</p>
                        <p>07/03/2024</p>
                    </div>
                </div>
        `
        cardContainer.appendChild(card);
    })
}
loadAllData();