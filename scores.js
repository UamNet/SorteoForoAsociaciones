var entries;
var values = [10, 10, 5, 15, 5, 5, 10, 5, 10];
var scores;

window.addEventListener("load", function () {
    entries = JSON.parse(localStorage.entries);
    scores = entries.map(function (e) {
        return {
            name: e.name,
            score: values.map(function (x, i) {
                return e.values[i] ? x : 0
            }).reduce(function (x, y) {
                return x + y;
            })
        };
    });
    scores.sort(function(a,b){return b.score-a.score;}).forEach(function(s){
        document.getElementById("resultsTable").innerHTML+=`<tr>
            <td>${s.name}</td>
            <td>${s.score}</td>
        </tr>`
    });
    document.getElementById("getWinner").addEventListener("click", chooseWinner);
});

function chooseWinner(){
    var tickets=scores.map(function(s){
        return Array(s.score).fill(s.name);
    }).reduce(function(a,b){return a.concat(b)});
    var winner = tickets[Math.floor(tickets.length*Math.random())]
    alert(`El ganador es ${winner}!`);
}