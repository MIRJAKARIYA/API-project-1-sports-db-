const searchInput = () => {
    const inputText = document.getElementById('input-text');
    const inputTextValue = inputText.value;
    getPlayer(inputTextValue);
    document.getElementById('main-container').textContent = '';
};

const getPlayer = inputTextValue => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputTextValue}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showResult(data.player))
};
const showResult = players => {
    const container = document.getElementById('main-container');
    players.forEach(player => {
      if(player.strThumb == null){
        fetch(`https://restcountries.com/v3.1/name/${player.strNationality}`)
        .then(res => res.json())
        .then(data => nation(data[0].coatOfArms.png,player))
    }
      else{
          const div = document.createElement('div');
          div.classList.add('col-lg-3','col-md-4','mb-3');
          div.innerHTML = `
          <div class="card p-4 style-content h-100">
            <img src="${player.strThumb}" class="card-img-top d-block">
            <div class="card-body">
              <h5 class="card-title">${player.strPlayer}</h5>
              <p>${player.strNationality}</p>
            </div>
            <div>
              <button type="button" onclick="showDetails('${player.idPlayer}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
          `;
          container.appendChild(div);
      }
    });
};
const nation = (nationality,player) => {
  const container = document.getElementById('main-container');
  const div = document.createElement('div');
          div.classList.add('col-lg-3','col-md-4','mb-3');
          div.innerHTML = `
          <div class="card p-4 style-content h-100">
            <img src="${nationality}" class="card-img-top d-block">
            <div class="card-body">
              <h5 class="card-title">${player.strPlayer}</h5>
              <p>${player.strNationality}</p>
            </div>
            <div>
              <button onclick="showDetails('${player.idPlayer}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
          `;
          container.appendChild(div);
};
//show details on modal
const showDetails = playerId => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => putDetailsInModal(data.players[0]));
}
const putDetailsInModal = details => {
    const modalContaienr = document.getElementById('put-modal');
    modalContaienr.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
          <div class="d-flex modal-top-style mb-3 p-3">
            <div class="w-50">
              <img src="${details.strThumb}" alt="Picture not available" class="w-100">
            </div>
            <div class="w-50 ps-2 info-style">
              <p class="m-1"><span class="label-style">Name:</span> ${details.strPlayer}</p>
              <p class="m-1"><span class="label-style">Gender:</span>${details.strGender}</p>
              <p class="m-1"><span class="label-style">Country:</span> ${details.strNationality}</p>
              <p class="m-1"><span class="label-style">Sport:</span> ${details.strSport}</p>
              <p class="m-1"><span class="label-style">Position:</span> ${details.strPosition}</p>
              <p class="m-1"><span class="label-style">Date of birth:</span> ${details.dateBorn}</p>
              <p class="m-1"><span class="label-style">Height:</span> ${details.strHeight}</p>
              <p class="m-1"><span class="label-style">Weight:</span> ${details.strWeight}</p>
            </div>
          </div>
          <div class="modal-bottom-style p-3">
            <h3 class="text-decoration-underline des-heading">Player's description:</h3>
            <p>${details.strDescriptionEN||details.strDescriptionDE||details.strDescriptionFR||details.strDescriptionCN||'No description found'}</p>
          </div>
          `;
    modalContaienr.appendChild(div);
}
//delete button
document.getElementById('main-container').addEventListener('click', event => {
  if(event.target.innerText === "Delete"){
    console.log(event.target.parentNode.parentNode.parentNode)
    event.target.parentNode.parentNode.parentNode.style.display = 'none';
  }
})