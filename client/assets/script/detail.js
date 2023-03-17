import { TftService } from "./tft.service.js";

let imgChamp = document.querySelector('#imgChamp');
let title = document.querySelector('#title');
let headTitle = document.querySelector('#headTitle');
let descChamp = document.querySelector('#descChamp');
let loreChamp = document.querySelector('#loreChamp');
let imgItem = document.querySelector('#imgItem');
let descItem = document.querySelector('#descItem');
let loreItem = document.querySelector('#loreItem');

let id = window.location.hash.substring(1);

let tftService = new TftService();
let data = await tftService.get(id);

console.log(data)

title.innerText = data.titleChamp;
headTitle.innerText = data.titleChamp;
imgChamp.src = data.imgChamp[0];
console.log(data.titleChamp)
descChamp.innerText = data.descChamp;
loreChamp.innerText = data.loreChamp;

descItem.innerText = data.items[0].name;
imgItem.src = data.itemsImg[0].image;