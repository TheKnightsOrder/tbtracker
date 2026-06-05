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

        const dotClass =
            player.total >= 5
            ? "green-dot"
            : "red-dot";

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <span class="${dotClass}">●</span>
                    ${player.name}
                </td>
                <td>
                    ${player.total}
                    <span class="${dotClass}">●</span>
                </td>
            </tr>
        `;
    });
}

loadCSV();
