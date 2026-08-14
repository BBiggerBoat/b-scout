"use strict";
const adapters = [require("./united-city"), require("./pop-yachts"), require("./denison")];
module.exports = new Map(adapters.map(adapter => [adapter.sourceId, adapter]));
