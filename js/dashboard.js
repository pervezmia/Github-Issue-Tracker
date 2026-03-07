const totalIssue = document.getElementById("total-issue");
// const allBtn = document.getElementById("all-btn");

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
