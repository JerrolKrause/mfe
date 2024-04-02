"use strict";(self.webpackChunklos=self.webpackChunklos||[]).push([[512],{7512:(w,f,a)=>{a.r(f),a.d(f,{UsersModule:()=>Y});var y=a(4907),g=a(1368),G=a(4476),Q=a(4096),L=a(6700),I=a(6040),m=a(4704),$=a(112),j=a(5448),A=a(7773),D=a(3992),d=a(9212),T=a(7760),p=a(1468);const i=p.Ip`
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
`,M=p.Ip`
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
`,F=p.Ip`
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
`;var r=a(4496);let R=(()=>{class t{constructor(s){this.apollo=s,this._state$=new L.g({loading:!1,error:null,modifying:!1,modifyError:null}),this.state$=(0,I.E)([this.apollo.watchQuery({query:i}).valueChanges.pipe((0,m.k)(e=>e.data.users?.data??null)),this._state$]).pipe(function b(t,u=$.M){return(0,j.i)((s,e)=>{let n=null,o=null,l=null;const U=()=>{if(n){n.unsubscribe(),n=null;const c=o;o=null,e.next(c)}};function h(){const c=l+t,v=u.now();if(v<c)return n=this.schedule(void 0,c-v),void e.add(n);U()}s.subscribe((0,A.e)(e,c=>{o=c,l=u.now(),n||(n=u.schedule(h,t),e.add(n))},()=>{U(),e.complete()},void 0,()=>{o=n=null}))})}(1),(0,m.k)(([e,n])=>({data:e,...n})))}stateChange(s){this._state$.pipe((0,D.U)(1)).subscribe(e=>this._state$.next({...e,...s}))}usersGet(){return this.stateChange({loading:!0}),this.apollo.watchQuery({query:i}).valueChanges.pipe((0,d.y)(()=>this.stateChange({loading:!1})))}refresh(){return this.stateChange({loading:!0}),(0,T.Q)(this.apollo.client.refetchQueries({include:"active"})).pipe((0,d.y)(()=>this.stateChange({loading:!1})))}userCreate(s){return this.stateChange({modifying:!0}),this.apollo.mutate({mutation:M,variables:{input:s},update:(e,{data:n})=>{const o=e.readQuery({query:i});o&&n?.createUser&&e.writeQuery({query:i,data:{users:{...o.users,data:[...o?.users?.data||[],n.createUser]}}})}}).pipe((0,d.y)(()=>this.stateChange({modifying:!1})))}userUpdate(s,e){return this.stateChange({modifying:!0}),this.apollo.mutate({mutation:F,variables:{id:s,input:e},update:(n,{data:o})=>{const l=n.readQuery({query:i});if(l&&o?.updateUser){const U=(l?.users?.data||[]).map(h=>h?.id===o.updateUser?.id?o.updateUser:h);n.writeQuery({query:i,data:{users:{...l.users,data:U}}})}}}).pipe((0,d.y)(()=>this.stateChange({modifying:!1})))}static#t=this.\u0275fac=function(e){return new(e||t)(r.CoB(p.m))};static#e=this.\u0275prov=r.wxM({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var x=a(48);let C=(()=>{class t{constructor(s){this.svc=s}ngOnInit(){this.svc.state$.subscribe(s=>{s&&console.warn(s)})}userAdd(){this.svc.userCreate({username:"Test",name:"Test",email:"test@test.com"}).subscribe()}refresh(){this.svc.refresh().subscribe()}userUpdate(){this.svc.userUpdate("1",{email:"eat@joes.com"}).subscribe()}static#t=this.\u0275fac=function(e){return new(e||t)(r.GI1(R))};static#e=this.\u0275cmp=r.In1({type:t,selectors:[["app-users"]],decls:12,vars:0,consts:[[1,"container"],["p-button","",3,"click"]],template:function(e,n){1&e&&(r.I0R(0,"lib-masterpage")(1,"div",0)(2,"h1"),r.OEk(3,"Users"),r.C$Y(),r.I0R(4,"button",1),r.qCj("click",function(){return n.userAdd()}),r.OEk(5,"Add User"),r.C$Y(),r.OEk(6," | "),r.I0R(7,"button",1),r.qCj("click",function(){return n.userUpdate()}),r.OEk(8,"Update User"),r.C$Y(),r.OEk(9," | "),r.I0R(10,"button",1),r.qCj("click",function(){return n.refresh()}),r.OEk(11,"Refresh Users"),r.C$Y()()())},dependencies:[x.I]})}return t})();const O=[{path:"",component:C}];let Y=(()=>{class t{static#t=this.\u0275fac=function(e){return new(e||t)};static#e=this.\u0275mod=r.a4G({type:t,bootstrap:[C]});static#s=this.\u0275inj=r.s3X({providers:[(0,G.wx)()],imports:[g.MD,Q.qQ.forChild(O),y.u]})}return t})()}}]);