if(!self.define){let e,n={};const s=(s,o)=>(s=new URL(s+".js",o).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(o,i)=>{const b=e||("document"in self?document.currentScript.src:"")||location.href;if(n[b])return;let a={};const r=e=>s(e,b),l={module:{uri:b},exports:a,require:r};n[b]=Promise.all(o.map((e=>l[e]||r(e)))).then((e=>(i(...e),a)))}}define(["./workbox-b833909e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"4ac6d267829a75550195cae9ce7cbcef"},{url:"assets/AttentionGame-q4YJapPI.js",revision:null},{url:"assets/HomePage-BvYPdI0J.js",revision:null},{url:"assets/index-BaJReJW6.css",revision:null},{url:"assets/index-DRceNf5D.js",revision:null},{url:"assets/LabyrinthGame-D68HLkbI.js",revision:null},{url:"assets/MemoryGame-BTb77A8g.js",revision:null},{url:"assets/NameModal-DhC56l6I.js",revision:null},{url:"assets/PerceptionGame--x23YB_u.js",revision:null},{url:"assets/PuzzleGame-DCaRmpj9.js",revision:null},{url:"assets/pwa-192x192-Du2Rf0Pu.png",revision:null},{url:"assets/ScrambleGame-CUF82Bfc.css",revision:null},{url:"assets/ScrambleGame-DlJmPQo3.js",revision:null},{url:"assets/Tasks-PCShWlu9.js",revision:null},{url:"assets/არწივი-B6yRfamE.js",revision:null},{url:"assets/არწივი-Cd2ubwI_.webp",revision:null},{url:"assets/აქლემი-CNcclkxj.webp",revision:null},{url:"assets/ბამბუკი-BT8Pdx2U.webp",revision:null},{url:"assets/ბეგემოტი-Bkrgsnt2.webp",revision:null},{url:"assets/ბუ-D1qeW-X_.webp",revision:null},{url:"assets/გველი-C0hC58bS.webp",revision:null},{url:"assets/დათვი-DETji_lk.webp",revision:null},{url:"assets/დელფინი-DN11ZyVA.webp",revision:null},{url:"assets/ენოტი-jfl7RG-v.webp",revision:null},{url:"assets/ვაშლი-3moDoWou.webp",revision:null},{url:"assets/ზარმაცა-BSc8QzQ_.webp",revision:null},{url:"assets/ზებრა-O_A0x1tx.webp",revision:null},{url:"assets/ზვიგენი-CGmUoHId.webp",revision:null},{url:"assets/ზღარბი-nHFKxVGJ.webp",revision:null},{url:"assets/თახვი-xBo9PL6M.webp",revision:null},{url:"assets/თხა (2)-CcMdhspg.webp",revision:null},{url:"assets/ირემი-DeiEaAFe.webp",revision:null},{url:"assets/კაქტუსი-CaCWOKKC.webp",revision:null},{url:"assets/კენგურუ-Cna90IgL.webp",revision:null},{url:"assets/კიბორჩხალა-DtbH3Rtw.webp",revision:null},{url:"assets/კოალა-3JihMMqE.webp",revision:null},{url:"assets/კოდალა-DqAFM0NF.webp",revision:null},{url:"assets/კოვზი-Bjf-x3Ci.webp",revision:null},{url:"assets/კურდღელი-Dewx1AgQ.webp",revision:null},{url:"assets/ლამა-NJcZ4EL7.webp",revision:null},{url:"assets/ლომი-BJkF1A9_.webp",revision:null},{url:"assets/მგელო-Dvl2wMib.webp",revision:null},{url:"assets/მელია-BehUMUL5.webp",revision:null},{url:"assets/მზესუმზირა-DGzgQkt8.webp",revision:null},{url:"assets/მუხა-BL4EubMX.webp",revision:null},{url:"assets/ობობა-DY4x8poE.webp",revision:null},{url:"assets/ოპოსუმი-yvf48Aqw.webp",revision:null},{url:"assets/პანდა-Dp6bd3oL.webp",revision:null},{url:"assets/პეპელა-Dzdu8bDc.webp",revision:null},{url:"assets/პნგვინი-BmDCXmZ3.webp",revision:null},{url:"assets/ჟირაფი-DtBO-LSH.webp",revision:null},{url:"assets/რვაფეხა-DulU4RUq.webp",revision:null},{url:"assets/რკო-DHQHlMsr.webp",revision:null},{url:"assets/საკურა-BGuDgLpE.webp",revision:null},{url:"assets/სელაპი-5a_UXOwW.webp",revision:null},{url:"assets/სიმინდი-D3fIIRp6.webp",revision:null},{url:"assets/სპილო-fOa1XERT.webp",revision:null},{url:"assets/ტირიფი-COCvx8IB.webp",revision:null},{url:"assets/ტიტა-D0eKZ6mN.webp",revision:null},{url:"assets/ფარშევანგი-CdApwvjQ.webp",revision:null},{url:"assets/ფლამინგო-CKcy4AZz.webp",revision:null},{url:"assets/ქამელეონი-C4UeJkWJ.webp",revision:null},{url:"assets/ჩანგალი-K6DgRFa5.webp",revision:null},{url:"assets/ციყვი-EtzP0ul-.webp",revision:null},{url:"assets/ხვლიკი-DtWYmqWU.webp",revision:null},{url:"index.html",revision:"24025b67ce3cfd4608a361a4bde5c26e"},{url:"logo.webp",revision:"8188c36afc12da825552164484357bed"},{url:"newmaincontent/photos/არწივი.webp",revision:"cd9039c24f3b3b2a408594192d502f37"},{url:"newmaincontent/photos/აქლემი.webp",revision:"5f5fa3cb8d78a158115ce243b85a7bd3"},{url:"newmaincontent/photos/ბამბუკი.webp",revision:"63a96d80c0c6d188d5bef488cc5e725b"},{url:"newmaincontent/photos/ბეგემოტი.webp",revision:"5e8f978a92dcb2262d57fc0e18b9d3e9"},{url:"newmaincontent/photos/ბიჭი.webp",revision:"eeecb08c613d309bb07e25da8b8fc60b"},{url:"newmaincontent/photos/ბუ.webp",revision:"e5667db709ade19288f0e4e57554155c"},{url:"newmaincontent/photos/გველი.webp",revision:"fcf6b24fbd8802beb72d6fa8306306b9"},{url:"newmaincontent/photos/დათვი.webp",revision:"c43b0b290c361f9038fe804fb10ac4e9"},{url:"newmaincontent/photos/დელფინი.webp",revision:"15bf7bd0195dd6d39fd37db7a7508453"},{url:"newmaincontent/photos/ენოტი.webp",revision:"a39038b210e988917c85b1177e51930f"},{url:"newmaincontent/photos/ვაშლი.webp",revision:"3eecd87263b3f1127dc8fb498dd6e071"},{url:"newmaincontent/photos/ზარმაცა.webp",revision:"d3cc8ba466692b9a2ccce33ead88ba12"},{url:"newmaincontent/photos/ზებრა.webp",revision:"5df88e9a58cac9d73e2749784f137d54"},{url:"newmaincontent/photos/ზვიგენი.webp",revision:"7cecf0414832706db5e628979638c940"},{url:"newmaincontent/photos/ზღარბი (2).webp",revision:"38afe1d1eb040f391c8e68abb0d3aab5"},{url:"newmaincontent/photos/ზღარბი.webp",revision:"af959dea1e0415fb0f42ea926b9aef5e"},{url:"newmaincontent/photos/თახვი (2).webp",revision:"f7729eb49d80d01b65384d4e8130d6f7"},{url:"newmaincontent/photos/თახვი.webp",revision:"fe062d9def01383115eaa183efe21a7d"},{url:"newmaincontent/photos/თხა (2).webp",revision:"44d47b458b92f78c5c70e83d0bc6a6b4"},{url:"newmaincontent/photos/თხა.webp",revision:"24cb3a2fa411f501c37fa55f5b6cf6aa"},{url:"newmaincontent/photos/ირემი (2).webp",revision:"d2739b237094f8adbaa911bce38d2a32"},{url:"newmaincontent/photos/ირემი.webp",revision:"5e9467c25b7c276018079b1d76a3ae04"},{url:"newmaincontent/photos/კაქტუსი.webp",revision:"0039a3dd9d826b7136a9aa461600960c"},{url:"newmaincontent/photos/კენგურუ.webp",revision:"a2ca4a2b8f545cb242e8a78f1b399cfe"},{url:"newmaincontent/photos/კიბორჩხალა.webp",revision:"9c5db66d99e8f988ac41698814ef7c64"},{url:"newmaincontent/photos/კოალა.webp",revision:"10fea2c880f0f7cddaec7d62488fd031"},{url:"newmaincontent/photos/კოდალა.webp",revision:"68c6a4ecc73c9a25017038b564af87a8"},{url:"newmaincontent/photos/კოვზი.webp",revision:"c5e2b0a1702a3c1df5ff98fb84cf84df"},{url:"newmaincontent/photos/კურდღელი.webp",revision:"eabe6f57e8699a9765185c4022bedcb8"},{url:"newmaincontent/photos/ლამა.webp",revision:"3631559e46b6f1bb84ac372f5d519c37"},{url:"newmaincontent/photos/ლომი.webp",revision:"00bb886e8deb08609927e029b91765b2"},{url:"newmaincontent/photos/მგელო.webp",revision:"7eea159d45628322fa64182da089c14a"},{url:"newmaincontent/photos/მელია.webp",revision:"8627ba72f48a79f2da773ec93939c9ae"},{url:"newmaincontent/photos/მზესუმზირა.webp",revision:"3c5a70000a8dbe1e64feb9a4e46343c3"},{url:"newmaincontent/photos/მუხა.webp",revision:"51835843e63b7d0fe0e6eec11d4e29cb"},{url:"newmaincontent/photos/ობობა.webp",revision:"03ebdc3f5180aea9ecead2966225978b"},{url:"newmaincontent/photos/ოპოსუმი.webp",revision:"9ff6044a940aff835d6dd346a384a680"},{url:"newmaincontent/photos/პანდა.webp",revision:"8469aba371df88f381815a04a3f74f92"},{url:"newmaincontent/photos/პეპელა.webp",revision:"f07145892ee63ea9ae0b61fcce1180d9"},{url:"newmaincontent/photos/პნგვინი.webp",revision:"3ae2ab7f9e31dfab679af0abbb704958"},{url:"newmaincontent/photos/ჟირაფი.webp",revision:"eee67b028221a69e6da96bdcf560c913"},{url:"newmaincontent/photos/რვაფეხა.webp",revision:"6f4126c928d3c62114c38692b09ca6d4"},{url:"newmaincontent/photos/რკო.webp",revision:"1212666c3ff1e29604599acdef272d6e"},{url:"newmaincontent/photos/საკურა.webp",revision:"efab2690d0bb89c022d413754e846295"},{url:"newmaincontent/photos/სელაპი.webp",revision:"a234edee6a4da94a1705c21cd960264b"},{url:"newmaincontent/photos/სიმინდი.webp",revision:"911c47bea0b2c130e278daba06c4e5c0"},{url:"newmaincontent/photos/სპილო.webp",revision:"389f324572a66ba01add56e7b28a5a95"},{url:"newmaincontent/photos/ტირიფი.webp",revision:"45f093f2d9d0f610e182f80802b176ae"},{url:"newmaincontent/photos/ტიტა.webp",revision:"13be83ae9da124409e8dcad4b2c546f2"},{url:"newmaincontent/photos/ფარშევანგი.webp",revision:"eb47fe0fd9566eb8a5b006682b692bf2"},{url:"newmaincontent/photos/ფლამინგო.webp",revision:"4ea83d410a4a521016c357818654f2d0"},{url:"newmaincontent/photos/ქამელეონი.webp",revision:"0d6dbb07a67089b12a288d4d4e813a8a"},{url:"newmaincontent/photos/ჩანგალი.webp",revision:"4588f95f6d18ed1ac5a09401f27c8152"},{url:"newmaincontent/photos/ციყვი.webp",revision:"77006deba547d973b4b52f578390f7d4"},{url:"newmaincontent/photos/ხვლიკი.webp",revision:"bde01514ec3681e4b91c069cd1ccb306"},{url:"newphotos/არწივი.webp",revision:"cd9039c24f3b3b2a408594192d502f37"},{url:"newphotos/აქლემი.webp",revision:"5f5fa3cb8d78a158115ce243b85a7bd3"},{url:"newphotos/ბამბუკი.webp",revision:"63a96d80c0c6d188d5bef488cc5e725b"},{url:"newphotos/ბეგემოტი.webp",revision:"5e8f978a92dcb2262d57fc0e18b9d3e9"},{url:"newphotos/ბიჭი.webp",revision:"eeecb08c613d309bb07e25da8b8fc60b"},{url:"newphotos/ბუ.webp",revision:"e5667db709ade19288f0e4e57554155c"},{url:"newphotos/გველი.webp",revision:"fcf6b24fbd8802beb72d6fa8306306b9"},{url:"newphotos/დათვი.webp",revision:"c43b0b290c361f9038fe804fb10ac4e9"},{url:"newphotos/დელფინი.webp",revision:"15bf7bd0195dd6d39fd37db7a7508453"},{url:"newphotos/ენოტი.webp",revision:"a39038b210e988917c85b1177e51930f"},{url:"newphotos/ვაშლი.webp",revision:"3eecd87263b3f1127dc8fb498dd6e071"},{url:"newphotos/ზარმაცა.webp",revision:"d3cc8ba466692b9a2ccce33ead88ba12"},{url:"newphotos/ზებრა.webp",revision:"5df88e9a58cac9d73e2749784f137d54"},{url:"newphotos/ზვიგენი.webp",revision:"7cecf0414832706db5e628979638c940"},{url:"newphotos/ზღარბი (2).webp",revision:"38afe1d1eb040f391c8e68abb0d3aab5"},{url:"newphotos/ზღარბი.webp",revision:"af959dea1e0415fb0f42ea926b9aef5e"},{url:"newphotos/თახვი (2).webp",revision:"f7729eb49d80d01b65384d4e8130d6f7"},{url:"newphotos/თახვი.webp",revision:"fe062d9def01383115eaa183efe21a7d"},{url:"newphotos/თხა (2).webp",revision:"44d47b458b92f78c5c70e83d0bc6a6b4"},{url:"newphotos/თხა.webp",revision:"24cb3a2fa411f501c37fa55f5b6cf6aa"},{url:"newphotos/ირემი (2).webp",revision:"d2739b237094f8adbaa911bce38d2a32"},{url:"newphotos/ირემი.webp",revision:"5e9467c25b7c276018079b1d76a3ae04"},{url:"newphotos/კაქტუსი.webp",revision:"0039a3dd9d826b7136a9aa461600960c"},{url:"newphotos/კენგურუ.webp",revision:"a2ca4a2b8f545cb242e8a78f1b399cfe"},{url:"newphotos/კიბორჩხალა.webp",revision:"9c5db66d99e8f988ac41698814ef7c64"},{url:"newphotos/კოალა.webp",revision:"10fea2c880f0f7cddaec7d62488fd031"},{url:"newphotos/კოდალა.webp",revision:"68c6a4ecc73c9a25017038b564af87a8"},{url:"newphotos/კურდღელი.webp",revision:"eabe6f57e8699a9765185c4022bedcb8"},{url:"newphotos/ლამა.webp",revision:"3631559e46b6f1bb84ac372f5d519c37"},{url:"newphotos/ლომი.webp",revision:"00bb886e8deb08609927e029b91765b2"},{url:"newphotos/მგელო.webp",revision:"7eea159d45628322fa64182da089c14a"},{url:"newphotos/მელია.webp",revision:"8627ba72f48a79f2da773ec93939c9ae"},{url:"newphotos/მზესუმზირა.webp",revision:"3c5a70000a8dbe1e64feb9a4e46343c3"},{url:"newphotos/მუხა.webp",revision:"51835843e63b7d0fe0e6eec11d4e29cb"},{url:"newphotos/ობობა.webp",revision:"03ebdc3f5180aea9ecead2966225978b"},{url:"newphotos/ოპოსუმი.webp",revision:"9ff6044a940aff835d6dd346a384a680"},{url:"newphotos/პანდა.webp",revision:"8469aba371df88f381815a04a3f74f92"},{url:"newphotos/პეპელა.webp",revision:"f07145892ee63ea9ae0b61fcce1180d9"},{url:"newphotos/პნგვინი.webp",revision:"3ae2ab7f9e31dfab679af0abbb704958"},{url:"newphotos/ჟირაფი.webp",revision:"eee67b028221a69e6da96bdcf560c913"},{url:"newphotos/რვაფეხა.webp",revision:"6f4126c928d3c62114c38692b09ca6d4"},{url:"newphotos/რკო.webp",revision:"1212666c3ff1e29604599acdef272d6e"},{url:"newphotos/საკურა.webp",revision:"efab2690d0bb89c022d413754e846295"},{url:"newphotos/სელაპი.webp",revision:"a234edee6a4da94a1705c21cd960264b"},{url:"newphotos/სიმინდი.webp",revision:"911c47bea0b2c130e278daba06c4e5c0"},{url:"newphotos/სპილო.webp",revision:"389f324572a66ba01add56e7b28a5a95"},{url:"newphotos/ტირიფი.webp",revision:"45f093f2d9d0f610e182f80802b176ae"},{url:"newphotos/ტიტა.webp",revision:"13be83ae9da124409e8dcad4b2c546f2"},{url:"newphotos/ფარშევანგი.webp",revision:"eb47fe0fd9566eb8a5b006682b692bf2"},{url:"newphotos/ფლამინგო.webp",revision:"4ea83d410a4a521016c357818654f2d0"},{url:"newphotos/ქამელეონი.webp",revision:"0d6dbb07a67089b12a288d4d4e813a8a"},{url:"newphotos/ციყვი.webp",revision:"77006deba547d973b4b52f578390f7d4"},{url:"newphotos/ხვლიკი.webp",revision:"bde01514ec3681e4b91c069cd1ccb306"},{url:"registerSW.js",revision:"37e4d01c9c511e123cf53f336db62510"},{url:"service-worker.js",revision:"a74dee8a1c3b01c3e1acbd1af733014f"},{url:"manifest.webmanifest",revision:"d30e3f1971297803f68c964cf106bff1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
