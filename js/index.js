let initCount = 0;
let fiftyCount = 50;

function fetchMonsters() {
    return fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(data => {
        const monsterContainer = document.getElementById("monster-container");
        monsterDataHandler(data, monsterContainer);
        fetchNextMonsters(data, monsterContainer);
        fetchPreviousMonsters(data, monsterContainer);
    })
}

function postMonsters(event) {
    event.preventDefault();
    let inputObj = {
        name: event.target.elements[0].value,
        age: event.target.elements[1].value,
        desc: event.target.elements[2].value
    }
    console.log(event.target.elements[2].value);
    return fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(inputObj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
}

function submitMonsters(event) {

}

function fetchNextMonsters(nextData, monsterContainer) {
    document.getElementById("forward").addEventListener("click", () => {
        initCount = initCount+50;
        fiftyCount = fiftyCount+50;
        monsterContainer.querySelectorAll("div").forEach(monster => {
            monster.hidden=true;
        })
        monsterDataHandler(nextData, monsterContainer);

    })
}

function fetchPreviousMonsters(prevData, monsterContainer) {
    document.getElementById("back").addEventListener("click", () => {
        initCount = initCount-50;
        fiftyCount = fiftyCount-50;
        monsterContainer.querySelectorAll("div").forEach(monster => {
            monster.hidden=true;
        })
        monsterDataHandler(prevData, monsterContainer);
    })
}

function monsterDataHandler (monsterData, monsterContainer) {
    monsterData.forEach(monster => {
        if(monster.id > initCount && monster.id <= fiftyCount){
            const monsterDiv = document.createElement("div");
            monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>${monster.age}</h4>
            <p>${monster.description}</p>
            `
            monsterDiv.setAttribute("id", monster.id);
            monsterContainer.appendChild(monsterDiv);
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetchMonsters();
    document.getElementById("monster-form").addEventListener("submit", postMonsters)
  });
  