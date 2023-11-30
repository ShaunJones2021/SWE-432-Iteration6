document.addEventListener("DOMContentLoaded", function() {
    const stationDiv = document.querySelector(".station-section");
    stationDiv.addEventListener("scroll", lazyLoad);

    function lazyLoad(){
        console.log("lazyLoading");
        const images = document.querySelectorAll(".lazy");
        const stationDivTop = stationDiv.getBoundingClientRect().top;
        const stationDivBottom = stationDiv.getBoundingClientRect().bottom;
        console.log(stationDivTop);
        console.log(stationDivBottom);

        for(let img of images){
            if(img.getBoundingClientRect().top < stationDivBottom && img.getBoundingClientRect().bottom > stationDivTop){
                img.src = img.dataset.src;
                img.alt = img.dataset.alt;
                img.classList.remove("lazy");
            }
        }
    }
});