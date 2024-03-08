import{A as q,B as O,C as P,D as R,E as H,F as z,G as A,I as J,J as K,M as Q,N as W,V as X,e as N,f as M,j as F,n as V,p as L,q as u,r as j,s as T,t as D,u as y,v as U,x as k,y as B}from"./chunk-XJ275RIB.js";import{Ab as x,Cb as _,Ec as E,Fb as w,Hb as d,Pb as n,Rb as S,Ya as s,Za as C,Zb as b,_b as v,ea as G,fa as l,g as f,ia as h,ja as g,nb as I,pb as c,qa as p,yb as r,zb as a}from"./chunk-HAPHMHIP.js";function et(e,t){if(e&1){let o=_();r(0,"mat-card",1)(1,"mat-card-header")(2,"mat-card-title"),n(3," Login "),a(),r(4,"mat-card-subtitle"),n(5," Effettua il login per accedere al pannello admin "),a()(),r(6,"mat-card-content")(7,"form",2),w("ngSubmit",function(){h(o);let i=d();return g(i.loginSubmit())}),r(8,"mat-form-field",3)(9,"mat-label"),n(10,"email"),a(),x(11,"input",4),r(12,"mat-error"),n(13),b(14,"formControlError"),a()(),r(15,"mat-form-field",3)(16,"mat-label"),n(17,"password"),a(),x(18,"input",5),r(19,"mat-error"),n(20),b(21,"formControlError"),a()()()(),r(22,"mat-card-actions",6)(23,"button",7),w("click",function(){h(o);let i=d();return g(i.loginSubmit())}),n(24," LOGIN "),a()()()}if(e&2){let o=d();s(7),c("formGroup",o.formGroup),s(6),S(" ",v(14,4,o.formGroup.get("email"))," "),s(7),S(" ",v(21,6,o.formGroup.get("password"))," "),s(3),c("disabled",!o.formGroup.valid||o.auth.busy)}}var Z=(()=>{let t=class t{constructor(m,i){this.auth=m,this.router=i,this.formGroup=new D({email:new y("",[u.email,u.required]),password:new y("",[u.required])})}ngOnInit(){return f(this,null,function*(){yield this.auth.resumeDoneEmitter.toPromise(),this.auth.authenticatedUser&&(this.auth.authenticatedUser.admin?this.router.navigate(["/admin"]):this.router.navigate(["/"]))})}loginSubmit(){return f(this,null,function*(){this.formGroup.valid&&this.auth.login(this.formGroup.getRawValue()).then(()=>{this.auth.authenticatedUser.admin?this.router.navigate(["/admin"]):this.router.navigate(["/"])})})}};t.\u0275fac=function(i){return new(i||t)(C(F),C(N))},t.\u0275cmp=G({type:t,selectors:[["app-login"]],decls:1,vars:1,consts:[["class","small",4,"ngIf"],[1,"small"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","email","formControlName","email"],["matInput","","type","password","formControlName","password"],["align","end"],["mat-raised-button","","color","primary",3,"disabled","click"]],template:function(i,tt){i&1&&I(0,et,25,8,"mat-card",0),i&2&&c("ngIf",!tt.auth.authenticatedUser)},dependencies:[E,U,L,j,T,q,O,z,R,A,H,P,Q,J,K,W,k,B,V]});let e=t;return e})();var it=[{path:"",redirectTo:"login",pathMatch:"prefix"},{path:"login",component:Z}],$=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[M.forChild(it),M]});let e=t;return e})();var vt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=l({type:t}),t.\u0275inj=p({imports:[X,$]});let e=t;return e})();export{vt as AuthModule};
