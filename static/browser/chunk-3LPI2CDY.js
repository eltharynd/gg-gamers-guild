import{A as q,B as R,C as H,D as P,E as z,F as A,G as J,I as K,J as Q,M as W,N as X,V as Y,e as L,f as v,k as V,n as F,p as T,q as h,r as j,s as k,t as U,u as y,v as D,x as B,y as O}from"./chunk-R5BHZFBV.js";import{Ab as x,Cb as _,Ec as N,Fb as g,Hb as s,Pb as a,Rb as b,Ya as l,Za as C,Zb as w,_b as S,ea as E,fa as p,g as G,ia as d,ja as u,nb as I,pb as c,qa as f,yb as o,zb as n}from"./chunk-HAPHMHIP.js";function et(e,t){if(e&1){let r=_();o(0,"mat-card",1)(1,"mat-card-header")(2,"mat-card-title"),a(3," Login "),n(),o(4,"mat-card-subtitle"),a(5," Effettua il login per accedere al pannello admin "),n()(),o(6,"mat-card-content")(7,"form",2),g("ngSubmit",function(){d(r);let i=s();return u(i.loginSubmit())}),o(8,"mat-form-field",3)(9,"mat-label"),a(10,"email"),n(),x(11,"input",4),o(12,"mat-error"),a(13),w(14,"formControlError"),n()(),o(15,"mat-form-field",3)(16,"mat-label"),a(17,"password"),n(),x(18,"input",5),o(19,"mat-error"),a(20),w(21,"formControlError"),n()()()(),o(22,"mat-card-actions",6)(23,"button",7),g("click",function(){d(r);let i=s();return u(i.loginSubmit())}),a(24," LOGIN "),n()()()}if(e&2){let r=s();l(7),c("formGroup",r.formGroup),l(6),b(" ",S(14,4,r.formGroup.get("email"))," "),l(7),b(" ",S(21,6,r.formGroup.get("password"))," "),l(3),c("disabled",!r.formGroup.valid||r.auth.busy)}}function it(e,t){if(e&1){let r=_();o(0,"mat-card",1)(1,"mat-card-header")(2,"mat-card-title"),a(3," Logout "),n()(),o(4,"mat-card-content")(5,"button",8),g("click",function(){d(r);let i=s();return u(i.auth.logout())}),a(6," LOGOUT "),n()()()}if(e&2){let r=s();l(5),c("disabled",!r.auth.authenticatedUser)}}var $=(()=>{let t=class t{constructor(m,i){this.auth=m,this.router=i,this.formGroup=new U({email:new y("",[h.email,h.required]),password:new y("",[h.required])})}loginSubmit(){return G(this,null,function*(){this.formGroup.valid&&this.auth.login(this.formGroup.getRawValue()).then(()=>{this.auth.authenticatedUser.admin?this.router.navigate(["/admin"]):this.router.navigate(["/"])})})}};t.\u0275fac=function(i){return new(i||t)(C(V),C(L))},t.\u0275cmp=E({type:t,selectors:[["app-login"]],decls:2,vars:2,consts:[["class","medium",4,"ngIf"],[1,"medium"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","email","formControlName","email"],["matInput","","type","password","formControlName","password"],["align","end"],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","",3,"disabled","click"]],template:function(i,M){i&1&&I(0,et,25,8,"mat-card",0)(1,it,7,1,"mat-card",0),i&2&&(c("ngIf",!M.auth.authenticatedUser),l(),c("ngIf",M.auth.authenticatedUser))},dependencies:[N,D,T,j,k,q,R,A,P,J,z,H,W,K,Q,X,B,O,F]});let e=t;return e})();var rt=[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:$}],tt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=p({type:t}),t.\u0275inj=f({imports:[v.forChild(rt),v]});let e=t;return e})();var vt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=p({type:t}),t.\u0275inj=f({imports:[Y,tt]});let e=t;return e})();export{vt as AuthModule};
