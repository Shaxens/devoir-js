const express = require('express');
const request = require('request');
const app = express();
let port = 3000;
const apiVersion  = `https://ddragon.leagueoflegends.com/api/versions.json`


const champList = [];
const itemsList = [];
const itemsImg = [];

/**
 * On fait une requête vers l'api pour get tous les champions et leurs images en fonction de la version actuelle de LoL
 */
request(apiVersion, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    const version = JSON.parse(body)[0];
    
    request(`http://ddragon.leagueoflegends.com/cdn/${version}/data/fr_FR/champion.json`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const champs = JSON.parse(body).data;
        
        for (const champName in champs) {
          const champ = champs[champName];
          champ.image = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`;

          // Requête vers l'API pour récupérer les skins du champion
          request(`https://ddragon.leagueoflegends.com/cdn/${version}/data/fr_FR/champion/${champ.id}.json`, (error, response, body) => {
            if (!error && response.statusCode == 200) {
              const champData = JSON.parse(body).data[champ.id];
              const skins = champData.skins;
              
              // Générer les URL des images splash des skins
              const skinImages = skins.map(skin => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_${skin.num}.jpg`);
              
              // Ajouter la liste des images splash au champion
              champ.skinImages = skinImages;
            } else {
              console.log(error);
            }
          });

          champList.push(champ);
        }
      } else {
        console.log(error);
      }
    });

    request(`http://ddragon.leagueoflegends.com/cdn/${version}/data/fr_FR/item.json`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        itemsList.push(JSON.parse(body));
        request(`http://ddragon.leagueoflegends.com/cdn/${version}/data/fr_FR/item.json`, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            const itemsData = JSON.parse(body).data;
            
            for (const itemId in itemsData) {
              const item = itemsData[itemId];
              const image = item.image.full;
              item.image = `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${image}`;
              itemsImg.push(item.image)
            }
          } else {
            console.log(error);
          }
        });
      } else {
        console.log(error);
      }
    })
  } else {
    console.log(error);
  }
});

app.use('/assets', express.static('./client/assets'));
app.use('/pages', express.static('./client/pages'))
app.use(express.json())

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html')
})

app.get('/champs', (req, res) => {
  res.json(champList);
});


app.get('/champs/:id', (req, res) => {
  let id = req.params.id;
  const champ = champList.find(champ => champ.id === id);
  res.send({champ, itemsList, itemsImg});
});


app.delete('/champs/:id', (req, res) => {
  let id = req.params.id;
  const champ = champList.find(champ => champ.id === id);
  res.send(champ);
})

app.post('/champs/:id', (req, res) => {
  let id = req.params.id;
  const champ = champList.find(champ => champ.id === id);
  res.sendStatus(champ);
})

app.put('/champs/:id', (req, res) => {
  let id = req.params.id;
  const champ = champList.find(champ => champ.id === id);
  res.sendStatus(champ);
});