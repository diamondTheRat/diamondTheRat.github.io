const VISIBLE = 10;

const totalEntries = leaderboard.length / 2;

let startIndex = 0;

const rowsContainer = document.getElementById("rows");
const rows = [];


// player count display
document.getElementById("playerCount").textContent =
    `${totalEntries.toLocaleString()} players`;


// create the 15 permanent rows
for (let i = 0; i < VISIBLE; i++) {

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
        <div class="rank"></div>
        <div class="name"></div>
        <div class="guild"></div>
        <div class="score"></div>
    `;

    rowsContainer.appendChild(row);
    rows.push(row);
}



function render() {

    for (let i = 0; i < VISIBLE; i++) {

        const index = startIndex + i;

        if (index >= totalEntries) {
            rows[i].style.visibility = "hidden";
            continue;
        }


        rows[i].style.visibility = "visible";


        const info = leaderboard[index * 2];
        const score = leaderboard[index * 2 + 1];


        const parts = info.split(",");


        rows[i].children[0].textContent =
            "#" + (index + 1);

        rows[i].children[1].textContent =
            parts[0];

        rows[i].children[2].textContent =
            parts[2];

        rows[i].children[3].textContent =
            score;
    }
}



function move(amount) {

    startIndex += amount;


    startIndex = Math.max(
        0,
        Math.min(
            startIndex,
            totalEntries - VISIBLE
        )
    );


    render();
}



// mouse wheel scrolling
window.addEventListener("wheel", e => {

    e.preventDefault();

    move(Math.sign(e.deltaY));

}, { passive:false });



// keyboard controls
window.addEventListener("keydown", e => {

    if(e.key === "ArrowDown")
        move(1);

    else if(e.key === "ArrowUp")
        move(-1);

    else if(e.key === "PageDown")
        move(VISIBLE);

    else if(e.key === "PageUp")
        move(-VISIBLE);

});




// SEARCH

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");



function searchPlayer() {

    const query =
        searchInput.value
        .toLowerCase()
        .trim();


    if(!query)
        return;


    let found = -1;


    for(let i = 0; i < totalEntries; i++) {

        const info =
            leaderboard[i * 2];


        const name =
            info.split(",")[0]
            .toLowerCase();


        if(name.includes(query)) {

            found = i;
            break;
        }
    }



    if(found === -1) {

        alert("Player not found");
        return;
    }



    // put player in the middle row
    startIndex =
        found - Math.floor(VISIBLE / 2);



    // prevent going past start/end
    startIndex =
        Math.max(
            0,
            Math.min(
                startIndex,
                totalEntries - VISIBLE
            )
        );


    render();
}



searchButton.addEventListener(
    "click",
    searchPlayer
);



searchInput.addEventListener(
    "keydown",
    e => {

        if(e.key === "Enter")
            searchPlayer();

    }
);



// initial render
render();
