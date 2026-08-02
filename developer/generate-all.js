#!/usr/bin/env node
"use strict";
const { execFileSync } = require("child_process");
const path = require("path");
const run = file => execFileSync(process.execPath, [path.join(__dirname, file)], { stdio: "inherit" });
run("generate-knowledge-cards.js");
run("generate-developer-reports.js");
