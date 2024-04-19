"use strict";(self.webpackChunkapp_shell=self.webpackChunkapp_shell||[]).push([[580],{6580:(D,c,n)=>{n.r(c),n.d(c,{CustomerModule:()=>S});var g=n(2020),C=n(7288),v=n(344),p=n(1368),s=n(4716),a=n(5904),b=n(232),u=n(6835),I=n(2736),d=n(3420),m=n(4493),t=n(4496),F=n(48);let f=(()=>{class o{constructor(r){this.socket=r,this.title="customer",this.socket.initialize("http://localhost:3000")}ngOnDestroy(){this.socket.disconnect()}static#t=this.\u0275fac=function(e){return new(e||o)(t.GI1(m.SocketService))};static#o=this.\u0275cmp=t.In1({type:o,selectors:[["app-root"]],decls:3,vars:0,consts:[["id","customer"]],template:function(e,i){1&e&&(t.I0R(0,"div",0)(1,"lib-masterpage"),t.wR5(2,"router-outlet"),t.C$Y()())},dependencies:[a.cP,F.I],styles:["#customer .bg{background:linear-gradient(to right,#004b75,#00d0cd);min-height:200px}#customer .bg+.container{margin-top:-150px}#customer .quote-container{max-width:480px;margin:auto}#customer h1{font-size:1.5rem;color:#004b75}@media (min-width: 768px){#customer h1{font-size:2rem}}#customer h2{font-size:1rem;font-weight:700}#customer a,#customer a:link{color:#00a39e}\n"],encapsulation:2})}return o})();(0,m.actionCreator)("QUOTE_CHANGED");let h=(()=>{class o{constructor(){this.agentId=""}submitForm(r){r&&(this.agentId="agent1234")}static#t=this.\u0275fac=function(e){return new(e||o)};static#o=this.\u0275prov=t.wxM({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var q=n(1460);let R=(()=>{class o{constructor(r,e,i,l){this.fb=r,this.router=e,this.socket=i,this.quotingSvc=l,this.loginFrm=this.fb.group({nameLast:"Smith",ssnLast4:"1234",applicationNumbner:""}),this.formOptions={submitButton:{label:"Continue"}},this.formModel=[{label:"Last Name",type:"formField",formFieldType:"text",field:"nameLast"},{label:"Last 4 SSN",type:"formField",formFieldType:"text",field:"ssnLast4",maxLength:4},{type:"html",html:'<div class="text-center"><strong>OR</strong></div>'},{label:"Application Number",type:"formField",formFieldType:"text",field:"applicationNumbner"}]}onFormCompleted(){this.socket.registerUser(this.loginFrm.value.ssnLast4??"1234"),this.quotingSvc.submitForm(this.loginFrm.value),this.router.navigate(["./quote"])}static#t=this.\u0275fac=function(e){return new(e||o)(t.GI1(s.FormBuilder),t.GI1(a.E5),t.GI1(m.SocketService),t.GI1(h))};static#o=this.\u0275cmp=t.In1({type:o,selectors:[["app-home"]],decls:7,vars:4,consts:[[1,"bg"],[1,"container"],[2,"max-width","480px","margin","auto"],[3,"formModel","formGroup","options","disableSubmit","completed"]],template:function(e,i){1&e&&(t.wR5(0,"div",0),t.I0R(1,"div",1)(2,"p-card")(3,"div",2)(4,"h1"),t.OEk(5,"Retrieve Your Application"),t.C$Y(),t.I0R(6,"lib-form-generator",3),t.qCj("completed",function(){return i.onFormCompleted()}),t.C$Y()()()()),2&e&&(t.yG2(6),t.E7m("formModel",i.formModel)("formGroup",i.loginFrm)("options",i.formOptions)("disableSubmit",!1))},dependencies:[q.U,u.Card,s.NgControlStatusGroup,s.FormGroupDirective]})}return o})(),w=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#o=this.\u0275cmp=t.In1({type:o,selectors:[["app-products"]],decls:2,vars:0,template:function(e,i){1&e&&(t.I0R(0,"p"),t.OEk(1,"products works!"),t.C$Y())}})}return o})();var Y=n(4680),O=n(5124);function E(o,A){1&o&&(t.I0R(0,"span",12),t.OEk(1,"+ "),t.C$Y())}const $=()=>["Yes","No"];let x=(()=>{class o{constructor(r){this.fb=r,this.formDefaults=null,this.debounceForm=250,this.emitOnload=!0,this.quoteFrm=this.fb.group({loanAmount:[6e3],loanDuration:[48],monthlyIncome:[2e3],creditScore:[650],apr:[21],collateral:["Yes"]}),this.quoteFormChanged=new t._w7,this.sub=this.quoteFrm.valueChanges.pipe((0,Y.o)(250)).subscribe(e=>this.quoteFormChanged.emit(e))}ngOnInit(){this.formDefaults&&this.quoteFrm.patchValue({...this.quoteFrm.value,...this.formDefaults}),this.emitOnload&&this.quoteFormChanged.emit(this.quoteFrm.value)}ngOnChanges(r){r.formDefaults&&this.formDefaults&&this.quoteFrm.patchValue(this.formDefaults)}ngOnDestroy(){this.sub.unsubscribe()}static#t=this.\u0275fac=function(e){return new(e||o)(t.GI1(s.FormBuilder))};static#o=this.\u0275cmp=t.In1({type:o,selectors:[["lib-quote-form"]],inputs:{formDefaults:"formDefaults",debounceForm:"debounceForm",emitOnload:"emitOnload"},outputs:{quoteFormChanged:"quoteFormChanged"},features:[t.SYr],decls:58,vars:30,consts:[[1,"quote-form",3,"formGroup"],[1,"quote-selector"],[1,"label"],[1,"value"],["formControlName","loanAmount",3,"min","max","step"],[1,"quote-range"],["class","nudge-left"],["formControlName","monthlyIncome",3,"min","max","step"],["formControlName","loanDuration",3,"min","max","step"],["formControlName","apr",3,"min","max","step"],[1,"label","mb-2"],["styleClass","w-100-mobile","formControlName","collateral",3,"options"],[1,"nudge-left"]],template:function(e,i){1&e&&(t.I0R(0,"form",0)(1,"div",1)(2,"p",2),t.OEk(3,"Desired Loan Amount"),t.C$Y(),t.I0R(4,"p",3),t.OEk(5),t.wVc(6,"currency"),t.C$Y(),t.I0R(7,"p"),t.wR5(8,"p-slider",4),t.C$Y(),t.I0R(9,"div",5)(10,"div"),t.OEk(11,"$1,000"),t.C$Y(),t.I0R(12,"div"),t.OEk(13,"$15,000"),t.C$Y()()(),t.I0R(14,"div",1)(15,"p",2),t.OEk(16,"Your Approximate Monthly Income"),t.C$Y(),t.I0R(17,"p",3),t.OEk(18),t.wVc(19,"currency"),t.yuY(20,E,2,0,"span",6),t.C$Y(),t.I0R(21,"p"),t.wR5(22,"p-slider",7),t.C$Y(),t.I0R(23,"div",5)(24,"div"),t.OEk(25,"$500"),t.C$Y(),t.I0R(26,"div"),t.OEk(27,"$3,000+"),t.C$Y()()(),t.I0R(28,"div",1)(29,"p",2),t.OEk(30,"Desired Loan Duration"),t.C$Y(),t.I0R(31,"p",3),t.OEk(32),t.C$Y(),t.I0R(33,"p"),t.wR5(34,"p-slider",8),t.C$Y(),t.I0R(35,"div",5)(36,"div"),t.OEk(37,"24 Months"),t.C$Y(),t.I0R(38,"div"),t.OEk(39,"60 Months"),t.C$Y()()(),t.I0R(40,"div",1)(41,"p",2),t.OEk(42,"Desired Annual Percentage Rate (APR)"),t.C$Y(),t.I0R(43,"p",3),t.OEk(44),t.C$Y(),t.I0R(45,"p"),t.wR5(46,"p-slider",9),t.C$Y(),t.I0R(47,"div",5)(48,"div"),t.OEk(49,"13%"),t.C$Y(),t.I0R(50,"div"),t.OEk(51,"30%"),t.C$Y()()(),t.I0R(52,"div",1)(53,"p",10),t.OEk(54,"Do you wish to secure your loan with your vehicle?"),t.C$Y(),t.I0R(55,"p"),t.wR5(56,"p-selectButton",11),t.C$Y(),t.wR5(57,"div",5),t.C$Y()()),2&e&&(t.E7m("formGroup",i.quoteFrm),t.yG2(5),t.oRS(" ",t.wB1(6,19,i.quoteFrm.value.loanAmount,"USD","symbol","1.0-0")," "),t.yG2(3),t.E7m("min",1e3)("max",15e3)("step",1e3),t.yG2(10),t.oRS(" ",t.wB1(19,24,i.quoteFrm.value.monthlyIncome,"USD","symbol","1.0-0")," "),t.yG2(2),t.C0Y(20,i.quoteFrm.value.monthlyIncome&&i.quoteFrm.value.monthlyIncome>=15e3?20:-1),t.yG2(2),t.E7m("min",500)("max",3e3)("step",500),t.yG2(10),t.oRS("",i.quoteFrm.value.loanDuration," Months"),t.yG2(2),t.E7m("min",24)("max",60)("step",12),t.yG2(10),t.oRS("",i.quoteFrm.value.apr,"%"),t.yG2(2),t.E7m("min",5)("max",30)("step",1),t.yG2(10),t.E7m("options",t.q4q(29,$)))},dependencies:[s.\u0275NgNoValidate,s.NgControlStatus,s.NgControlStatusGroup,s.FormGroupDirective,s.FormControlName,d.uQ,O.u_,p.cf],styles:[".quote-form .w-100-mobile{width:100%}@media (min-width: 768px){.quote-form .w-100-mobile{width:initial}}.quote-form .p-button{background-color:#00a39e;border-color:#00a39e;min-width:100px;text-align:center}.quote-form .p-selectbutton .p-button{background:#fff;color:#00a39e;border-right-width:1px;border-right-style:solid;width:50%}@media (min-width: 768px){.quote-form .p-selectbutton .p-button{width:initial}}.quote-form .p-selectbutton .p-button.p-highlight{background-color:#00a39e!important;border-color:#00a39e!important;color:#fff!important}.quote-form .p-button-outlined{background:#fff;color:#00a39e}.quote-form .row{--bs-gutter-x: 3rem}.quote-form .p-slider .p-slider-range{background:#00a39e}.quote-form .quote-selector{margin-bottom:.5rem}.quote-form .quote-selector .label{font-weight:500;margin-bottom:0}.quote-form .quote-selector .value{font-size:2.25rem;font-weight:700;margin-bottom:.5rem;color:#004b75}@media (min-width: 768px){.quote-form .quote-selector{margin-bottom:1rem}.quote-form .quote-selector .label{margin-bottom:-4px}}.quote-form .nudge-left{margin-left:-1rem}.quote-form .quote-range{display:flex;justify-content:space-between;font-size:.8rem;font-style:italic;margin-top:-10px}.quote-form h2{font-size:1.5rem;font-weight:700}@media (min-width: 768px){.quote-form h2{font-size:2.25rem}}.quote-form h3{margin-bottom:15px;font-size:24px}\n"],encapsulation:2})}return o})();const G=[{path:"",component:f,data:{title:"Borrower Information"},children:[{path:"products",component:w,data:{title:"Borrower Information"}},{path:"quote",component:(()=>{class o{constructor(r,e){this.socket=r,this.quoteSvc=e}quoteFormChanged(r){this.quoteSvc.agentId&&this.socket.sendMessageToUser(this.quoteSvc.agentId,JSON.stringify(r))}static#t=this.\u0275fac=function(e){return new(e||o)(t.GI1(m.SocketService),t.GI1(h))};static#o=this.\u0275cmp=t.In1({type:o,selectors:[["app-quote"]],decls:7,vars:0,consts:[[1,"bg"],[1,"container"],[2,"max-width","480px","margin","auto"],[3,"quoteFormChanged"]],template:function(e,i){1&e&&(t.wR5(0,"div",0),t.I0R(1,"div",1)(2,"p-card")(3,"div",2)(4,"h1"),t.OEk(5,"Select Your Loan Preferences"),t.C$Y(),t.I0R(6,"lib-quote-form",3),t.qCj("quoteFormChanged",function(k){return i.quoteFormChanged(k)}),t.C$Y()()()())},dependencies:[x,u.Card]})}return o})(),data:{title:"Borrower Information"}},{path:"",component:R,data:{title:"Borrower Information"}}]}];let S=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#o=this.\u0275mod=t.a4G({type:o,bootstrap:[f]});static#e=this.\u0275inj=t.s3X({imports:[p.MD,a.qQ.forChild(G),g.FormsLibModule,C.u,v.qo,u.CardModule,d.Ge,I.s,s.ReactiveFormsModule,b.ButtonModule]})}return o})()}}]);