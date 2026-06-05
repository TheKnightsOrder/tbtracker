async function loadCSV() {

    const response = await fetch("classifica.csv");
    const text = await response.text();

    const rows = text.trim().split("\n").slice(1);

    let players = rows.map(row => {
        const [name, total] = row.split(",");
        return {
            name: name.trim(),
            total: parseInt(total)
        };
    });

    players.sort((a, b) => b.total - a.total);

    render(players);

    document.getElementById("search").addEventListener("input", e => {

        const term = e.target.value.toLowerCase();

        render(
            players.filter(p =>
                p.name.toLowerCase().includes(term)
            )
        );
    });
}

function render(players) {

    const tbody = document.querySelector("#leaderboard tbody");

    tbody.innerHTML = "";

    players.forEach((player, index) => {

        const rowClass = player.total > 5 ? "good" : "bad";

        tbody.innerHTML += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.total}</td>
            </tr>
        `;
    });
}

loadCSV();
