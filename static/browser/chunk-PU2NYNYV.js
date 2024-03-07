import{a as Ie}from"./chunk-M3OY3572.js";import{A as re,B as ae,C as oe,D as le,E as me,G as de,H as se,I as pe,J as ce,K as ue,L as fe,M as ve,N as ge,O as _e,P as xe,Q as Ce,R as Ee,S as he,T as be,U as ye,V as Se,f as G,g as Y,m as J,n as K,o as U,p as W,q as v,r as X,s as Z,t as F,u as x,v as ee,w as te,x as ie,y as ne,z as V}from"./chunk-ISQU5JJV.js";import{Ab as g,Cb as M,Dc as z,Ec as Q,Fb as E,Gc as H,Hb as h,J as O,Lb as j,Mb as q,Nb as L,Ob as R,Pb as o,Qb as T,Rb as f,Ya as m,Za as P,Zb as c,_b as u,ea as A,fa as I,g as S,ia as b,ja as y,nb as _,pa as $,pb as p,qa as w,yb as n,zb as r}from"./chunk-HAPHMHIP.js";var we=(()=>{let t=class t{constructor(){this.timeCorrector=i=>{if(/^[0-2][0-9]$/.test(i.value))i.setValue(`${i.value}:00`);else if(/^[0-2][0-9][0-9][0-9]$/.test(i.value)){let l=i.value.toString();i.setValue(`${l.substring(0,2)}:${l.substring(2,4)}`)}},this.timeValidator=i=>{if(/^[0-2][0-9]\:[0-9][0-9]$/.test(i.value))return null;{let l={};return l.time=i.value,l}},this.arrayValidator=i=>i.value?.length===0?{emptyArray:i.value?.length}:null,this.futureDateValidator=i=>{let l=new Date(i.value),e=new Date;if(e.setHours(0,0,0,0),l.getTime()<e.getTime()){let d={};return d.notInFuture=i.value,d}else return null}}};t.\u0275fac=function(l){return new(l||t)},t.\u0275prov=$({token:t,factory:t.\u0275fac,providedIn:"root"});let a=t;return a})();var Ve=["expansionPanel"];function Oe(a,t){a&1&&(n(0,"div",20),o(1," Non ci sono ancora rounds in questo evento... "),r())}function Pe(a,t){a&1&&(n(0,"div",29),o(1," Non ci sono ancora tavoli in questo round... "),r())}function Ge(a,t){if(a&1){let s=M();n(0,"div",30),c(1,"toFormGroup"),n(2,"span",22),o(3),r(),n(4,"mat-form-field",3)(5,"mat-label"),o(6,"Posti max"),r(),g(7,"input",31),n(8,"mat-error"),o(9),c(10,"formControlError"),r()(),n(11,"div",23)(12,"mat-form-field",3)(13,"mat-label"),o(14,"Posti ideali"),r(),g(15,"input",32),n(16,"mat-error"),o(17),c(18,"formControlError"),r()(),n(19,"mat-form-field",3)(20,"mat-label"),o(21,"Posti minimi"),r(),g(22,"input",33),n(23,"mat-error"),o(24),c(25,"formControlError"),r()()(),n(26,"div",14)(27,"button",28),E("click",function(){let e=b(s).$implicit,d=h().$implicit,C=h();return y(C.removeTable(d,e))}),o(28," Elimina "),r()()()}if(a&2){let s=t.$implicit,i=t.index;p("formGroup",u(1,5,s)),m(3),f("Tavolo ",i+1,""),m(6),f(" ",u(10,7,s.get("maximumSeats"))," "),m(8),f(" ",u(18,9,s.get("optimalSeats"))," "),m(7),f(" ",u(25,11,s.get("minimumSeats"))," ")}}function Ne(a,t){if(a&1){let s=M();n(0,"div",21),c(1,"toFormGroup"),n(2,"span",22),o(3),r(),n(4,"div",23)(5,"mat-form-field",3)(6,"mat-label"),o(7,"Inizio"),r(),g(8,"input",24),n(9,"mat-error"),o(10),c(11,"formControlError"),r()(),n(12,"mat-form-field",3)(13,"mat-label"),o(14,"Fine"),r(),g(15,"input",25),n(16,"mat-error"),o(17),c(18,"formControlError"),r()()(),_(19,Pe,2,0,"div",26),c(20,"toFormArray"),_(21,Ge,29,13,"div",27),c(22,"toFormArray"),n(23,"div",14)(24,"button",28),E("click",function(){let e=b(s).$implicit,d=h();return y(d.removeRound(e))}),o(25," Elimina "),r(),n(26,"button",15),E("click",function(){let e=b(s).$implicit,d=h();return y(d.addTable(e))}),o(27," Aggiungi "),r()()()}if(a&2){let s=t.$implicit,i=t.index;p("formGroup",u(1,6,s)),m(3),f("",i+1,"\xB0 Round"),m(7),f(" ",u(11,8,s.get("start"))," "),m(7),f(" ",u(18,10,s.get("end"))," "),m(2),p("ngIf",u(20,12,s.get("tables")).value.length<1),m(2),p("ngForOf",u(22,14,s.get("tables")).controls)}}function ke(a,t){a&1&&(n(0,"mat-card-title"),o(1," Eventi programmati "),r())}function De(a,t){a&1&&(n(0,"mat-card-title"),o(1," Nessun evento in programma "),r())}function Be(a,t){a&1&&(n(0,"mat-card-subtitle"),o(1," Qui sotto trovi gli eventi programmati "),r())}function Ae(a,t){a&1&&(n(0,"mat-card-subtitle"),o(1," Crea un nuovo evento dal pannello qui sopra per farlo "),r())}function $e(a,t){if(a&1&&(n(0,"div",29)(1,"div"),o(2),r()()),a&2){let s=t.index;m(2),f("Table ",s+1,"")}}function je(a,t){if(a&1&&(n(0,"div",20)(1,"div"),o(2),r(),_(3,$e,3,1,"div",38),r()),a&2){let s=t.$implicit,i=t.index;m(2),f("",i+1,"\xB0 Round"),m(),p("ngForOf",s.tables)}}function qe(a,t){if(a&1){let s=M();n(0,"mat-card",34)(1,"mat-card-header")(2,"mat-card-title"),o(3),r(),n(4,"mat-card-subtitle"),o(5),c(6,"date"),r()(),n(7,"mat-card-content",34)(8,"div",35),o(9),r(),_(10,je,4,2,"div",36),r(),n(11,"mat-card-footer")(12,"div",14)(13,"button",37),E("click",function(){let e=b(s).$implicit,d=h();return y(d.deleteEvent(e))}),o(14," Cancella Evento "),r()()()()}if(a&2){let s=t.$implicit,i=h();m(3),T(s.title),m(2),T(u(6,5,s.date)),m(4),T(s.description),m(),p("ngForOf",s.rounds),m(3),p("disabled",i.data.busy)}}function Le(a,t){a&1&&(n(0,"mat-card-title"),o(1," Eventi passati "),r())}function Re(a,t){a&1&&(n(0,"mat-card-title"),o(1," Nessun evento passato registrato "),r())}function ze(a,t){a&1&&(n(0,"mat-card-subtitle"),o(1," Qui sotto trovi gli eventi passati "),r())}function Qe(a,t){a&1&&g(0,"mat-card")}var Me=(()=>{let t=class t{constructor(i,l){this.data=i,this.utils=l,this.today=new Date().setHours(0,0,0,0),this.formGroup=new F({title:new x("",[v.required,v.minLength(1)]),description:new x(`Venite a giocare con noi!

L'evento \xE8 aperto a tutt\u0259: giocator\u0259 navigat\u0259 ed espert\u0259 ma anche, e soprattutto, debuttanti desiderosi di imparare.`,[v.required,v.minLength(1)]),date:new x(new Date,[this.utils.futureDateValidator]),location:new x("Spazio L'ove",[v.required,v.minLength(1)]),address:new x("Via Luganetto 1, 6962 Viganello",[v.required,v.minLength(1)]),rounds:new V([],[this.utils.arrayValidator])}),this.createRound=()=>{let e=new x("",[v.required,this.utils.timeValidator]);e.valueChanges.pipe(O(1e3)).subscribe(()=>{this.utils.timeCorrector(e)});let d=new x("",[v.required,this.utils.timeValidator]);return d.valueChanges.pipe(O(1e3)).subscribe(()=>{this.utils.timeCorrector(d)}),new F({start:e,end:d,tables:new V([],this.utils.arrayValidator)})},this.createTable=()=>new F({minimumSeats:new x,optimalSeats:new x,maximumSeats:new x(null,[v.required,v.min(1)])})}ngOnInit(){return S(this,null,function*(){let i=yield this.data.get("events");this.events=i.filter(l=>new Date(l.date).getTime()>=this.today),this.past=i.filter(l=>new Date(l.date).getTime()<this.today)})}addRound(){let i=this.formGroup.get("rounds"),l=this.createRound();if(i.length>0){let e=i.value.at(-1);Object.keys(e).forEach(d=>{if(d==="tables"){let C=new V([],[this.utils.arrayValidator]);e[d].forEach(k=>{let D=this.createTable();Object.keys(k).forEach(B=>{D.get(B).setValue(k[B])}),C.push(D)}),l.setControl(d,C)}else l.get(d).setValue(e[d])})}i.push(l)}removeRound(i){let l=this.formGroup.get("rounds"),e=l.controls.findIndex(d=>d===i);e>=0&&l.removeAt(e)}addTable(i){let l=i.get("tables"),e=this.createTable();if(l.length>0){let d=l.value.at(-1);Object.keys(d).forEach(C=>{e.get(C).setValue(d[C])})}l.push(e)}removeTable(i,l){let e=i.get("tables"),d=e.controls.findIndex(C=>C===l);d>=0&&e.removeAt(d)}save(){return S(this,null,function*(){this.formGroup.valid&&this.data.post("events",this.formGroup.getRawValue()).then(i=>{this.events.unshift(i),this.formGroup.get("rounds").clear(),this.formGroup.reset(),this.expansionPanel.close()})})}deleteEvent(i){return S(this,null,function*(){this.data.delete(`events/${i._id}`).then(()=>{this.events.splice(this.events.indexOf(i),1)})})}};t.\u0275fac=function(l){return new(l||t)(P(Ie),P(we))},t.\u0275cmp=A({type:t,selectors:[["app-events"]],viewQuery:function(l,e){if(l&1&&j(Ve,5),l&2){let d;q(d=L())&&(e.expansionPanel=d.first)}},decls:74,vars:35,consts:[[1,"medium"],["expansionPanel",""],[3,"formGroup"],["appearance","outline"],["matInput","","type","text","formControlName","title"],["matInput","","type","text","formControlName","description","rows","10"],["matInput","","formControlName","date",3,"matDatepicker","min"],["matIconSuffix","",3,"for"],["picker",""],[1,"row","ratio25-75"],["matInput","","type","text","formControlName","location","placeholder","Spazio L'ove"],["matInput","","type","text","formControlName","address","placeholder","Via Luganetto 1, 6962 Viganello"],["class","round",4,"ngIf"],["class","round box-shadow",3,"formGroup",4,"ngFor","ngForOf"],[1,"row","end"],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","primary",3,"disabled","click"],[4,"ngIf"],["class","event",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[1,"round"],[1,"round","box-shadow",3,"formGroup"],[1,"title"],[1,"row"],["matInput","","type","text","formControlName","start","placeholder","12:00"],["matInput","","type","text","formControlName","end","placeholder","14:00"],["class","table",4,"ngIf"],["class","table",3,"formGroup",4,"ngFor","ngForOf"],["mat-raised-button","","color","warn",1,"remove",3,"click"],[1,"table"],[1,"table",3,"formGroup"],["matInput","","type","number","formControlName","maximumSeats"],["matInput","","type","number","formControlName","optimalSeats"],["matInput","","type","number","formControlName","minimumSeats"],[1,"event"],[1,"description"],["class","round",4,"ngFor","ngForOf"],["mat-raised-button","","color","warn",3,"disabled","click"],["class","table",4,"ngFor","ngForOf"]],template:function(l,e){if(l&1&&(n(0,"mat-accordion",0)(1,"mat-expansion-panel",null,1)(3,"mat-expansion-panel-header")(4,"mat-panel-title"),o(5," Crea un nuovo evento "),r()(),n(6,"form",2)(7,"strong"),o(8,"Descrizione:"),r(),n(9,"mat-form-field",3)(10,"mat-label"),o(11,"Titolo"),r(),g(12,"input",4),n(13,"mat-error"),o(14),c(15,"formControlError"),r()(),n(16,"mat-form-field",3)(17,"mat-label"),o(18,"Descrizione"),r(),g(19,"textarea",5),n(20,"mat-error"),o(21),c(22,"formControlError"),r()(),n(23,"mat-form-field",3)(24,"mat-label"),o(25,"Data"),r(),g(26,"input",6)(27,"mat-datepicker-toggle",7)(28,"mat-datepicker",null,8),n(30,"mat-hint"),o(31,"DD/MM/YYYY"),r(),n(32,"mat-error"),o(33),c(34,"formControlError"),r()(),n(35,"div",9)(36,"mat-form-field",3)(37,"mat-label"),o(38,"Luogo"),r(),g(39,"input",10),n(40,"mat-error"),o(41),c(42,"formControlError"),r()(),n(43,"mat-form-field",3)(44,"mat-label"),o(45,"Indirizzo"),r(),g(46,"input",11),n(47,"mat-error"),o(48),c(49,"formControlError"),r()()(),_(50,Oe,2,0,"div",12),c(51,"toFormArray"),_(52,Ne,28,16,"div",13),c(53,"toFormArray"),n(54,"div",14)(55,"button",15),E("click",function(){return e.addRound()}),o(56," Aggiungi round "),r()(),n(57,"button",16),E("click",function(){return e.save()}),o(58," CREA "),r()()()(),n(59,"mat-card",0)(60,"mat-card-header"),_(61,ke,2,0,"mat-card-title",17)(62,De,2,0,"mat-card-title",17)(63,Be,2,0,"mat-card-subtitle",17)(64,Ae,2,0,"mat-card-subtitle",17),r(),n(65,"mat-card-content"),_(66,qe,15,7,"mat-card",18),r()(),n(67,"mat-card",0)(68,"mat-card-header"),_(69,Le,2,0,"mat-card-title",17)(70,Re,2,0,"mat-card-title",17)(71,ze,2,0,"mat-card-subtitle",17),r(),n(72,"mat-card-content"),_(73,Qe,1,0,"mat-card",19),r()()),l&2){let d=R(29);m(6),p("formGroup",e.formGroup),m(8),f(" ",u(15,21,e.formGroup.get("title"))," "),m(7),f(" ",u(22,23,e.formGroup.get("description"))," "),m(5),p("matDatepicker",d)("min",e.today),m(),p("for",d),m(6),f(" ",u(34,25,e.formGroup.get("date"))," "),m(8),f(" ",u(42,27,e.formGroup.get("location"))," "),m(7),f(" ",u(49,29,e.formGroup.get("address"))," "),m(2),p("ngIf",u(51,31,e.formGroup.get("rounds")).value.length<1),m(2),p("ngForOf",u(53,33,e.formGroup.get("rounds")).controls),m(5),p("disabled",e.data.busy||!e.formGroup.valid),m(4),p("ngIf",(e.events==null?null:e.events.length)>0),m(),p("ngIf",(e.events==null?null:e.events.length)===0),m(),p("ngIf",(e.events==null?null:e.events.length)>0),m(),p("ngIf",(e.events==null?null:e.events.length)===0),m(2),p("ngForOf",e.events),m(3),p("ngIf",(e.past==null?null:e.past.length)>0),m(),p("ngIf",(e.past==null?null:e.past.length)===0),m(),p("ngIf",(e.past==null?null:e.past.length)>0),m(2),p("ngForOf",e.past)}},dependencies:[z,Q,ee,W,te,X,Z,re,ae,le,se,de,me,oe,_e,xe,Ce,ye,Ee,he,be,ve,pe,ue,ce,fe,ge,ie,ne,H,K,J,U],styles:[".round[_ngcontent-%COMP%]{position:relative;border-radius:1rem;display:flex;flex-direction:column;gap:1rem;margin:0 1rem;padding:2rem;background-color:#f7f7f7}@media only screen and (max-width: 600px){.round[_ngcontent-%COMP%]{margin:0;padding:1rem .8rem}}.round[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{position:relative;border-radius:1rem;display:flex;flex-direction:column;gap:1rem;margin:0 1rem;padding:2rem;background-color:#dcdcdc}@media only screen and (max-width: 600px){.round[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]{margin:0;padding:1rem .8rem}}.title[_ngcontent-%COMP%]{position:absolute;top:-.75rem;font-weight:700}.event[_ngcontent-%COMP%]{margin-bottom:2rem}.event[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1rem;gap:.5rem}.event[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{border-left:2px solid rgba(50,50,50,.5);padding:1rem;white-space:break-spaces}.event[_ngcontent-%COMP%]   mat-card-footer[_ngcontent-%COMP%]{padding:1rem}"],data:{animation:[Y]}});let a=t;return a})();var He=[{path:"",redirectTo:"events",pathMatch:"full"},{path:"events",component:Me}],Te=(()=>{let t=class t{};t.\u0275fac=function(l){return new(l||t)},t.\u0275mod=I({type:t}),t.\u0275inj=w({imports:[G.forChild(He),G]});let a=t;return a})();var _t=(()=>{let t=class t{};t.\u0275fac=function(l){return new(l||t)},t.\u0275mod=I({type:t}),t.\u0275inj=w({imports:[Se,Te]});let a=t;return a})();export{_t as AdminModule};
