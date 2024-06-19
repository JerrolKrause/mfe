"use strict";(self.webpackChunkapp_shell=self.webpackChunkapp_shell||[]).push([[710],{8710:(M,i,o)=>{o.r(i),o.d(i,{UsersModule:()=>k,createApollo:()=>h});var m=o(6718),u=o(1331),l=o(177),f=o(1626),v=o(430),G=o(9997),a=o(6772),y=o(7848),L=o(4412),Q=o(6697),D=o(8141);const p=a.gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        phone
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
`,b=a.gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      phone
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
`,j=a.gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      phone
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
`,I=a.gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;var e=o(3953);let d=(()=>{class t{constructor(s,r){this.apollo=s,this.graphSvc=r,this._state$=new L.t({loading:!1,error:null,modifying:!1,errorModify:null}),this.usersStore=this.graphSvc.createEntityStore({primaryKey:"id",getQuery:p,createQuery:b,updateQuery:j,deleteQuery:I,getResultKey:"users",createResultKey:"createUser",updateResultKey:"updateUser",deleteResultKey:"deleteUser"}),this.state$=this.usersStore.state$}stateChange(s){this._state$.pipe((0,Q.s)(1)).subscribe(r=>this._state$.next({...r,...s}))}usersGet(){return this.stateChange({loading:!0}),this.apollo.watchQuery({query:p}).valueChanges.pipe((0,D.M)(()=>this.stateChange({loading:!1})))}userCreate(s){this.usersStore.createData(s).subscribe()}userUpdate(s,r){this.usersStore.updateData(s,r).subscribe()}static#e=this.\u0275fac=function(r){return new(r||t)(e.KVO(a.Apollo),e.KVO(u.GraphQLStoreCreatorService))};static#t=this.\u0275prov=e.jDH({token:t,factory:t.\u0275fac})}return t})();var F=o(8480);function A(t,c){if(1&t){const s=e.RV6();e.j41(0,"div",1)(1,"h1"),e.EFF(2,"Users"),e.k0s(),e.j41(3,"div",2)(4,"div",3)(5,"table",4),e.nrm(6,"tbody"),e.k0s()(),e.j41(7,"div",5)(8,"button",6),e.bIt("click",function(){e.eBV(s);const n=e.XpG();return e.Njj(n.userAdd())}),e.EFF(9,"Add User"),e.k0s(),e.EFF(10," | "),e.j41(11,"button",6),e.bIt("click",function(){e.eBV(s);const n=e.XpG();return e.Njj(n.userUpdate())}),e.EFF(12,"Update User"),e.k0s(),e.EFF(13," | "),e.j41(14,"button",6),e.bIt("click",function(){e.eBV(s);const n=e.XpG();return e.Njj(n.refresh())}),e.EFF(15,"Refresh Users"),e.k0s(),e.j41(16,"button",6),e.bIt("click",function(){e.eBV(s);const n=e.XpG();return e.Njj(n.userDelete())}),e.EFF(17,"Delete User"),e.k0s()()()()}}let U=(()=>{class t{constructor(s){this.svc=s}ngOnInit(){this.svc.state$.subscribe(s=>{console.warn(s.data)})}userAdd(){this.svc.usersStore.createData({username:"Test",name:"Test",email:"test@test.com"}).subscribe()}refresh(){}userUpdate(){this.svc.usersStore.updateData("1",{email:"eat@joes.com",username:"test@test.com"}).subscribe()}userDelete(){this.svc.usersStore.deleteData("1").subscribe()}static#e=this.\u0275fac=function(r){return new(r||t)(e.rXU(d))};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-users"]],decls:3,vars:3,consts:[["class","container",4,"ngIf"],[1,"container"],[1,"row"],[1,"col","col-12","col-md-8"],[1,"table","table-striped"],[1,"col","col-12","col-md-4"],["p-button","",3,"click"]],template:function(r,n){1&r&&(e.j41(0,"lib-masterpage"),e.DNE(1,A,18,0,"div",0),e.nI1(2,"async"),e.k0s()),2&r&&(e.R7$(),e.Y8G("ngIf",e.bMT(2,1,n.svc.state$)))},dependencies:[l.bT,F.z,l.Jj]})}return t})();const $=[{path:"",component:U}],S="https://graphqlzero.almansi.me/api";function h(t){return{link:t.create({uri:S}),cache:new G.D}}let k=(()=>{class t{static#e=this.\u0275fac=function(r){return new(r||t)};static#t=this.\u0275mod=e.$C({type:t,bootstrap:[U]});static#s=this.\u0275inj=e.G2t({providers:[d,{provide:a.APOLLO_OPTIONS,useFactory:h,deps:[y.PR]}],imports:[f.HttpClientModule,l.MD,v.iI.forChild($),m.e,u.StateManagementModule,a.ApolloModule]})}return t})()}}]);