const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ReactP5WrapperWithSketch-BQloGz6t.js","./index-LTnuddGD.js","./index-BP8wgTeK.css","./react-error-boundary.esm-S7TOOcVq.js"])))=>i.map(i=>d[i]);
import{j as t,r as a,_ as o}from"./index-LTnuddGD.js";function u(r){return`
      [ReactP5Wrapper] The error boundary was triggered. The error message was:
      
      ${r}
    `.trim().split(`
`).map(e=>e.trimStart()).join(`
`)}function c(r){const e=u(r.message);console.error(e)}const l=a.lazy(()=>o(()=>import("./ReactP5WrapperWithSketch-BQloGz6t.js"),__vite__mapDeps([0,1,2]),import.meta.url)),s=a.lazy(()=>o(()=>import("./react-error-boundary.esm-S7TOOcVq.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(r=>({default:r.ErrorBoundary})));function f(r){var e,n;return r.sketch===void 0?(console.error("[ReactP5Wrapper] The `sketch` prop is required."),((e=r.fallback)==null?void 0:e.call(r))??null):t.jsx(s,{fallbackRender:d=>{var i;return((i=r.error)==null?void 0:i.call(r,d.error))??t.jsx("p",{"data-testid":"error",children:"❌ - Something went wrong"})},onError:c,children:t.jsx(a.Suspense,{fallback:((n=r.loading)==null?void 0:n.call(r))??t.jsx("p",{"data-testid":"loading",children:"🚀 Loading..."}),children:t.jsx(l,{...r})})})}export{f as default};
