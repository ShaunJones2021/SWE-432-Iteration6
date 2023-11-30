document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("add-dialog");
  const noButton = document.getElementById("no-btn");
  const yesButton = document.getElementById("yes-btn");
  const form = document.getElementById("addSongForm");

  const searchItems = document.querySelectorAll(".search-item");

  searchItems.forEach((searchItem) => {
    searchItem.addEventListener("click", (event) => {
      event.preventDefault();
      const songId = searchItem.getAttribute("data-song-id");
      const songIdInput = form.querySelector("#songIdInput");
      songIdInput.value = songId;
      console.log(songId);
      console.log(songIdInput.value);
      openAddDialog(songId);

      noButton.addEventListener("click", () => {
        closeAddDialog();
      });

      yesButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting immediately
        const selectedSong = form.querySelector(
          'input[name="selectedPlaylist"]:checked'
        );

        if (!selectedSong) {
          alert("Please choose a playlist before confirming.");
        } else {
          // Proceed with your form submission logic
          form.submit();
          closeAddDialog();
        }
      });
    });
  });

  

  function openAddDialog(songId) {
    const songIdInput = document.getElementById("songIdInput");
    songIdInput.value = songId;
    dialog.showModal(); // showing the dialog
  }

  function closeAddDialog() {
    dialog.close();
  }
});
