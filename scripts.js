async function getData(){
    var total = 0;
    document.getElementById('nerd').innerHTML = "";
    document.getElementById('decade').innerHTML = "";

    try {
        const username1 = document.getElementById('username1').value.toLowerCase();
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${username1}`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            document.getElementById('data').innerHTML = "<p> Sorry! An error has occurred. </p>"
        }

        const data = await response.json();

        if (!Object.keys(data).length) {
            document.getElementById('data').innerHTML = "<p> Sorry " + username1 + "! We don't have data about your name in Brazil :(";
        } else {
            for (let i = 0; i < 9; i++) {
                if (data[0]["res"][i] == null) {
                    continue;
                } else {
                    total += data[0]["res"][i]["frequencia"];
                }
            }

            document.getElementById('data').innerHTML = "<h1>" + total + "</h1> <button onclick='more()'>I want nerd statistics!</button>";
        }
    } catch (error) {
        console.error(error.message);
    }
}
async function more() {
    document.getElementById('nerd').innerHTML = "";
    document.getElementById('decade').innerHTML = "";

    const username1 = document.getElementById('username1').value.toLowerCase();
    const response2 = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${username1}`)
    const data1 = await response2.json();

    for (let i = 0; i < 9; i++) {
        document.getElementById('decade').innerHTML += data1[0]["res"][i]["periodo"] + "  <span id='high'>" + data1[0]["res"][i]["frequencia"] + "</span><br />";
    }


    const response3 = await fetch(`https://servicodados.ibge.gov.br/api/v1/censos/nomes/mapa?nome=${username1}`)
    const data3 = await response3.json();

    var nstate = 0;
    var frq = 0;
    for (let j = 0; j < 27; j++) { 
        nstate = data3[j]["nome"];
        frq = data3[j]["populacao"] / data3[j]["freq"];
        document.getElementById('nerd').innerHTML += "In " + nstate + ", there's one <span id='high'>" + username1 + "</span> for each <span id='high'>" + frq + "</span> people."  + " " + data3[j]["freq"] + "/<span id='high'>" + data3[j]["populacao"] + "</span> <br />";
    }
} 
async function ranking() {
    const response1 = await fetch('https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking');
    const data2 = await response1.json();

    let text = "<table border='1'>"
    for (let i = 0; i < 20; i++) {
        text += "<tr>" + "<td>" + data2[0]["res"][i]["ranking"] + "</td>" + "<td>" + data2[0]["res"][i]["nome"] + "</td>" + "<td>" + data2[0]["res"][i]["frequencia"] + "</td>" + "</tr>";
    }
    text += "</table>"
    document.getElementById('ranking').innerHTML = text;
}
ranking();