const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ReactP5WrapperWithSketch-FjYUdrfR.js","./index-Dv-5O8A8.js","./index-CKZShZ7-.css","./react-error-boundary.esm-sFeNTLlQ.js"])))=>i.map(i=>d[i]);
import{j as t,r as a,_ as i}from"./index-Dv-5O8A8.js";function d(r){return`
      [ReactP5Wrapper] The error boundary was triggered. The error message was:
      
      ${r}
    `.trim().split(`
`).map(e=>e.trimStart()).join(`
`)}function l(r){const e=d(r.message);console.error(e)}const u=a.lazy(()=>i(()=>import("./ReactP5WrapperWithSketch-FjYUdrfR.js"),__vite__mapDeps([0,1,2]),import.meta.url)),s=a.lazy(()=>i(()=>import("./react-error-boundary.esm-sFeNTLlQ.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(r=>({default:r.ErrorBoundary})));function h(r){var e,n;return r.sketch===void 0?(console.error("[ReactP5Wrapper] The `sketch` prop is required."),((e=r.fallback)==null?void 0:e.call(r))??null):t.jsx(s,{fallbackRender:c=>{var o;return((o=r.error)==null?void 0:o.call(r,c.error))??t.jsx("p",{"data-testid":"error",children:"❌ - Something went wrong"})},onError:l,children:t.jsx(a.Suspense,{fallback:((n=r.loading)==null?void 0:n.call(r))??t.jsx("p",{"data-testid":"loading",children:"🚀 Loading..."}),children:t.jsx(u,{...r})})})}export{h as default};
