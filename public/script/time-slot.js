const dialog = document.getElementById("add-dialog");
const showButton = document.getElementById("add-btn"); //publish-btn
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const form = document.getElementById('addSongForm');

if (showButton) {
  showButton.addEventListener("click", () => {
    dialog.showModal(); // showing the dialog
  });
  noButton.addEventListener("click", () => {
    dialog.close();
  });
  yesButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting immediately
    const selectedSong = form.querySelector('input[name="selectedSong"]:checked');

    if (!selectedSong) {
      alert("Please choose a song before confirming.");
    } else {
      // Proceed with your form submission logic
      form.submit();
      dialog.close();
    }
  });
}

const songsList = document.querySelector(".songs-list");



function renderAudio() {
  const songsItem = document.querySelectorAll(".songs-item");
  const audio = document.querySelector("audio");
  const audioSource = audio.querySelector("source");
  songsItem.forEach((item, index) => {
    console.log(item.dataset.audio, index);
    let btn = item.querySelector("button");
    btn.addEventListener("click", () => {
      let icon = btn.querySelector("i");
      if (icon.classList.contains("fa-play")) {
        let active = document.querySelector(".songs-item-active");
        if (active) {
          let btnActive = active.querySelector("button");
          let iconActive = btnActive.querySelector("i");
          iconActive.classList.remove("fa-pause");
          iconActive.classList.add("fa-play");
          active.classList.remove("songs-item-active");
        }
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        item.classList.add("songs-item-active");

        audioSource.src = item.dataset.audio;
        audio.load(); // Load the new source
        audio.play(); // Play the audio
      } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        item.classList.remove("songs-item-active");

        audio.pause();
      }
    });
  });
}

renderAudio();
//editSong
