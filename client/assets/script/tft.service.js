import { Tft } from "./tft.class.js";

export class TftService {
  constructor() {

  }


  async getAllChamps(target) {
    let headers = new Headers();
    let url = '/champs';
    let options = {
      method: 'GET',
      headers: headers
    };

    return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      Object.values(response).forEach(elt => {
        let card = document.createElement('div')
        let cardBody = document.createElement('div');
        let img = document.createElement('img');
        let name = document.createElement('h5');
        let desc = document.createElement('p');
        let detailLink = document.createElement('a');
        let deleteBtn = document.createElement('btn');
        
        
        card.classList.add("card", 'm-3', 'text-center');
        cardBody.classList.add("card-body");
        name.classList.add("card-title");
        desc.classList.add("card-text");
        detailLink.classList.add("btn", "btn-primary");
        deleteBtn.classList.add('btn', 'btn-outline-danger', 'ms-3');
        
        card.setAttribute('style', 'width: 18rem');
        detailLink.setAttribute('href', './pages/details.html#' + elt.id);
        deleteBtn.setAttribute('href', './pages/details.html#' + elt.id);

        img.src = elt.image;
        name.innerText = elt.name;
        desc.innerText = elt.title;
        detailLink.innerText = "Détails";
        deleteBtn.innerText = "Supprimer";

        target.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(name);
        cardBody.appendChild(desc);
        cardBody.appendChild(detailLink);
        cardBody.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
          this.remove(elt._id);
        })

      });
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    })
  }

  async get(id) {
    let headers = new Headers();
    let url = '/champs/' + id;
    let options = {
      method: 'GET',
      headers: headers
    };

    return fetch(url, options)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      console.log(response)
      let fullData = {
        imgChamp: response.champ.skinImages,
        titleChamp: response.champ.name,
        descChamp: response.champ.title,
        loreChamp: response.champ.blurb,
        items: [],
        itemsImg: []
      };

      for (const itemId in response.itemsList[0].data) {
        const item = response.itemsList[0].data[itemId];
        fullData.items.push({
          name: item.name,
          description: item.description
        });
      }

      for (const prop in response.itemsImg) {
          const itemImg = response.itemsImg[prop];
          fullData.itemsImg.push({
            image: itemImg
          });
      }
      
      

      return fullData
    })
    .catch((error) => {
      console.log(`Error : ${error}`)
    })
  }
  

  async remove(id) {
    let headers = new Headers();
    let url = '/champs/' + id;
    let options = {
      method: 'DELETE',
      header: headers
    }
    return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        console.log("Deleted");
        location.reload();
      }
    })
    .catch((error) => {
      console.log(`Error : ${error}`)
    })
  }

  async add(item) {
    let headers = new Headers();
    let url = '/champs/' + id;
    let options = {
      method: 'POST',
      header: headers,
      body: JSON.stringify(item)
    }
    return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        console.log("added");
        location.reload();
      }
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    })
  }


  async modif(film) {
    let url = '/champs/' + champ.id;
    let options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(film)
    };

    return fetch(url, options)
      .then((res) => {
        if(res.ok) {
          console.log('reussi')
        }
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
      });
  }

}