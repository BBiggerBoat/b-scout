(function(root){
"use strict";
const ACCESS_KEY="bscoutModeratorTestModeV1";
function isLocalHost(){
  const h=String(root.location?.hostname||"").toLowerCase();
  return h==="localhost"||h==="127.0.0.1"||h==="::1"||h.endsWith(".local")||/^10\./.test(h)||/^192\.168\./.test(h)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(h);
}
function queryEnabled(){
  try{const q=new URLSearchParams(root.location.search);return q.get("developer")==="1"||q.get("moderator")==="1";}catch{return false}
}
function enabled(){
  try{return isLocalHost()||queryEnabled()||root.localStorage?.getItem(ACCESS_KEY)==="1";}catch{return isLocalHost()||queryEnabled()}
}
function enable(){try{root.localStorage?.setItem(ACCESS_KEY,"1")}catch{};show()}
function disable(){try{root.localStorage?.removeItem(ACCESS_KEY)}catch{};show()}
function show(){
  const visible=enabled();
  ["moderatorAccessLink","moderatorTopAccessLink"].forEach(id=>{
    const link=document.getElementById(id);
    if(link)link.hidden=!visible;
  });
}
root.BScoutModeratorAccess={enabled,enable,disable};
document.addEventListener("DOMContentLoaded",show);
})(window);
