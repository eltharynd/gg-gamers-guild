import{a as K}from"./chunk-25MJONB5.js";import{E as se,F as P,G as w,H as k,I,K as S,Z as pe,_ as me,d as re,g as ae,h as Z,i as Y,k as J,l as oe,o as ce}from"./chunk-YZWH4UJS.js";import{$b as z,$c as W,Ab as M,Eb as j,Hb as R,Hc as B,Ic as ie,Jb as y,Jc as V,Lc as H,Rb as c,Tb as h,Ub as te,Uc as Q,Vc as q,Ya as p,Yc as f,Za as b,Zc as E,_b as $,_c as X,bc as G,cc as U,ea as C,fa as D,g as x,ia as A,ja as L,nb as O,pb as l,qa as N,qc as ne,rb as ee,yb as a,zb as o}from"./chunk-AGJLDZAF.js";var de=(()=>{let e=class e{constructor(){}ngOnInit(){return x(this,null,function*(){})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C({type:e,selectors:[["app-about"]],decls:1,vars:0,template:function(t,i){t&1&&c(0,`About Works!
`)}});let n=e;return n})();function Me(n,e){if(n&1){let s=j();a(0,"button",9),R("click",function(){A(s);let t=y().$implicit,i=y();return L(i.add(t))}),c(1," AGGIUNGI PARTY (TEST) "),o()}}function xe(n,e){if(n&1&&M(0,"app-table",10),n&2){let s=e.$implicit;l("table",s)}}function Oe(n,e){if(n&1&&(a(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title"),c(3),O(4,Me,2,0,"button",7),o(),a(5,"mat-card-subtitle"),c(6),o()(),a(7,"mat-card-content"),O(8,xe,1,1,"app-table",8),o()()),n&2){let s=e.$implicit,r=e.index,t=y();p(3),h(" Tavoli del ",r+1,"\xB0 Round "),p(),l("ngIf",t.auth==null||t.auth.authenticatedUser==null?null:t.auth.authenticatedUser.admin),p(2),te("",s.start," - ",s.end,""),p(2),l("ngForOf",s.tables)}}var ye=n=>({"background-image":n}),Pe=()=>({}),ue=(()=>{let e=class e{constructor(r,t,i,d){this.data=r,this.auth=t,this.cdr=i,this.activatedRoute=d,this.pictureURL=`${J.API_BASE_URL}uploads/`,this.id=0}ngOnInit(){return x(this,null,function*(){let r=yield this.data.get(`events/${this.activatedRoute.snapshot.paramMap.get("eventId")}`);if(r){for(let t of r.rounds)for(let i of t.tables)i.parties=[];for(let t of r.rounds){let i=[],d=parseInt((Math.random()*3).toFixed(0))+1;for(let u=0;u<d;u++){let T=[],m=parseInt((Math.random()*2).toFixed(0));for(let g=0;g<m;g++)T.push({name:`Follower${this.id++}`});i.push({leader:{name:`Leader${this.id++}`},partners:T,registered:new Date})}t.parties=i}for(let t of r.rounds)this.sortParties(t);this.event=r}})}add(r){let t=[],i=parseInt((Math.random()*2).toFixed(0));for(let u=0;u<i;u++)t.push({name:`Follower${this.id++}`});r.parties.push({leader:{name:`Leader${this.id++}`},partners:t,registered:new Date}),this.sortParties(r);let d=this.event;this.event=null,this.cdr.detectChanges(),this.event=d}sortParties(r){let t=r.tables,i=[...r.parties].sort((d,u)=>u.partners.length-d.partners.length===0?new Date(d.registered).getTime()-new Date(u.registered).getTime():u.partners.length-d.partners.length);for(t.forEach(d=>d.parties=[]);i.length;){let d=i.splice(0,1),u=t.sort((m,g)=>g.parties.map(v=>v.partners.length+1).reduce((v,_)=>v+_,0)-m.parties.map(v=>v.partners.length+1).reduce((v,_)=>v+_,0)),T=d.map(m=>m.partners.length+1).reduce((m,g)=>m+g,0);for(let m of u){let g=m.parties.map(_=>_.partners.length+1).reduce((_,he)=>_+he,0),v=g+T;if(g<m.minimumSeats||v<m.minimumSeats){m.parties=m.parties.concat(d);break}else u.indexOf(m)===u.length-1&&(m.parties=m.parties.concat(d))}}}};e.\u0275fac=function(t){return new(t||e)(b(K),b(oe),b(ne),b(re))},e.\u0275cmp=C({type:e,selectors:[["app-event"]],decls:14,vars:10,consts:[[1,"event","medium"],[1,"title"],[1,"picture",3,"ngStyle"],[1,"desc","centered"],[1,"text"],["class","round",4,"ngFor","ngForOf"],[1,"round"],["mat-raised-button","","color","primary","style","margin-left: 2rem",3,"click",4,"ngIf"],["class","table",3,"table",4,"ngFor","ngForOf"],["mat-raised-button","","color","primary",2,"margin-left","2rem",3,"click"],[1,"table",3,"table"]],template:function(t,i){t&1&&(a(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title",1),c(3),o(),a(4,"mat-card-subtitle"),c(5),G(6,"date"),o()(),a(7,"mat-card-content")(8,"div")(9,"div",2)(10,"div",3)(11,"div",4),c(12),o()()()()()(),O(13,Oe,9,5,"mat-card",5)),t&2&&(p(3),h(" ",i.event==null?null:i.event.title," "),p(2),h(" ",U(6,5,i.event==null?null:i.event.date)," "),p(4),l("ngStyle",i.event!=null&&i.event.picture?z(7,ye,"url("+i.pictureURL+i.event.picture+")"):$(9,Pe)),p(3),h(" ",i.event==null?null:i.event.description," "),p(),l("ngForOf",i.event==null?null:i.event.rounds))},dependencies:[B,ie,V,se,P,k,S,I,w,ce,H],styles:[".event[_ngcontent-%COMP%]{margin-bottom:2rem}.event[_ngcontent-%COMP%] > mat-card-content[_ngcontent-%COMP%]{transform-origin:top center}.event[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{position:relative}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]{background-image:url(/assets/skeletons/event.png);background-position:center;background-size:cover;width:100%;aspect-ratio:1;margin-top:1rem;display:flex;flex-direction:column;justify-content:space-between}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%]{flex-grow:1;padding:1rem 2rem}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] > .text[_ngcontent-%COMP%]{font-size:1.2rem;border-radius:1rem;padding:1rem 2rem;flex-grow:1;white-space:break-spaces;-webkit-backdrop-filter:blur(2px) brightness(.6) sepia(.1);backdrop-filter:blur(2px) brightness(.6) sepia(.1);color:#fff}@media screen and (max-width: 600px){.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] > .text[_ngcontent-%COMP%]{font-size:1rem;padding:.5rem 1 rem}}.round[_ngcontent-%COMP%]{margin-bottom:1rem}.round[_ngcontent-%COMP%] > mat-card-content[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center}.round[_ngcontent-%COMP%]:last-of-type{margin-bottom:10rem}"]});let n=e;return n})();var we=n=>({"background-image":n}),ke=()=>({});function Ie(n,e){if(n&1){let s=j();a(0,"mat-card",1)(1,"mat-card-header",2),R("click",function(){let i=A(s).$implicit;return L(i.expanded=!i.expanded)}),a(2,"mat-card-title",3),c(3),o(),a(4,"mat-card-subtitle"),c(5),G(6,"date"),o(),a(7,"div",4),M(8,"mat-icon",5),o()(),a(9,"mat-card-content")(10,"div")(11,"div",6)(12,"div",7)(13,"div",8),c(14),o()(),a(15,"div",9),M(16,"mat-icon",10),o()()()()()}if(n&2){let s=e.$implicit,r=y();l("@popIn",void 0),p(3),h(" ",s.title," "),p(2),h(" ",U(6,11,s.date)," "),p(3),ee("expanded",!!s.expanded),l("fontIcon","expand_more")("inline",!0),p(),l("@expansion",!!s.expanded),p(2),l("ngStyle",s.picture?z(13,we,"url("+r.pictureURL+s.picture+")"):$(15,ke)),p(3),h(" ",s.description," "),p(),l("routerLink",""+s._id)}}var fe=(()=>{let e=class e{constructor(r){this.data=r,this.pictureURL=`${J.API_BASE_URL}uploads/`}ngOnInit(){return x(this,null,function*(){this.events=yield this.data.get("events")})}};e.\u0275fac=function(t){return new(t||e)(b(K))},e.\u0275cmp=C({type:e,selectors:[["app-events"]],decls:1,vars:1,consts:[["class","event small",4,"ngFor","ngForOf"],[1,"event","small"],[3,"click"],[1,"title"],[1,"expander"],[3,"fontIcon","inline"],[1,"picture",3,"ngStyle"],[1,"desc","centered"],[1,"text"],[1,"arrow",3,"routerLink"],["aria-hidden","false","aria-label","Apri","fontIcon","chevron_right","inline","true"]],template:function(t,i){t&1&&O(0,Ie,17,16,"mat-card",0),t&2&&l("ngForOf",i.events)},dependencies:[B,V,P,k,S,I,w,pe,ae,H],styles:[".event[_ngcontent-%COMP%]{margin-bottom:2rem;cursor:pointer}.event[_ngcontent-%COMP%] > mat-card-content[_ngcontent-%COMP%]{transform-origin:top center}.event[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{position:relative}.event[_ngcontent-%COMP%]   .expander[_ngcontent-%COMP%]{position:absolute;right:1rem;font-size:2rem;top:calc(50% - .5rem)}.event[_ngcontent-%COMP%]   .expander[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{transition:all .2s ease}.event[_ngcontent-%COMP%]   .expander[_ngcontent-%COMP%] > .expanded[_ngcontent-%COMP%]{transform:rotate(-180deg)}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]{background-image:url(/assets/skeletons/event.png);background-position:center;background-size:cover;width:100%;aspect-ratio:1;margin-top:1rem;display:flex;flex-direction:column;justify-content:space-between}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%]{flex-grow:1;padding:1rem 2rem}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] > .text[_ngcontent-%COMP%]{font-size:1.2rem;border-radius:1rem;padding:1rem 2rem;flex-grow:1;white-space:break-spaces;-webkit-backdrop-filter:blur(2px) brightness(.6) sepia(.1);backdrop-filter:blur(2px) brightness(.6) sepia(.1);color:#fff}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;padding-right:.8rem;padding-bottom:.8rem}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:4rem;padding:.5rem;color:#fff;-webkit-backdrop-filter:blur(2px) brightness(.7) sepia(.1);backdrop-filter:blur(2px) brightness(.7) sepia(.1);border-radius:50%}.event[_ngcontent-%COMP%]   .picture[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]:hover > mat-icon[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(2px) brightness(.8) sepia(.1);backdrop-filter:blur(2px) brightness(.8) sepia(.1);transform-origin:center;transform:scale(1.1)}"],data:{animation:[Y,Q("expansion",[E("true",f({opacity:1,"max-height":"100vh"})),E("false",f({opacity:0,"max-height":0})),W("false => true",q("750ms ease",X([f({opacity:0,"max-height":0}),f({opacity:0,"max-height":"100vh"}),f({opacity:1,"max-height":"100vh"})]))),W("true => false",q("750ms ease",X([f({opacity:1,"max-height":"100vh"}),f({opacity:0,"max-height":"100vh"}),f({opacity:0,"max-height":0})])))]),Q("opacity",[E("true",f({opacity:1})),E("false",f({opacity:0})),W("false <=> true",q("1000ms ease"))])]}});let n=e;return n})();var ge=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C({type:e,selectors:[["app-home"]],decls:15,vars:1,consts:[[1,"medium"]],template:function(t,i){t&1&&(a(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),c(3,"COMING SOON!"),o(),a(4,"mat-card-subtitle"),c(5," We're hard at work to bring you an awesome service! "),o()(),a(6,"mat-card-content")(7,"p"),c(8,"La GG Gamer's Guild Lugano ti da il benvenuto!"),o(),a(9,"p"),c(10," Su questo sito potrai scoprari di pi\xFA su di noi, e riservare posti per gli eventi che organizziamo! "),M(11,"br"),c(12," L'idea \xE8 quella di rendere pi\xFA facile la prenotazione, e allo stesso modo di smistare meglio i tavoli lasciandovi per\xF3 la possibilit\xE0 di giocare coi vosti amici. "),o(),a(13,"p"),c(14,"Torna pi\xFA tardi per scoprire quanto sar\xE0 cambiato!!!"),o()()()),t&2&&l("@popIn",void 0)},dependencies:[P,k,S,I,w],data:{animation:[Y]}});let n=e;return n})();var Se=[{path:"",component:ge},{path:"about",component:de},{path:"events",component:fe},{path:"events/:eventId",component:ue}],ve=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=D({type:e}),e.\u0275inj=N({imports:[Z.forChild(Se),Z]});let n=e;return n})();var st=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=D({type:e}),e.\u0275inj=N({imports:[me,ve]});let n=e;return n})();export{st as PagesModule};
