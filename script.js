const cut = document.querySelector(".close");
const makeBtn = document.querySelector(".make-btn");
cut.addEventListener("click", () => {
  gsap.to(".writer", {
    opacity: 0,
    display: "none",
  });
});

makeBtn.addEventListener("click", () => {
  gsap.to(".writer", {
    opacity: 1,
    display: "flex",
  });
});

const createBtn = document.querySelector(".create-btn");
const cards = document.querySelector(".cards");
const data = document.querySelector(".input-data");
const title = document.querySelector(".input-title");
let clutter = "";

if (localStorage.getItem("tasks") === null) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

document.querySelector(".writer").addEventListener("keypress", (dets) => {
  if (dets.srcElement === title) {
    if (dets.charCode === 13) {
      data.focus();
    }
  }
  if (dets.srcElement === data) {
    if (dets.charCode === 13) {
      gsap.to(".writer", {
        opacity: 0,
        display: "none",
      });
      setTimeout(() => {
        title.value = "";
        data.value = "";
      }, 1000);

      const objData = {
        data: data.value,
        title: title.value,
      };

      const stringData = localStorage.getItem("tasks");
      const parsedData = JSON.parse(stringData);
      parsedData.push(objData);
      localStorage.setItem("tasks", JSON.stringify(parsedData));

      printCards();
    }
  }
});
createBtn.addEventListener("click", () => {
  gsap.to(".writer", {
    opacity: 0,
    display: "none",
  });
  setTimeout(() => {
    title.value = "";
    data.value = "";
  }, 1000);

  const objData = {
    data: data.value,
    title: title.value,
  };

  const stringData = localStorage.getItem("tasks");
  const parsedData = JSON.parse(stringData);
  parsedData.push(objData);
  localStorage.setItem("tasks", JSON.stringify(parsedData));

  printCards();
});

const deleteBtn = document.querySelector(".delete-btn");

function printCards() {
  const printStringData = localStorage.getItem("tasks");

  const printParsedData = JSON.parse(printStringData);

  clutter = "";

  printParsedData.forEach((elem) => {
    clutter += `<div
    class="card p-4 flex max-w-[15vw] h-fit flex-col gap-[.5vw] bg-zinc-700 rounded-md relative"
    > 
    <i class="close-icon ri-close-line absolute top-[-2%] right-[1%] text-[1.2vw] text-white"></i>
    <h1 class="text-[1.2vw] break-words text-zinc-200 font-[500] inline leading-[1.3]">${elem.title}</h1>
    <p class="text-gray-300 break-words tracking-tighter leading-[1.2] inline">
    ${elem.data}
    </p>
    </div>`;
  });
  if (printParsedData.length > 0) {
    document.querySelector(".empty").style.display = "none";
    deleteBtn.style.display = "block";
  }
  cards.innerHTML = clutter;
}
printCards();

deleteBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  location.reload();
});

const allCards = document.querySelectorAll(".card");
const allCloseIcons = document.querySelectorAll(".close-icon");
function deleteTasks() {
  allCloseIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      let deleteDataString = localStorage.getItem("tasks");
      let deleteDataArray = JSON.parse(deleteDataString);
      deleteDataArray.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(deleteDataArray));
      // location.reload();
      cards.removeChild(allCards[index]);
    });
  });
}

deleteTasks();

allCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    allCloseIcons[index].style.opacity = 1;
  });
});

allCards.forEach((card, index) => {
  card.addEventListener("mouseleave", () => {
    allCloseIcons[index].style.opacity = 0;
  });
});
