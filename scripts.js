async function getData(){
    var total = 0;

    try {
        const username1 = document.getElementById('username1').value.toLowerCase();
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${username1}`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            document.getElementById('data').innerHTML = "<p> Sorry! An error has occurred. </p>"
        }

        const data = await response.json();

        if (!Object.keys(data).length) {
            console.log("No data for " + username1 + " found");
            document.getElementById('data').innerHTML = "<p> Sorry! We don't have data about " + username1 + "s in Brazil :(";
        } else {
            for (let i = 0; i < 9; i++) {
                if (data[0]["res"][i] == null) {
                    continue;
                } else {
                    total += data[0]["res"][i]["frequencia"];
                }
            }

            console.log("Total: " + total);
            document.getElementById('data').innerHTML = "<h1>" + total + "</h1> <button onclick='more()'>I want nerd statistics!</button>";
        }

        console.log(data);

    } catch (error) {
        console.error(error.message);
    }
}
async function more() {
    const username1 = document.getElementById('username1').value.toLowerCase();
    const response1 = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${username1}`)
    const data1 = await response1.json();
    for (let i = 0; i < 9; i++) {
        console.log(data1[0]["res"][i]["frequencia"] + "  " + data1[0]["res"][i]["periodo"]);
        document.getElementById('decade').innerHTML += data1[0]["res"][i]["periodo"] + "  <span id='high'>" + data1[0]["res"][i]["frequencia"] + "</span><br />";
    }
    const response3 = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${username1}?groupBy=UF`)
    const data3 = await response3.json();
    var nstate = 0;
    for (let j = 0; j < 27; j++) { 
        nstate = data3[j]["localidade"];
        /*const state = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${nstate}`);
        const state0 = state["nome"];
        console.log(state0);*/
        console.log("In " + nstate + ", there's one " + username1 + " for each " + data3[j]["res"][0]["proporcao"] + " people." + " " + data3[j]["res"][0]["frequencia"] + "/" + data3[j]["res"][0]["populacao"])
        document.getElementById('nerd').innerHTML += "In " + nstate + ", there's one <span id='high'>" + username1 + "</span> for each <span id='high'>" + data3[j]["res"][0]["proporcao"] + "</span> people."  + " " + data3[j]["res"][0]["frequencia"] + "/<span id='high'>" + data3[j]["res"][0]["populacao"] + "</span> <br />";
    }
    console.log(data3);
} 
async function ranking() {
    const response2 = await fetch('https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking');
    const data2 = await response2.json();
    console.log(data2);
    let text = "<table border='1'>"
    for (let i = 0; i < 20; i++) {
        console.log(data2[0]["res"][i]["ranking"] + " " + data2[0]["res"][i]["nome"] + " " + data2[0]["res"][i]["frequencia"]);
        text += "<tr>" + "<td>" + data2[0]["res"][i]["ranking"] + "</td>" + "<td>" + data2[0]["res"][i]["nome"] + "</td>" + "<td>" + data2[0]["res"][i]["frequencia"] + "</td>" + "</tr>";
    }
    text += "</table>"
    document.getElementById('ranking').innerHTML = text;
}
ranking();