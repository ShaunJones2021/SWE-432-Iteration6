document.addEventListener("DOMContentLoaded", function() {
    const features = document.querySelectorAll(".profile-feat button");
    
    for(let item of features){
        item.addEventListener("click", (e) => {
            console.log(e.target.parentNode);
            if(e.target.name === "pause"){
                e.target.name = "play";
                e.target.childNodes[0].src = "/images/play_button.png";
            }
            else if(e.target.parentNode.name === "pause"){
                e.target.parentNode.name = "play";
                e.target.src = "/images/play_button.png";
            }
            else if(e.target.name === "play"){
                e.target.name = "pause";
                e.target.childNodes[0].src = "/images/pause_button.png";
            }
            else if(e.target.parentNode.name === "play"){
                e.target.parentNode.name = "pause";
                e.target.src = "/images/pause_button.png";
            }
            else if(e.target.name === "muted"){
                e.target.name = "unmuted";
                e.target.childNodes[0].src = "/images/unmuted.png";
            }
            else if(e.target.parentNode.name === "muted"){
                e.target.parentNode.name = "unmuted";
                e.target.src = "/images/unmuted.png";
            }
            else if(e.target.name === "unmuted"){
                e.target.name = "muted";
                e.target.childNodes[0].src = "/images/muted.png";
            }
            else if(e.target.parentNode.name === "unmuted"){
                e.target.parentNode.name = "muted";
                e.target.src = "/images/muted.png";
            }
        });
    }
});