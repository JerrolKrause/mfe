"use strict";(self.webpackChunkapp_shell=self.webpackChunkapp_shell||[]).push([[144],{7144:(F,p,a)=>{a.r(p),a.d(p,{UsersModule:()=>T});var f=a(888),C=a(1368),v=a(4476),y=a(3320),g=a(6700),G=a(6040),d=a(4704),Q=a(4680),L=a(3992),u=a(9212),I=a(7760),l=a(1468);const i=l.Ip`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        username
        email
        address {
          geo {
            lat
            lng
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`,j=l.Ip`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`,A=l.Ip`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`;var e=a(4496);let D=(()=>{class t{constructor(s){this.apollo=s,this._state$=new g.g({loading:!1,error:null,modifying:!1,modifyError:null}),this.state$=(0,G.E)([this.apollo.watchQuery({query:i}).valueChanges.pipe((0,d.k)(r=>r.data.users?.data??null)),this._state$]).pipe((0,Q.o)(1),(0,d.k)(([r,n])=>({data:r,...n})))}stateChange(s){this._state$.pipe((0,L.U)(1)).subscribe(r=>this._state$.next({...r,...s}))}usersGet(){return this.stateChange({loading:!0}),this.apollo.watchQuery({query:i}).valueChanges.pipe((0,u.y)(()=>this.stateChange({loading:!1})))}refresh(){return this.stateChange({loading:!0}),(0,I.Q)(this.apollo.client.refetchQueries({include:"active"})).pipe((0,u.y)(()=>this.stateChange({loading:!1})))}userCreate(s){return this.stateChange({modifying:!0}),this.apollo.mutate({mutation:j,variables:{input:s},update:(r,{data:n})=>{const o=r.readQuery({query:i});o&&n?.createUser&&r.writeQuery({query:i,data:{users:{...o.users,data:[...o?.users?.data||[],n.createUser]}}})}}).pipe((0,u.y)(()=>this.stateChange({modifying:!1})))}userUpdate(s,r){return this.stateChange({modifying:!0}),this.apollo.mutate({mutation:A,variables:{id:s,input:r},update:(n,{data:o})=>{const c=n.readQuery({query:i});if(c&&o?.updateUser){const M=(c?.users?.data||[]).map(m=>m?.id===o.updateUser?.id?o.updateUser:m);n.writeQuery({query:i,data:{users:{...c.users,data:M}}})}}}).pipe((0,u.y)(()=>this.stateChange({modifying:!1})))}static#t=this.\u0275fac=function(r){return new(r||t)(e.CoB(l.m))};static#e=this.\u0275prov=e.wxM({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var k=a(48);let U=(()=>{class t{constructor(s){this.svc=s}ngOnInit(){this.svc.state$.subscribe(s=>{s&&console.warn(s)})}userAdd(){this.svc.userCreate({username:"Test",name:"Test",email:"test@test.com"}).subscribe()}refresh(){this.svc.refresh().subscribe()}userUpdate(){this.svc.userUpdate("1",{email:"eat@joes.com"}).subscribe()}static#t=this.\u0275fac=function(r){return new(r||t)(e.GI1(D))};static#e=this.\u0275cmp=e.In1({type:t,selectors:[["app-users"]],decls:12,vars:0,consts:[[1,"container"],["p-button","",3,"click"]],template:function(r,n){1&r&&(e.I0R(0,"lib-masterpage")(1,"div",0)(2,"h1"),e.OEk(3,"Users"),e.C$Y(),e.I0R(4,"button",1),e.qCj("click",function(){return n.userAdd()}),e.OEk(5,"Add User"),e.C$Y(),e.OEk(6," | "),e.I0R(7,"button",1),e.qCj("click",function(){return n.userUpdate()}),e.OEk(8,"Update User"),e.C$Y(),e.OEk(9," | "),e.I0R(10,"button",1),e.qCj("click",function(){return n.refresh()}),e.OEk(11,"Refresh Users"),e.C$Y()()())},dependencies:[k.I]})}return t})();const E=[{path:"",component:U}];let T=(()=>{class t{static#t=this.\u0275fac=function(r){return new(r||t)};static#e=this.\u0275mod=e.a4G({type:t,bootstrap:[U]});static#s=this.\u0275inj=e.s3X({providers:[(0,v.wx)()],imports:[C.MD,y.qQ.forChild(E),f.MasterpageModule]})}return t})()}}]);