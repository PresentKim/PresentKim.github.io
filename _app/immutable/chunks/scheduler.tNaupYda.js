function y(){}const k=n=>n;function z(n,t){for(const e in t)n[e]=t[e];return n}function b(n){return n()}function F(){return Object.create(null)}function x(n){n.forEach(b)}function q(n){return typeof n=="function"}function A(n,t){return n!=n?t==t:n!==t||n&&typeof n=="object"||typeof n=="function"}function M(n){return Object.keys(n).length===0}function m(n,...t){if(n==null){for(const o of t)o(void 0);return y}const e=n.subscribe(...t);return e.unsubscribe?()=>e.unsubscribe():e}function P(n,t,e){n.$$.on_destroy.push(m(t,e))}function S(n,t,e,o){if(n){const r=$(n,t,e,o);return n[0](r)}}function $(n,t,e,o){return n[1]&&o?z(e.ctx.slice(),n[1](o(t))):e.ctx}function B(n,t,e,o){if(n[2]&&o){const r=n[2](o(e));if(t.dirty===void 0)return r;if(typeof r=="object"){const a=[],h=Math.max(t.dirty.length,r.length);for(let f=0;f<h;f+=1)a[f]=t.dirty[f]|r[f];return a}return t.dirty|r}return t.dirty}function C(n,t,e,o,r,a){if(r){const h=$(t,e,o,a);n.p(h,r)}}function D(n){if(n.ctx.length>32){const t=[],e=n.ctx.length/32;for(let o=0;o<e;o++)t[o]=-1;return t}return-1}function G(n,t,e){return n.set(e),t}function H(n){const t=typeof n=="string"&&n.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return t?[parseFloat(t[1]),t[2]||"px"]:[n,"px"]}let i;function l(n){i=n}function w(){if(!i)throw new Error("Function called outside component initialization");return i}function I(n){w().$$.on_mount.push(n)}function J(n){w().$$.after_update.push(n)}const c=[],p=[];let u=[];const j=[],E=Promise.resolve();let d=!1;function _(){d||(d=!0,E.then(O))}function K(){return _(),E}function v(n){u.push(n)}const g=new Set;let s=0;function O(){if(s!==0)return;const n=i;do{try{for(;s<c.length;){const t=c[s];s++,l(t),L(t.$$)}}catch(t){throw c.length=0,s=0,t}for(l(null),c.length=0,s=0;p.length;)p.pop()();for(let t=0;t<u.length;t+=1){const e=u[t];g.has(e)||(g.add(e),e())}u.length=0}while(c.length);for(;j.length;)j.pop()();d=!1,g.clear(),l(n)}function L(n){if(n.fragment!==null){n.update(),x(n.before_update);const t=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,t),n.after_update.forEach(v)}}function N(n){const t=[],e=[];u.forEach(o=>n.indexOf(o)===-1?t.push(o):e.push(o)),e.forEach(o=>o()),u=t}export{m as A,J as a,p as b,P as c,v as d,k as e,F as f,O as g,M as h,q as i,N as j,i as k,l,b as m,y as n,I as o,c as p,_ as q,x as r,A as s,K as t,H as u,S as v,C as w,D as x,B as y,G as z};