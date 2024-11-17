async function getData(){
  const username1 = document.getElementById('username1').value.toLowerCase();
  const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${username1}`)
  const data = await response.json();
  console.log(data);
}
