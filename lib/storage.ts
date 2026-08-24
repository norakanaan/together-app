import {AppData,CheckInSession} from './types';
export const KEY='together.app.v1';
export const defaults:AppData={settings:{checkInFrequency:'none',privateMode:false,partnerNames:['Partner A','Partner B']},sessions:[]};
export function load():AppData{if(typeof window==='undefined')return defaults;try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(!x||!Array.isArray(x.sessions)||!x.settings)return structuredClone(defaults);return x}catch{return structuredClone(defaults)}}
export function save(d:AppData){localStorage.setItem(KEY,JSON.stringify(d))}
export function newSession(type:'quick'|'weekly'|'deep',names:[string,string],ids:string[]):CheckInSession{return{id:crypto.randomUUID(),type,createdAt:new Date().toISOString(),partners:[{id:'a',displayName:names[0]||'Partner A'},{id:'b',displayName:names[1]||'Partner B'}],questionIds:ids,answers:[]}}
