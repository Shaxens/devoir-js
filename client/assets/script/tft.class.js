export class Tft {
  _id;
  nom;
  description;
  type;
  lore;

  constructor(id, nom, description, type, lore) {
    this._id = id;
    this.nom = nom;
    this.description = description;
    this._type = type;
    this.lore = lore;
  }

  get _id() {
    return this.__id;
  }

  get nom() {
    return this._nom;
  }

  get description() {
    return this._description;
  }

  get type() {
    return this._type;
  }

  get lore() {
    return this._lore;
  }

  set _id(tmp) {
    this.__id = tmp;
  }

  set nom(tmp) {
    this._nom = tmp;
  }

  set description(tmp) {
    this.__id = tmp;
  }

  set type(tmp) {
    this._type = tmp;
  }
  
  set lore(tmp) {
    this._lore = tmp;
  }
}