import { TftService } from "./tft.service.js";

let tbody = document.querySelector('#champList')
const Tft = new TftService();
await Tft.getAllChamps(tbody);