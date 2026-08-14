#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const read = file => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
const write = (file, data) => fs.writeFileSync(path.join(ROOT, file), JSON.stringify(data, null, 2) + "\n");
const unique = values => [...new Set(values.map(v => String(v || "").trim()).filter(Boolean))];

const boats = read("boatmodels.json");
const existing = read("data/model-search-aliases.json");
const overrides = new Map(existing.map(item => [item.BoatModelID, item]));

function stripManufacturer(text, manufacturer) {
  const value = String(text || "").trim();
  const maker = String(manufacturer || "").trim();
  if (!value || !maker) return value;
  return value.replace(new RegExp(`^${maker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+`, "i"), "").trim();
}

const aliases = boats.map(boat => {
  const prior = overrides.get(boat.BoatModelID) || {};
  const model = String(boat.Model || "").trim();
  const variant = String(boat.Variant || "").trim();
  const nicknameModel = stripManufacturer(boat.Nickname, boat.Manufacturer);
  const canonicalName = [boat.Manufacturer, model, variant && !model.toLowerCase().includes(variant.toLowerCase()) ? variant : ""]
    .filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  const generatedModelTerms = unique([
    model,
    variant && !model.toLowerCase().includes(variant.toLowerCase()) ? `${model} ${variant}` : "",
    nicknameModel
  ]);
  return {
    BoatModelID: boat.BoatModelID,
    CanonicalName: prior.CanonicalName || canonicalName,
    ManufacturerTerms: unique([...(prior.ManufacturerTerms || []), boat.Manufacturer]),
    ModelTerms: unique([...(prior.ModelTerms || []), ...generatedModelTerms]),
    SourceModelTerms: prior.SourceModelTerms || {}
  };
}).sort((a,b) => a.BoatModelID.localeCompare(b.BoatModelID));

write("data/model-search-aliases.json", aliases);
console.log(`Generated search aliases for ${aliases.length} models.`);
