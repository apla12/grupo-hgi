// src/main.ts
import { bootstrapApplication } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_platform-browser.js?v=757d2c37";

// src/app/app.config.ts
import { initializeApp, provideFirebaseApp } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_fire_app.js?v=757d2c37";
import { provideAnimationsAsync } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_platform-browser_animations_async.js?v=757d2c37";
import { provideRouter } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_router.js?v=757d2c37";

// src/environments/environment.ts
var environment = {
  firebaseConfig: {
    apiKey: "AIzaSyCM425Gx1wk8RgyrRsBtDUMOvLJGNb6blM",
    authDomain: "grupo-hgi.firebaseapp.com",
    projectId: "grupo-hgi",
    storageBucket: "grupo-hgi.appspot.com",
    messagingSenderId: "458012714341",
    appId: "1:458012714341:web:c205aee16288f8bd13ed8c",
    measurementId: "G-H402LH4TLW"
  }
};

// src/app/app.config.ts
import { provideHttpClient, withFetch } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common_http.js?v=757d2c37";
import { provideClientHydration } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_platform-browser.js?v=757d2c37";
import { provideAnimations } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_platform-browser_animations.js?v=757d2c37";

// src/app/components/home/home.component.ts
import { NgOptimizedImage as NgOptimizedImage6 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component as Component8 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";

// src/app/components/about/about.component.ts
import { NgOptimizedImage } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import * as i0 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _AboutComponent = class _AboutComponent {
  constructor() {
  }
  ngOnInit() {
  }
};
_AboutComponent.\u0275fac = function AboutComponent_Factory(t) {
  return new (t || _AboutComponent)();
};
_AboutComponent.\u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], standalone: true, features: [i0.\u0275\u0275ProvidersFeature([]), i0.\u0275\u0275StandaloneFeature], decls: 79, vars: 0, consts: [[1, "main-section"], [1, "titulo"], [1, "subtitulo"], [1, "body-content"], [1, "card"], [1, "header-card"], [1, "img-card"], ["src", "/assets/imgs/hub-business.png", "alt", ""], [1, "body-card"], [1, "txt"], [1, "destaque"], ["src", "/assets/photo/heitor2.png", "alt", ""], [1, "autor"], ["src", "/assets/imgs/dna.png", "alt", ""], [1, "banner-about"], [1, "row-banner"], [1, "col-banner1"], [1, "col-banner2"], [1, "title-col-banner-2"], [1, "txt-objeto"], [1, "call-to-action-about", "bg-1-about", "overly"], [1, "space-one", "overly"], [1, "custos"], [1, "banner"], [1, "banner-destaque"]], template: function AboutComponent_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
    i0.\u0275\u0275text(2, "QUEM SOMOS");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(3, "div", 2);
    i0.\u0275\u0275text(4, "Especialistas em sistemas prediais");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(5, "div", 2);
    i0.\u0275\u0275text(6, " Uma vida dedicada a engenharia de sistemas prediais ");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(7, "div", 3)(8, "div", 4)(9, "div", 5)(10, "div", 6);
    i0.\u0275\u0275element(11, "img", 7);
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(12, "div", 8)(13, "span", 9);
    i0.\u0275\u0275text(14, " Somos o ");
    i0.\u0275\u0275elementStart(15, "span", 10);
    i0.\u0275\u0275text(16, "hub de neg\xF3cios corporativos");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(17, " 100% focados nos sistemas prediais, conectamos as construtoras e incorporadoras as industrias criando um ecossistema moderno, sofisticado, \xE1gil e disruptivo. ");
    i0.\u0275\u0275elementEnd()()();
    i0.\u0275\u0275elementStart(18, "div", 4)(19, "div", 5)(20, "div", 6);
    i0.\u0275\u0275element(21, "img", 11);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(22, "div", 12);
    i0.\u0275\u0275text(23, "Heitor Vasconcelos Gouveia");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(24, "div", 8)(25, "span", 9);
    i0.\u0275\u0275text(26, "Solidificou sua carreira como ");
    i0.\u0275\u0275elementStart(27, "span", 10);
    i0.\u0275\u0275text(28, "gestor nacional");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(29, " da MRV por 10 anos, implementando inova\xE7\xF5es e industrializando sistemas prediais. ");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(30, "span", 9);
    i0.\u0275\u0275text(31, " Em seguida, ganhou destaque como diretor e parceiro do Grupo Ambar, focando em industrializa\xE7\xE3o. ");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(32, "span", 9);
    i0.\u0275\u0275text(33, " Em 2023, fundou o Grupo ConstruAPP, uma empresa inovadora que est\xE1 transformando o ");
    i0.\u0275\u0275elementStart(34, "span", 10);
    i0.\u0275\u0275text(35, "mercado de sistemas prediais");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(36, " de forma s\xF3lida e tecnol\xF3gica em todo o pa\xEDs. ");
    i0.\u0275\u0275elementEnd()()();
    i0.\u0275\u0275elementStart(37, "div", 4)(38, "div", 5)(39, "div", 6);
    i0.\u0275\u0275element(40, "img", 13);
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(41, "div", 8)(42, "span", 9);
    i0.\u0275\u0275text(43, " Com ");
    i0.\u0275\u0275elementStart(44, "span", 10);
    i0.\u0275\u0275text(45, "DNA de inova\xE7\xE3o");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(46, " lan\xE7a seu novo empreendimento com foco 100% no ");
    i0.\u0275\u0275elementStart(47, "span", 10);
    i0.\u0275\u0275text(48, "SUPRIMENTOS");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(49, " dos ");
    i0.\u0275\u0275elementStart(50, "span", 10);
    i0.\u0275\u0275text(51, "SISTEMAS PREDIAIS");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(52, ", assumindo uma posi\xE7\xE3o de um ");
    i0.\u0275\u0275elementStart(53, "span", 10);
    i0.\u0275\u0275text(54, "hub de neg\xF3cios corporativos");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275text(55, ", aliando t\xE9cnica, net work, criando conectividade gerando uma jornada precisa, eficiente e revolucion\xE1ria. ");
    i0.\u0275\u0275elementEnd()()()()();
    i0.\u0275\u0275elementStart(56, "section", 14)(57, "div", 15);
    i0.\u0275\u0275element(58, "div", 16);
    i0.\u0275\u0275elementStart(59, "div", 17)(60, "span", 18);
    i0.\u0275\u0275text(61, "NOSSO ");
    i0.\u0275\u0275element(62, "br");
    i0.\u0275\u0275elementStart(63, "span", 19);
    i0.\u0275\u0275text(64, "OBJETIVO");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275text(65, " Auxiliar construtoras e incorporadoras na implanta\xE7\xE3o integrada dos processos de Gest\xE3o de modernizar a opera\xE7\xE3o dos sistemas prediais procedimentos de aprova\xE7\xF5es de projetos junto as concession\xE1rias, par\xE2metros de implanta\xE7\xE3o da construtiva, confec\xE7\xE3o de Procedimentos de Execu\xE7\xE3o de Servi\xE7os (PES), aplica\xE7\xE3o dos testes. ");
    i0.\u0275\u0275elementEnd()()();
    i0.\u0275\u0275elementStart(66, "section", 20)(67, "div", 21)(68, "div", 22)(69, "span", 23);
    i0.\u0275\u0275text(70, "Gest\xE3o de Instala\xE7\xF5es");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(71, "span", 24)(72, "span", 10);
    i0.\u0275\u0275text(73, "+ 100 cidades");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(74, "span", 23);
    i0.\u0275\u0275text(75, "Participa\xE7\xE3o efetiva da constru\xE7\xF5es habitacionais");
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(76, "span", 24)(77, "span", 10);
    i0.\u0275\u0275text(78, "+ 500.000 unidades");
    i0.\u0275\u0275elementEnd()()()()();
  }
}, styles: ['\n\n.main-section[_ngcontent-%COMP%] {\n  padding: 2rem 1rem 2rem 1rem;\n  background-color: #1e242b;\n  background-image:\n    radial-gradient(\n      at 47% 33%,\n      hsl(212.31, 18%, 14%) 0,\n      transparent 59%),\n    radial-gradient(\n      at 82% 65%,\n      hsl(206.67, 20%, 18%) 0,\n      transparent 55%);\n  height: auto;\n}\n.main-section[_ngcontent-%COMP%]   .titulo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  text-align: center;\n  width: 100%;\n  margin-top: 1em;\n  font-size: 3rem;\n  font-weight: 700;\n  color: #f6f8f9;\n  font-family:\n    "introBlack",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.main-section[_ngcontent-%COMP%]   .subtitulo[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 100%;\n  font-size: 1.2rem;\n  color: #f6f8f9;\n  font-family:\n    "Space Grotesk",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n  margin-top: 1em;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #f6f8f9;\n  background:\n    linear-gradient(\n      135deg,\n      #0d1120 0%,\n      rgba(255, 0, 0, 0),\n      rgba(58, 75, 224, 0.12));\n  padding: 1.5rem;\n  border-radius: 0.5rem;\n  border: 1px solid #384654;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 1.25rem 1.5rem;\n  text-align: center;\n  height: 210px;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .autor[_ngcontent-%COMP%] {\n  font-family: sans-serif;\n  font-size: 13px;\n  color: #f6f8f9;\n  font-family:\n    "Space Grotesk",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .sociais[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  padding: 5px;\n  width: 25px;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .img-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50% !important;\n  -webkit-box-shadow: 6px 5px 2em 2px #000000;\n  box-shadow: 6px 5px 2em 2px #000000;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .body-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .body-card[_ngcontent-%COMP%]   .txt[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  text-align: center;\n  font-family:\n    "Space Grotesk",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .body-card[_ngcontent-%COMP%]   .destaque[_ngcontent-%COMP%] {\n  color: #da692d;\n  margin-left: 2px;\n  margin-right: 2px;\n}\n@media (max-width: 800px) {\n  .main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .col-desc[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .main-section[_ngcontent-%COMP%]   .body-content[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.call-to-action-about[_ngcontent-%COMP%] {\n  background-attachment: fixed;\n}\n.call-to-action-about[_ngcontent-%COMP%]   .btn-main[_ngcontent-%COMP%] {\n  margin: 20px 20px 20px 20px;\n  border-radius: 15px;\n}\n.bg-1-about[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 100vw;\n  height: 100%;\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  position: relative;\n}\n.bg-1-about[_ngcontent-%COMP%] {\n  background-image: url("./media/slide1.webp");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: top;\n  object-fit: cover;\n  inset: 0;\n  z-index: -1;\n}\n.space-one[_ngcontent-%COMP%] {\n  height: 19em;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.space-one[_ngcontent-%COMP%]   .custos[_ngcontent-%COMP%] {\n  padding: 1rem;\n  width: 60%;\n  height: auto;\n  margin: 2rem;\n  text-align: left;\n  font-family:\n    "introBlack",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n  background-color: rgba(255, 255, 255, 0.2392156863);\n  border-radius: 5px;\n  border: 1px solid #da692d;\n}\n.space-one[_ngcontent-%COMP%]   .custos[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%] {\n  display: flex;\n  font-size: 1.2rem;\n  gap: 14px;\n  margin-bottom: 10px;\n}\n.space-one[_ngcontent-%COMP%]   .custos[_ngcontent-%COMP%]   .banner-destaque[_ngcontent-%COMP%] {\n  display: flex;\n  font-size: 1.8rem;\n  gap: 14px;\n  margin-bottom: 10px;\n}\n.space-one[_ngcontent-%COMP%]   .custos[_ngcontent-%COMP%]   .banner-destaque[_ngcontent-%COMP%]   .destaque[_ngcontent-%COMP%] {\n  color: #da692d;\n}\n@media (max-width: 800px) {\n  .space-one[_ngcontent-%COMP%]   .custos[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.banner-about[_ngcontent-%COMP%]   .row-banner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n}\n.banner-about[_ngcontent-%COMP%]   .row-banner[_ngcontent-%COMP%]   .col-banner1[_ngcontent-%COMP%] {\n  background-image: url("./media/banner-about0.webp");\n  background-repeat: no-repeat;\n  background-size: cover;\n  object-fit: cover;\n  inset: 0;\n  z-index: -1;\n  width: 60%;\n  height: 450px;\n  display: flex;\n  flex-direction: column;\n}\n.banner-about[_ngcontent-%COMP%]   .row-banner[_ngcontent-%COMP%]   .col-banner2[_ngcontent-%COMP%] {\n  background-color: #1d1d1d;\n  width: 40%;\n  height: 450px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: end;\n  color: #ffffff;\n  font-size: 1.2rem;\n  padding: 0 2em 0 0;\n  line-height: 1.5em;\n}\n.banner-about[_ngcontent-%COMP%]   .row-banner[_ngcontent-%COMP%]   .col-banner2[_ngcontent-%COMP%]   .title-col-banner-2[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 1.3em;\n  font-family:\n    "introBlack",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.banner-about[_ngcontent-%COMP%]   .row-banner[_ngcontent-%COMP%]   .col-banner2[_ngcontent-%COMP%]   .txt-objeto[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n@media (max-width: 800px) {\n  .banner-about[_ngcontent-%COMP%] {\n    height: 500px;\n    background-image: url("./media/banner-about0.1.webp");\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: top;\n    object-fit: cover;\n    inset: 0;\n    z-index: -1;\n  }\n  .row-banner[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n  }\n  .row-banner[_ngcontent-%COMP%]   .col-banner1[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n  }\n  .row-banner[_ngcontent-%COMP%]   .col-banner2[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n  }\n}\n/*# sourceMappingURL=about.component.css.map */'] });
var AboutComponent = _AboutComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent" });
})();

// src/app/components/contact/contact.component.ts
import { Component as Component2, ViewEncapsulation } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import { takeUntilDestroyed } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core_rxjs-interop.js?v=757d2c37";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_forms.js?v=757d2c37";
import { MatButtonModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_button.js?v=757d2c37";
import { MatFormFieldModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_form-field.js?v=757d2c37";
import { MatIconModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_icon.js?v=757d2c37";
import { MatInputModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_input.js?v=757d2c37";
import { MatTooltipModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_tooltip.js?v=757d2c37";
import { merge } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/rxjs.js?v=757d2c37";
import * as i02 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import * as i1 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_form-field.js?v=757d2c37";
import * as i2 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_input.js?v=757d2c37";
import * as i3 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_forms.js?v=757d2c37";
import * as i4 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_button.js?v=757d2c37";
function ContactComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "mat-error");
    i02.\u0275\u0275text(1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance();
    i02.\u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function ContactComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "mat-error");
    i02.\u0275\u0275text(1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance();
    i02.\u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function ContactComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "mat-error");
    i02.\u0275\u0275text(1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance();
    i02.\u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
var _ContactComponent = class _ContactComponent {
  constructor() {
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.nome = new FormControl("", [Validators.required]);
    this.mensagem = new FormControl("", [Validators.required]);
    this.errorMessage = "";
    merge(this.email.statusChanges, this.email.valueChanges, this.nome.statusChanges, this.nome.valueChanges, this.mensagem.statusChanges, this.mensagem.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage());
  }
  updateErrorMessage() {
    if (this.nome.hasError("required")) {
      this.errorMessage = "Campo obrigat\xF3rio.";
    }
    if (this.mensagem.hasError("required")) {
      this.errorMessage = "Campo obrigat\xF3rio.";
    }
    if (this.email.hasError("required")) {
      this.errorMessage = "Campo obrigat\xF3rio.";
    } else if (this.email.hasError("email")) {
      this.errorMessage = "Este e-mail n\xE3o \xE9 v\xE1lido.";
    } else {
      this.errorMessage = "";
    }
  }
};
_ContactComponent.\u0275fac = function ContactComponent_Factory(t) {
  return new (t || _ContactComponent)();
};
_ContactComponent.\u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _ContactComponent, selectors: [["app-contact"]], standalone: true, features: [i02.\u0275\u0275ProvidersFeature([]), i02.\u0275\u0275StandaloneFeature], decls: 43, vars: 6, consts: [[1, "main-section-contact"], [1, "titulo"], [1, "contato"], [1, "details-contato"], [1, "card"], [1, "social-link1"], ["src", "/assets/icons/instagram.svg", "alt", ""], [1, "social-link2"], ["src", "/assets/icons/linkedin.svg", "alt", ""], [1, "social-link3"], ["src", "/assets/icons/youtube.svg", "alt", ""], [1, "social-link4"], ["src", "/assets/icons/whatsapp.svg", "alt", ""], [1, "form-contato"], ["action", ""], [1, "container"], ["appearance", "outline"], ["matInput", "", "required", "", 3, "blur", "formControl"], ["mat-flat-button", "", "type", "submit"]], template: function ContactComponent_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
    i02.\u0275\u0275text(2, "contato");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "h3");
    i02.\u0275\u0275text(6, "Entre em contato conosco");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(7, "p");
    i02.\u0275\u0275text(8, "Telefone: +55 (34) 99907 8808");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(9, "p");
    i02.\u0275\u0275text(10, " Email: grupohgi@grupohgi.com.br");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(11, "div", 4)(12, "a", 5);
    i02.\u0275\u0275element(13, "img", 6);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(14, "a", 7);
    i02.\u0275\u0275element(15, "img", 8);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(16, "a", 9);
    i02.\u0275\u0275element(17, "img", 10);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(18, "a", 11);
    i02.\u0275\u0275element(19, "img", 12);
    i02.\u0275\u0275elementEnd()()();
    i02.\u0275\u0275elementStart(20, "div", 13)(21, "form", 14)(22, "div", 15)(23, "mat-form-field", 16)(24, "mat-label");
    i02.\u0275\u0275text(25, "Nome");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(26, "input", 17);
    i02.\u0275\u0275listener("blur", function ContactComponent_Template_input_blur_26_listener() {
      return ctx.updateErrorMessage();
    });
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275template(27, ContactComponent_Conditional_27_Template, 2, 1, "mat-error");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(28, "div", 15)(29, "mat-form-field", 16)(30, "mat-label");
    i02.\u0275\u0275text(31, "E-Mail");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(32, "input", 17);
    i02.\u0275\u0275listener("blur", function ContactComponent_Template_input_blur_32_listener() {
      return ctx.updateErrorMessage();
    });
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275template(33, ContactComponent_Conditional_33_Template, 2, 1, "mat-error");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(34, "div", 15)(35, "mat-form-field", 16)(36, "mat-label");
    i02.\u0275\u0275text(37, "Mensagem");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(38, "textarea", 17);
    i02.\u0275\u0275listener("blur", function ContactComponent_Template_textarea_blur_38_listener() {
      return ctx.updateErrorMessage();
    });
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275template(39, ContactComponent_Conditional_39_Template, 2, 1, "mat-error");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(40, "div", 15)(41, "button", 18);
    i02.\u0275\u0275text(42, "Enviar");
    i02.\u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    i02.\u0275\u0275advance(26);
    i02.\u0275\u0275property("formControl", ctx.nome);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275conditional(27, ctx.nome.invalid ? 27 : -1);
    i02.\u0275\u0275advance(5);
    i02.\u0275\u0275property("formControl", ctx.email);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275conditional(33, ctx.email.invalid ? 33 : -1);
    i02.\u0275\u0275advance(5);
    i02.\u0275\u0275property("formControl", ctx.mensagem);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275conditional(39, ctx.mensagem.invalid ? 39 : -1);
  }
}, dependencies: [
  MatFormFieldModule,
  i1.MatFormField,
  i1.MatLabel,
  i1.MatError,
  MatInputModule,
  i2.MatInput,
  FormsModule,
  i3.\u0275NgNoValidate,
  i3.DefaultValueAccessor,
  i3.NgControlStatus,
  i3.NgControlStatusGroup,
  i3.RequiredValidator,
  i3.NgForm,
  ReactiveFormsModule,
  i3.FormControlDirective,
  MatButtonModule,
  i4.MatButton,
  MatTooltipModule,
  MatIconModule
], styles: ['/* src/app/components/contact/contact.component.scss */\n.main-section-contact {\n  padding: 2rem 1rem 1rem 1rem;\n  background-color: #000000;\n  color: #ffffff;\n}\n.main-section-contact .titulo {\n  text-align: center;\n  width: 100%;\n  font-size: 3rem;\n  font-weight: 700;\n  color: #edf0f6;\n  font-family:\n    "introBlack",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.main-section-contact .contato {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1rem 1rem 1rem;\n}\n.main-section-contact .contato .details-contato {\n  width: 50%;\n  padding: 0rem 1rem 2rem 2rem;\n}\n.main-section-contact .contato .details-contato .card {\n  display: flex;\n  height: 70px;\n  width: 270px;\n}\n.main-section-contact .contato .details-contato .card img {\n  position: absolute;\n  display: flex;\n  width: 60%;\n  height: 100%;\n  font-size: 24px;\n  font-weight: 700;\n  opacity: 1;\n  transition: opacity 0.25s;\n  z-index: 2;\n  cursor: pointer;\n}\n.main-section-contact .contato .details-contato .card .social-link1,\n.main-section-contact .contato .details-contato .card .social-link2,\n.main-section-contact .contato .details-contato .card .social-link3,\n.main-section-contact .contato .details-contato .card .social-link4 {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 25%;\n  color: whitesmoke;\n  font-size: 24px;\n  text-decoration: none;\n  transition: 0.25s;\n  border-radius: 50px;\n}\n.main-section-contact .contato .details-contato .card img {\n  transform: scale(1);\n}\n.main-section-contact .contato .details-contato .card .social-link1:hover {\n  background: #f09433;\n  background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);\n  background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);\n  background:\n    linear-gradient(\n      45deg,\n      #f09433 0%,\n      #e6683c 25%,\n      #dc2743 50%,\n      #cc2366 75%,\n      #bc1888 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f09433", endColorstr="#bc1888", GradientType=1);\n  animation: bounce_613 0.4s linear;\n}\n.main-section-contact .contato .details-contato .card .social-link2:hover {\n  background-color: #0a66c2;\n  animation: bounce_613 0.4s linear;\n}\n.main-section-contact .contato .details-contato .card .social-link3:hover {\n  background-color: #ff0000;\n  animation: bounce_613 0.4s linear;\n}\n.main-section-contact .contato .details-contato .card .social-link4:hover {\n  background-color: #12a50b;\n  animation: bounce_613 0.4s linear;\n}\n@keyframes bounce_613 {\n  40% {\n    transform: scale(1.4);\n  }\n  60% {\n    transform: scale(0.8);\n  }\n  80% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.main-section-contact .contato .form-contato {\n  width: 50%;\n}\n.main-section-contact .contato .form-contato .container {\n  margin-left: 8px;\n  margin-bottom: 15px;\n}\n@media (max-width: 800px) {\n  .main-section-contact .contato {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 1rem;\n    padding: 1rem 1rem 1rem 1rem;\n  }\n  .main-section-contact .contato .details-contato {\n    width: 100%;\n    padding: 0rem 0rem 0rem 0rem;\n  }\n  .main-section-contact .contato .form-contato {\n    width: 100%;\n  }\n}\n.mat-mdc-form-field {\n  --mat-mdc-form-field-floating-label-scale: 0.75;\n  display: inline-flex;\n  flex-direction: column;\n  min-width: 0;\n  text-align: left;\n  width: 95%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: Roboto, sans-serif;\n  line-height: 24px;\n  font-size: 16px;\n  letter-spacing: 0.03125em;\n  font-weight: 400;\n}\n.mdc-text-field--outlined .mdc-floating-label,\n.mdc-text-field--outlined .mdc-floating-label--float-above,\n.mdc-text-field--outlined .mdc-text-field__input {\n  color: #edf0f6 !important;\n}\nhtml {\n  --mdc-filled-text-field-focus-label-text-color: #ffffff !important;\n  --mdc-filled-text-field-label-text-color: #ffffff !important;\n  --mdc-filled-text-field-hover-label-text-color: #ffffff !important;\n  --mdc-filled-text-field-disabled-label-text-color: #ffffff !important;\n  --mdc-outlined-text-field-focus-label-text-color: #ffffff !important;\n  --mdc-outlined-text-field-label-text-color: #ffffff !important;\n  --mdc-outlined-text-field-hover-label-text-color: #ffffff !important;\n  --mdc-outlined-text-field-disabled-label-text-color: #ffffff !important;\n  --mdc-filled-text-field-error-hover-label-text-color: #36f47f !important;\n  --mdc-filled-text-field-error-focus-label-text-color: #36f47f !important;\n  --mdc-filled-text-field-error-label-text-color: #36f47f !important;\n  --mdc-outlined-text-field-error-focus-label-text-color: #da692d !important;\n  --mdc-outlined-text-field-error-label-text-color: #da692d !important;\n  --mdc-outlined-text-field-error-hover-label-text-color: #e29666 !important;\n  --mdc-filled-text-field-caret-color: #ffffff !important;\n  --mdc-filled-text-field-focus-active-indicator-color: #ffffff !important;\n  --mdc-filled-text-field-container-color: #ffffff !important;\n  --mdc-filled-text-field-disabled-container-color: #fafafa !important;\n  --mdc-filled-text-field-input-text-color: #ffffff !important;\n  --mdc-filled-text-field-disabled-input-text-color: #ffffff !important;\n  --mdc-filled-text-field-input-text-placeholder-color: #ffffff !important;\n  --mdc-filled-text-field-active-indicator-color: #ffffff !important;\n  --mdc-filled-text-field-disabled-active-indicator-color: #ffffff !important;\n  --mdc-filled-text-field-hover-active-indicator-color: #1118e8 !important;\n  --mdc-outlined-text-field-caret-color: #ffffff !important;\n  --mdc-outlined-text-field-focus-outline-color: #ffffff !important;\n  --mdc-outlined-text-field-input-text-color: #ffffff !important;\n  --mdc-outlined-text-field-disabled-input-text-color: #ffffff !important;\n  --mdc-outlined-text-field-input-text-placeholder-color: #ffffff !important;\n  --mdc-outlined-text-field-outline-color: #ffffff !important;\n  --mdc-outlined-text-field-disabled-outline-color: #ffffff !important;\n  --mdc-outlined-text-field-hover-outline-color: #ffffff !important;\n  --mat-form-field-focus-select-arrow-color: #ffffff !important;\n  --mat-form-field-disabled-input-text-placeholder-color: #ffffff !important;\n  --mat-form-field-state-layer-color: #ffffff !important;\n  --mat-form-field-select-option-text-color: inherit;\n  --mat-form-field-select-disabled-option-text-color: GrayText;\n  --mat-form-field-leading-icon-color: unset;\n  --mat-form-field-disabled-leading-icon-color: unset;\n  --mat-form-field-trailing-icon-color: unset;\n  --mat-form-field-disabled-trailing-icon-color: unset;\n  --mat-form-field-enabled-select-arrow-color: #ffffff !important;\n  --mat-form-field-disabled-select-arrow-color: #ffffff !important;\n  --mat-form-field-hover-state-layer-opacity: 0.04;\n  --mat-form-field-focus-state-layer-opacity: 0.08;\n  --mdc-filled-text-field-error-caret-color: #1118e8 !important;\n  --mdc-filled-text-field-error-active-indicator-color: #1118e8 !important;\n  --mdc-filled-text-field-error-focus-active-indicator-color: #1118e8 !important;\n  --mdc-filled-text-field-error-hover-active-indicator-color: #1118e8 !important;\n  --mdc-outlined-text-field-error-caret-color: #ffffff !important;\n  --mdc-outlined-text-field-error-focus-outline-color: #da692d !important;\n  --mdc-outlined-text-field-error-hover-outline-color: #e29666 !important;\n  --mdc-outlined-text-field-error-outline-color: #da692d !important;\n  --mat-form-field-error-text-color: #da692d !important;\n  --mat-form-field-error-focus-trailing-icon-color: unset;\n  --mat-form-field-error-hover-trailing-icon-color: unset;\n  --mat-form-field-error-trailing-icon-color: unset;\n}\n/*# sourceMappingURL=contact.component.css.map */\n'], encapsulation: 2 });
var ContactComponent = _ContactComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(ContactComponent, { className: "ContactComponent" });
})();

// src/app/components/footer/footer.component.ts
import { NgOptimizedImage as NgOptimizedImage2 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component as Component3 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import * as i03 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _FooterComponent = class _FooterComponent {
};
_FooterComponent.\u0275fac = function FooterComponent_Factory(t) {
  return new (t || _FooterComponent)();
};
_FooterComponent.\u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], standalone: true, features: [i03.\u0275\u0275StandaloneFeature], decls: 9, vars: 0, consts: [[1, "footer-distributed"], [1, "footer-img"], [1, "footer-company"], [1, "footer-dev"], ["href", "#"]], template: function FooterComponent_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275elementStart(0, "footer", 0);
    i03.\u0275\u0275element(1, "div", 1);
    i03.\u0275\u0275elementStart(2, "div", 2)(3, "small");
    i03.\u0275\u0275text(4, "HGISUPPLY \xA9 2024");
    i03.\u0275\u0275elementEnd()();
    i03.\u0275\u0275elementStart(5, "div", 3)(6, "a", 4)(7, "small");
    i03.\u0275\u0275text(8, "Designed & Developed by apldeveloper.");
    i03.\u0275\u0275elementEnd()()()();
  }
}, styles: ["\n\n.footer-distributed[_ngcontent-%COMP%] {\n  background: #000000;\n  padding: 55px 50px;\n  color: #f3faf9;\n  font-size: 14px;\n}\n.footer-distributed[_ngcontent-%COMP%]   .footer-img[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 25px;\n}\n.footer-distributed[_ngcontent-%COMP%]   .footer-company[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 10px;\n}\n.footer-distributed[_ngcontent-%COMP%]   .footer-social[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-content: center;\n  margin-top: 25px;\n}\n.footer-distributed[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 15px 15px 15px 15px;\n}\n.footer-dev[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-content: center;\n}\n.footer-dev[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: smaller;\n  color: #f3faf9;\n  text-decoration: none;\n}\n/*# sourceMappingURL=footer.component.css.map */"] });
var FooterComponent = _FooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent" });
})();

// src/app/components/header/header.component.ts
import { NgOptimizedImage as NgOptimizedImage3 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component as Component4 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import * as i04 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _HeaderComponent = class _HeaderComponent {
};
_HeaderComponent.\u0275fac = function HeaderComponent_Factory(t) {
  return new (t || _HeaderComponent)();
};
_HeaderComponent.\u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], standalone: true, features: [i04.\u0275\u0275StandaloneFeature], decls: 9, vars: 0, consts: [[1, "section-header"], [1, "logo"], [1, "logo-grupo"], [1, "logo-hgi"], [1, "slogan"], [1, "descricao"]], template: function HeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "span", 2);
    i04.\u0275\u0275text(3, "GRUPO");
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275elementStart(4, "span", 3);
    i04.\u0275\u0275text(5, "HGI");
    i04.\u0275\u0275elementEnd()();
    i04.\u0275\u0275elementStart(6, "div", 4)(7, "span", 5);
    i04.\u0275\u0275text(8, "Sistemas integrados");
    i04.\u0275\u0275elementEnd()()();
  }
}, styles: ['\n\n.section-header[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.section-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n}\n.section-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   .logo-grupo[_ngcontent-%COMP%] {\n  font-size: 5.9vw;\n  font-weight: 900;\n  font-family: "introBlack";\n  color: #58595c;\n}\n.section-header[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   .logo-hgi[_ngcontent-%COMP%] {\n  font-size: 5.9rem;\n  font-weight: 900;\n  font-family: "CoconBold";\n  color: #da692d;\n}\n.section-header[_ngcontent-%COMP%]   .slogan[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n}\n.section-header[_ngcontent-%COMP%]   .slogan[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.9vw;\n  color: #58595c;\n  font-family: "introBlack";\n  margin-bottom: 2rem;\n}\n@media screen and (max-width: 963px) {\n  .logo[_ngcontent-%COMP%]   .hgi[_ngcontent-%COMP%] {\n    font-size: 15vw;\n  }\n  .logo[_ngcontent-%COMP%]   .supply[_ngcontent-%COMP%] {\n    font-size: 11vw;\n  }\n  .slogan[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%] {\n    font-size: 4.5vw;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */'] });
var HeaderComponent = _HeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent" });
})();

// src/app/components/menu/menu.component.ts
import { Component as Component5 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import { MatButtonModule as MatButtonModule2 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_button.js?v=757d2c37";
import { MatIconModule as MatIconModule2 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_icon.js?v=757d2c37";
import { MatListModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_list.js?v=757d2c37";
import { MatMenuModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_menu.js?v=757d2c37";
import { MatSidenavModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_sidenav.js?v=757d2c37";
import { MatToolbarModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_toolbar.js?v=757d2c37";
import * as i05 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import * as i12 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_button.js?v=757d2c37";
import * as i22 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_icon.js?v=757d2c37";
var _MenuComponent = class _MenuComponent {
};
_MenuComponent.\u0275fac = function MenuComponent_Factory(t) {
  return new (t || _MenuComponent)();
};
_MenuComponent.\u0275cmp = /* @__PURE__ */ i05.\u0275\u0275defineComponent({ type: _MenuComponent, selectors: [["app-menu"]], standalone: true, features: [i05.\u0275\u0275StandaloneFeature], decls: 15, vars: 0, consts: [[1, "menu"], [1, "nav"], ["mat-button", ""], ["mat-icon-button", "", "aria-label", "x"]], template: function MenuComponent_Template(rf, ctx) {
  if (rf & 1) {
    i05.\u0275\u0275elementStart(0, "menu", 0)(1, "nav", 1)(2, "button", 2);
    i05.\u0275\u0275text(3, "Home");
    i05.\u0275\u0275elementEnd();
    i05.\u0275\u0275elementStart(4, "button", 2);
    i05.\u0275\u0275text(5, "Quem Somos");
    i05.\u0275\u0275elementEnd();
    i05.\u0275\u0275elementStart(6, "button", 2);
    i05.\u0275\u0275text(7, "Nosso Prop\xF3sito");
    i05.\u0275\u0275elementEnd();
    i05.\u0275\u0275elementStart(8, "button", 2);
    i05.\u0275\u0275text(9, "Trilha de Negocia\xE7\xE3o");
    i05.\u0275\u0275elementEnd();
    i05.\u0275\u0275elementStart(10, "button", 2);
    i05.\u0275\u0275text(11, "Contato");
    i05.\u0275\u0275elementEnd();
    i05.\u0275\u0275elementStart(12, "button", 3)(13, "mat-icon");
    i05.\u0275\u0275text(14, "menu");
    i05.\u0275\u0275elementEnd()()()();
  }
}, dependencies: [
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule2,
  i12.MatButton,
  i12.MatIconButton,
  MatIconModule2,
  i22.MatIcon,
  MatSidenavModule,
  MatListModule
], styles: ["\n\n.menu[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.menu[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.menu[_ngcontent-%COMP%]   .btns[_ngcontent-%COMP%] {\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  justify-content: end;\n}\n.menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: roboto, sans-serif;\n}\n/*# sourceMappingURL=menu.component.css.map */"] });
var MenuComponent = _MenuComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i05.\u0275setClassDebugInfo(MenuComponent, { className: "MenuComponent" });
})();

// src/app/components/business-units/business-units.component.ts
import { NgOptimizedImage as NgOptimizedImage5 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component as Component7 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";

// src/app/components/btn-detalhes/btn-detalhes.component.ts
import { NgOptimizedImage as NgOptimizedImage4 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component as Component6 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import { MatCardModule } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_card.js?v=757d2c37";
import { MatIconModule as MatIconModule3 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_icon.js?v=757d2c37";
import { RouterLink } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_router.js?v=757d2c37";
import * as i06 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _BtnDetalheComponent = class _BtnDetalheComponent {
  constructor() {
  }
};
_BtnDetalheComponent.\u0275fac = function BtnDetalheComponent_Factory(t) {
  return new (t || _BtnDetalheComponent)();
};
_BtnDetalheComponent.\u0275cmp = /* @__PURE__ */ i06.\u0275\u0275defineComponent({ type: _BtnDetalheComponent, selectors: [["app-btn-detalhes"]], standalone: true, features: [i06.\u0275\u0275ProvidersFeature([]), i06.\u0275\u0275StandaloneFeature], decls: 10, vars: 0, consts: [[1, "btn-conteiner"], ["href", "#", 1, "btn-content"], [1, "btn-title"], [1, "icon-arrow"], ["width", "66px", "height", "43px", "viewBox", "0 0 66 43", "version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink"], ["id", "arrow", "stroke", "none", "stroke-width", "1", "fill", "none", "fill-rule", "evenodd"], ["id", "arrow-icon-one", "d", "M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z", "fill", "#FFFFFF"], ["id", "arrow-icon-two", "d", "M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z", "fill", "#FFFFFF"], ["id", "arrow-icon-three", "d", "M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z", "fill", "#FFFFFF"]], template: function BtnDetalheComponent_Template(rf, ctx) {
  if (rf & 1) {
    i06.\u0275\u0275elementStart(0, "div", 0)(1, "a", 1)(2, "span", 2);
    i06.\u0275\u0275text(3, "+ DETALHES");
    i06.\u0275\u0275elementEnd();
    i06.\u0275\u0275elementStart(4, "span", 3);
    i06.\u0275\u0275namespaceSVG();
    i06.\u0275\u0275elementStart(5, "svg", 4)(6, "g", 5);
    i06.\u0275\u0275element(7, "path", 6)(8, "path", 7)(9, "path", 8);
    i06.\u0275\u0275elementEnd()()()()();
  }
}, dependencies: [MatCardModule, MatIconModule3], styles: ['\n\n.btn-conteiner[_ngcontent-%COMP%] {\n  width: 95%;\n  display: flex;\n  justify-content: right;\n  --color-text: #fdf3f3;\n  --color-background: #da692d;\n  --color-outline: #e28b55;\n  --color-shadow: #3f1219;\n}\n.btn-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 2px 30px;\n  text-decoration: none;\n  font-family: "Poppins", sans-serif;\n  font-weight: 700;\n  font-size: 17px;\n  color: var(--color-text);\n  background: var(--color-background);\n  transition: 1s;\n  border-radius: 100px;\n  box-shadow: 0 0 0.2em 0 var(--color-background);\n}\n.btn-content[_ngcontent-%COMP%]:hover, .btn-content[_ngcontent-%COMP%]:focus {\n  transition: 0.5s;\n  -webkit-animation: _ngcontent-%COMP%_btn-content 1s;\n  animation: _ngcontent-%COMP%_btn-content 1s;\n  outline: 0.1em solid transparent;\n  outline-offset: 0.2em;\n  box-shadow: 0 0 0.4em 0 var(--color-background);\n}\n.btn-content[_ngcontent-%COMP%]   .icon-arrow[_ngcontent-%COMP%] {\n  transition: 0.5s;\n  margin-right: 0px;\n  transform: scale(0.6);\n}\n.btn-content[_ngcontent-%COMP%]:hover   .icon-arrow[_ngcontent-%COMP%] {\n  transition: 0.5s;\n  margin-right: 25px;\n}\n.icon-arrow[_ngcontent-%COMP%] {\n  width: 20px;\n  margin-left: 15px;\n  position: relative;\n  top: 6%;\n}\n#arrow-icon-one[_ngcontent-%COMP%] {\n  transition: 0.4s;\n  transform: translateX(-60%);\n}\n#arrow-icon-two[_ngcontent-%COMP%] {\n  transition: 0.5s;\n  transform: translateX(-30%);\n}\n.btn-content[_ngcontent-%COMP%]:hover   #arrow-icon-three[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_color_anim 1s infinite 0.2s;\n}\n.btn-content[_ngcontent-%COMP%]:hover   #arrow-icon-one[_ngcontent-%COMP%] {\n  transform: translateX(0%);\n  animation: _ngcontent-%COMP%_color_anim 1s infinite 0.6s;\n}\n.btn-content[_ngcontent-%COMP%]:hover   #arrow-icon-two[_ngcontent-%COMP%] {\n  transform: translateX(0%);\n  animation: _ngcontent-%COMP%_color_anim 1s infinite 0.4s;\n}\n@keyframes _ngcontent-%COMP%_color_anim {\n  0% {\n    fill: white;\n  }\n  50% {\n    fill: var(--color-background);\n  }\n  100% {\n    fill: white;\n  }\n}\n@-webkit-keyframes _ngcontent-%COMP%_btn-content {\n  0% {\n    outline: 0.2em solid var(--color-background);\n    outline-offset: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_btn-content {\n  0% {\n    outline: 0.2em solid var(--color-background);\n    outline-offset: 0;\n  }\n}\n/*# sourceMappingURL=btn-detalhes.component.css.map */'] });
var BtnDetalheComponent = _BtnDetalheComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i06.\u0275setClassDebugInfo(BtnDetalheComponent, { className: "BtnDetalheComponent" });
})();

// src/app/components/business-units/business-units.component.ts
import * as i07 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _BusinessUnitsComponent = class _BusinessUnitsComponent {
  constructor() {
  }
  ngOnInit() {
  }
};
_BusinessUnitsComponent.\u0275fac = function BusinessUnitsComponent_Factory(t) {
  return new (t || _BusinessUnitsComponent)();
};
_BusinessUnitsComponent.\u0275cmp = /* @__PURE__ */ i07.\u0275\u0275defineComponent({ type: _BusinessUnitsComponent, selectors: [["app-business-units"]], standalone: true, features: [i07.\u0275\u0275ProvidersFeature([]), i07.\u0275\u0275StandaloneFeature], decls: 111, vars: 0, consts: [[1, "business-units-section"], [1, "titulo"], [1, "subtitulo"], [1, "content-body"], [1, "notification"], [1, "notiglow"], [1, "notiborderglow"], [1, "notititle"], [1, "logo-inicial-small"], [1, "logo-und-small"], [1, "notibody"], [1, "btnDetalhes"], ["href", "#", 1, "menu__link"], [1, "btnSimboloDetalhes"]], template: function BusinessUnitsComponent_Template(rf, ctx) {
  if (rf & 1) {
    i07.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
    i07.\u0275\u0275text(2, "UNIDADES DE NEG\xD3CIO");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275element(3, "div", 2);
    i07.\u0275\u0275elementStart(4, "div", 3)(5, "div", 4);
    i07.\u0275\u0275element(6, "div", 5)(7, "div", 6);
    i07.\u0275\u0275elementStart(8, "div", 7)(9, "span", 8);
    i07.\u0275\u0275text(10, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(11, "span", 9);
    i07.\u0275\u0275text(12, "SUPPLY");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(13, "div", 10);
    i07.\u0275\u0275text(14, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(15, "div", 11)(16, "a", 12)(17, "span", 13);
    i07.\u0275\u0275text(18, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(19, " Detalhes");
    i07.\u0275\u0275elementEnd()()();
    i07.\u0275\u0275elementStart(20, "div", 4);
    i07.\u0275\u0275element(21, "div", 5)(22, "div", 6);
    i07.\u0275\u0275elementStart(23, "div", 7)(24, "span", 8);
    i07.\u0275\u0275text(25, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(26, "span", 9);
    i07.\u0275\u0275text(27, "MKT T\xC9CNICO");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(28, "div", 10);
    i07.\u0275\u0275text(29, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(30, "div", 11)(31, "a", 12)(32, "span", 13);
    i07.\u0275\u0275text(33, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(34, " Detalhes");
    i07.\u0275\u0275elementEnd()()();
    i07.\u0275\u0275elementStart(35, "div", 4);
    i07.\u0275\u0275element(36, "div", 5)(37, "div", 6);
    i07.\u0275\u0275elementStart(38, "div", 7)(39, "span", 8);
    i07.\u0275\u0275text(40, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(41, "span", 9);
    i07.\u0275\u0275text(42, "GEST\xC3O DE OBRAS");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(43, "div", 10);
    i07.\u0275\u0275text(44, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(45, "div", 11)(46, "a", 12)(47, "span", 13);
    i07.\u0275\u0275text(48, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(49, " Detalhes");
    i07.\u0275\u0275elementEnd()()();
    i07.\u0275\u0275elementStart(50, "div", 4);
    i07.\u0275\u0275element(51, "div", 5)(52, "div", 6);
    i07.\u0275\u0275elementStart(53, "div", 7)(54, "span", 8);
    i07.\u0275\u0275text(55, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(56, "span", 9);
    i07.\u0275\u0275text(57, "EDUCA\xC7\xC3O");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(58, "div", 10);
    i07.\u0275\u0275text(59, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(60, "div", 11)(61, "a", 12)(62, "span", 13);
    i07.\u0275\u0275text(63, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(64, " Detalhes");
    i07.\u0275\u0275elementEnd()()()();
    i07.\u0275\u0275elementStart(65, "div", 3)(66, "div", 4);
    i07.\u0275\u0275element(67, "div", 5)(68, "div", 6);
    i07.\u0275\u0275elementStart(69, "div", 7)(70, "span", 8);
    i07.\u0275\u0275text(71, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(72, "span", 9);
    i07.\u0275\u0275text(73, "CONSULTORIA");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(74, "div", 10);
    i07.\u0275\u0275text(75, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(76, "div", 11)(77, "a", 12)(78, "span", 13);
    i07.\u0275\u0275text(79, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(80, " Detalhes");
    i07.\u0275\u0275elementEnd()()();
    i07.\u0275\u0275elementStart(81, "div", 4);
    i07.\u0275\u0275element(82, "div", 5)(83, "div", 6);
    i07.\u0275\u0275elementStart(84, "div", 7)(85, "span", 8);
    i07.\u0275\u0275text(86, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(87, "span", 9);
    i07.\u0275\u0275text(88, "SERVI\xC7OS ESPECIAIS");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(89, "div", 10);
    i07.\u0275\u0275text(90, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(91, "div", 11)(92, "a", 12)(93, "span", 13);
    i07.\u0275\u0275text(94, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(95, " Detalhes");
    i07.\u0275\u0275elementEnd()()();
    i07.\u0275\u0275elementStart(96, "div", 4);
    i07.\u0275\u0275element(97, "div", 5)(98, "div", 6);
    i07.\u0275\u0275elementStart(99, "div", 7)(100, "span", 8);
    i07.\u0275\u0275text(101, "HGI");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(102, "span", 9);
    i07.\u0275\u0275text(103, "SEGURAN\xC7A DO TRABALHO");
    i07.\u0275\u0275elementEnd()();
    i07.\u0275\u0275elementStart(104, "div", 10);
    i07.\u0275\u0275text(105, " Contribute to Open Source UI Elements ");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(106, "div", 11)(107, "a", 12)(108, "span", 13);
    i07.\u0275\u0275text(109, "+");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275text(110, " Detalhes");
    i07.\u0275\u0275elementEnd()()()()();
  }
}, styles: ['\n\n.business-units-section[_ngcontent-%COMP%] {\n  padding: 2rem 1rem 1rem 1em;\n  background-color: #1e242b;\n  background-image:\n    radial-gradient(\n      at 47% 33%,\n      hsl(212.31, 18%, 14%) 0,\n      transparent 59%),\n    radial-gradient(\n      at 82% 65%,\n      hsl(206.67, 20%, 18%) 0,\n      transparent 55%);\n  height: auto;\n}\n.business-units-section[_ngcontent-%COMP%]   .titulo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  text-align: center;\n  font-size: 3rem;\n  font-weight: 700;\n  color: #f6f8f9;\n  font-family:\n    "introBlack",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1rem 1rem 1rem;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  isolation: isolate;\n  position: relative;\n  width: 100%;\n  height: 11rem;\n  background: #29292c;\n  border-radius: 5px;\n  overflow: hidden;\n  font-family:\n    "Space Grotesk",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n  font-size: 16px;\n  --gradient:\n    linear-gradient(\n      to bottom,\n      #ffb670,\n      #ff731c,\n      #f05006);\n  --color: #ff8c37 ;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:before {\n  position: absolute;\n  content: "";\n  inset: 0.0625rem;\n  border-radius: 5px;\n  background: #18181b;\n  z-index: 2;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:after {\n  position: absolute;\n  content: "";\n  width: 0.25rem;\n  inset: 0.65rem auto 0.65rem 0.5rem;\n  border-radius: 5px;\n  background: var(--gradient);\n  transition: transform 300ms ease;\n  z-index: 4;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:hover:after {\n  transform: translateX(0.15rem);\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notititle[_ngcontent-%COMP%] {\n  padding: 0.65rem 0.25rem 0.4rem 1.25rem;\n  transition: transform 300ms ease;\n  z-index: 5;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notititle[_ngcontent-%COMP%]   .logo-inicial-small[_ngcontent-%COMP%] {\n  color: #ff8c37;\n  font-size: 2.1rem;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notititle[_ngcontent-%COMP%]   .logo-und-small[_ngcontent-%COMP%] {\n  color: #f6f8f9;\n  font-size: 1.2rem;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:hover   .notititle[_ngcontent-%COMP%] {\n  transform: translateX(0.15rem);\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notibody[_ngcontent-%COMP%] {\n  color: #f6f8f9;\n  padding: 0 1.25rem;\n  transition: transform 300ms ease;\n  z-index: 5;\n  height: -webkit-fill-available;\n  display: flex;\n  flex-direction: row;\n  justify-content: left;\n  align-items: center;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:hover   .notibody[_ngcontent-%COMP%] {\n  transform: translateX(0.25rem);\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notiglow[_ngcontent-%COMP%], .business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notiborderglow[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 20rem;\n  height: 20rem;\n  transform: translate(-50%, -50%);\n  background:\n    radial-gradient(\n      circle closest-side at center,\n      white,\n      transparent);\n  opacity: 0;\n  transition: opacity 300ms ease;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notiglow[_ngcontent-%COMP%] {\n  z-index: 3;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notiborderglow[_ngcontent-%COMP%] {\n  z-index: 1;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:hover   .notiglow[_ngcontent-%COMP%] {\n  opacity: 0.1;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]:hover   .notiborderglow[_ngcontent-%COMP%] {\n  opacity: 0.1;\n}\n.business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%]   .note[_ngcontent-%COMP%] {\n  color: var(--color);\n  position: fixed;\n  top: 80%;\n  left: 50%;\n  transform: translateX(-50%);\n  text-align: center;\n  font-size: 0.9rem;\n  width: 75%;\n}\n.business-units-section[_ngcontent-%COMP%]   .btnDetalhes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  padding: 0 15px 15px 0;\n  transition: transform 300ms ease;\n  z-index: 5;\n}\n.business-units-section[_ngcontent-%COMP%]   .btnDetalhes[_ngcontent-%COMP%]   .btnSimboloDetalhes[_ngcontent-%COMP%] {\n  font-size: 15px;\n  margin-right: 5px;\n}\n.business-units-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.business-units-section[_ngcontent-%COMP%]   .menu__link[_ngcontent-%COMP%] {\n  color: #ff8c37;\n  line-height: 2;\n  position: relative;\n}\n.business-units-section[_ngcontent-%COMP%]   .menu__link[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 100%;\n  height: 2px;\n  border-radius: 2px;\n  background-color: #ff8c37;\n  position: absolute;\n  bottom: -0.5rem;\n  left: 0;\n  transition: transform 0.4s, opacity 0.4s;\n  opacity: 0;\n}\n.business-units-section[_ngcontent-%COMP%]   .menu__link[_ngcontent-%COMP%]:hover::before {\n  transform: translateY(-0.25rem);\n  opacity: 1;\n}\n@media (max-width: 800px) {\n  .business-units-section[_ngcontent-%COMP%]   .content-body[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=business-units.component.css.map */'] });
var BusinessUnitsComponent = _BusinessUnitsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i07.\u0275setClassDebugInfo(BusinessUnitsComponent, { className: "BusinessUnitsComponent" });
})();

// src/app/components/home/home.component.ts
import * as i08 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _HomeComponent = class _HomeComponent {
};
_HomeComponent.\u0275fac = function HomeComponent_Factory(t) {
  return new (t || _HomeComponent)();
};
_HomeComponent.\u0275cmp = /* @__PURE__ */ i08.\u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], standalone: true, features: [i08.\u0275\u0275ProvidersFeature([]), i08.\u0275\u0275StandaloneFeature], decls: 6, vars: 0, template: function HomeComponent_Template(rf, ctx) {
  if (rf & 1) {
    i08.\u0275\u0275element(0, "app-menu")(1, "app-header")(2, "app-about")(3, "app-business-units")(4, "app-contact")(5, "app-footer");
  }
}, dependencies: [
  MenuComponent,
  HeaderComponent,
  AboutComponent,
  BusinessUnitsComponent,
  ContactComponent,
  FooterComponent
] });
var HomeComponent = _HomeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i08.\u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent" });
})();

// src/app/components/business-units/hgi-supply/hgi-supply.component.ts
import { NgOptimizedImage as NgOptimizedImage7 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_common.js?v=757d2c37";
import { Component as Component9 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import { MatListModule as MatListModule2 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_material_list.js?v=757d2c37";
import * as i09 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _HgiSupplyComponent = class _HgiSupplyComponent {
  constructor() {
  }
  ngOnInit() {
  }
};
_HgiSupplyComponent.\u0275fac = function HgiSupplyComponent_Factory(t) {
  return new (t || _HgiSupplyComponent)();
};
_HgiSupplyComponent.\u0275cmp = /* @__PURE__ */ i09.\u0275\u0275defineComponent({ type: _HgiSupplyComponent, selectors: [["app-hgi-supply"]], standalone: true, features: [i09.\u0275\u0275ProvidersFeature([]), i09.\u0275\u0275StandaloneFeature], decls: 568, vars: 0, consts: [[1, "section-supply"], [1, "titulo"], [1, "ag-timeline-block"], [1, "ag-section"], [1, "ag-format-container"], [1, "js-timeline", "ag-timeline"], [1, "js-timeline_line", "ag-timeline_line"], [1, "js-timeline_line-progress", "ag-timeline_line-progress"], [1, "ag-timeline_list"], [1, "js-timeline_item", "ag-timeline_item"], [1, "ag-timeline-card_box"], [1, "js-timeline-card_point-box", "ag-timeline-card_point-box"], [1, "ag-timeline-card_point"], [1, "ag-timeline-card_meta-box"], [1, "ag-timeline-card_item"], [1, "ag-timeline-card_inner"], [1, "ag-timeline-card_info"], [1, "ag-timeline-card_title"], [1, "ag-timeline-card_subtitle"], [1, "ag-timeline-card_desc"], [1, "details-station"], [1, "ag-timeline-card_arrow"]], template: function HgiSupplyComponent_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
    i09.\u0275\u0275text(2, "TRILHA DE NEGOCIA\xC7\xD5ES");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(3, "div", 2)(4, "section", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6);
    i09.\u0275\u0275element(8, "div", 7);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "div", 11)(13, "div", 12);
    i09.\u0275\u0275text(14, "01");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(15, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(16, "div", 14)(17, "div", 15)(18, "div", 16)(19, "div", 17);
    i09.\u0275\u0275text(20, "STATION 1");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(21, "div", 18);
    i09.\u0275\u0275text(22, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(23, "br");
    i09.\u0275\u0275text(24, " Infraestrutura subterr\xE2nea");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(25, "div", 19);
    i09.\u0275\u0275text(26, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a ENTRADA DE ENERGIA SUBTERR\xC2NEA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(27, "div", 20)(28, "h4");
    i09.\u0275\u0275text(29, "01 - QGBT - QUADRO GERAL DE BAIXA TENS\xC3O");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(30, "h4");
    i09.\u0275\u0275text(31, "02 - ELETRODUTOS");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(32, "h4");
    i09.\u0275\u0275text(33, "03 - CABOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(34, "h4");
    i09.\u0275\u0275text(35, "04 - QM - QUADRO MEDIDOR");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(36, "h4");
    i09.\u0275\u0275text(37, "05 - POSTEAMENTO DECORATIVO / FOTOC\xC9LULA E LUMIN\xC1RIAS");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(38, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(39, "div", 9)(40, "div", 10);
    i09.\u0275\u0275element(41, "div", 13);
    i09.\u0275\u0275elementStart(42, "div", 11)(43, "div", 12);
    i09.\u0275\u0275text(44, "02");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(45, "div", 14)(46, "div", 15)(47, "div", 16)(48, "div", 17);
    i09.\u0275\u0275text(49, "STATION 2");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(50, "div", 18);
    i09.\u0275\u0275text(51, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(52, "br");
    i09.\u0275\u0275text(53, " Infraestrutura a\xE9rea");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(54, "div", 19);
    i09.\u0275\u0275text(55, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a ENTRADA DE ENERGIA A\xC9REA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(56, "div", 20)(57, "h4");
    i09.\u0275\u0275text(58, "01 - POSTES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(59, "h4");
    i09.\u0275\u0275text(60, "02 - TRANSFORMADORES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(61, "h4");
    i09.\u0275\u0275text(62, "03 - CABOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(63, "h4");
    i09.\u0275\u0275text(64, "04 - MISCEL\xC2NEAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(65, "h4");
    i09.\u0275\u0275text(66, "05 - POSTEAMENTO DECORATIVO / FOTOC\xC9LULA E LUMIN\xC1RIAS");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(67, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(68, "div", 9)(69, "div", 10)(70, "div", 11)(71, "div", 12);
    i09.\u0275\u0275text(72, "03");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(73, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(74, "div", 14)(75, "div", 15)(76, "div", 16)(77, "div", 17);
    i09.\u0275\u0275text(78, "STATION 3");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(79, "div", 18);
    i09.\u0275\u0275text(80, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(81, "br");
    i09.\u0275\u0275text(82, " El\xE9trica predial - Estrutura");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(83, "div", 19);
    i09.\u0275\u0275text(84, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a EL\xC9TRICA PREDIAL - ESTRUTURA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(85, "div", 20)(86, "h4");
    i09.\u0275\u0275text(87, "01 - ELETRODUTOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(88, "h4");
    i09.\u0275\u0275text(89, "02 - QDC - QUADRO DE DISTRIBUI\xC7\xC3O DE CIRC\xDAITOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(90, "h4");
    i09.\u0275\u0275text(91, "03 - CAIXINHAS EL\xC9TRICAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(92, "h4");
    i09.\u0275\u0275text(93, "04 - CABOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(94, "h4");
    i09.\u0275\u0275text(95, "05 - TERMINAIS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(96, "h4");
    i09.\u0275\u0275text(97, "06 - ESPA\xC7ADORES E FITAS ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(98, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(99, "div", 9)(100, "div", 10);
    i09.\u0275\u0275element(101, "div", 13);
    i09.\u0275\u0275elementStart(102, "div", 11)(103, "div", 12);
    i09.\u0275\u0275text(104, "04");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(105, "div", 14)(106, "div", 15)(107, "div", 16)(108, "div", 17);
    i09.\u0275\u0275text(109, "STATION 4");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(110, "div", 18);
    i09.\u0275\u0275text(111, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(112, "br");
    i09.\u0275\u0275text(113, " El\xE9trica predial ");
    i09.\u0275\u0275element(114, "br");
    i09.\u0275\u0275text(115, " Disjuntores e miscel\xE2neas");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(116, "div", 19);
    i09.\u0275\u0275text(117, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a EL\xC9TRICA PREDIAL - DISJUNTORES E MISCEL\xC2NEAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(118, "div", 20)(119, "h4");
    i09.\u0275\u0275text(120, "01 - DRs ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(121, "h4");
    i09.\u0275\u0275text(122, "02 - DPs ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(123, "h4");
    i09.\u0275\u0275text(124, "03 - DISJUNTORES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(125, "h4");
    i09.\u0275\u0275text(126, "04 - BARRAMENTOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(127, "h4");
    i09.\u0275\u0275text(128, "05 - TERMINAIS E ANILHAS ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(129, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(130, "div", 9)(131, "div", 10)(132, "div", 11)(133, "div", 12);
    i09.\u0275\u0275text(134, "05");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(135, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(136, "div", 14)(137, "div", 15)(138, "div", 16)(139, "div", 17);
    i09.\u0275\u0275text(140, "STATION 5");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(141, "div", 18);
    i09.\u0275\u0275text(142, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(143, "br");
    i09.\u0275\u0275text(144, " El\xE9trica predial ");
    i09.\u0275\u0275element(145, "br");
    i09.\u0275\u0275text(146, " Acabamento el\xE9trico");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(147, "div", 19);
    i09.\u0275\u0275text(148, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a EL\xC9TRICA PREDIAL ACABAMENTO EL\xC9TRICO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(149, "div", 20)(150, "h4");
    i09.\u0275\u0275text(151, "01 - TOMADAS / INTERRUPTORES / ESPELHOS / USB ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(152, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(153, "div", 9)(154, "div", 10);
    i09.\u0275\u0275element(155, "div", 13);
    i09.\u0275\u0275elementStart(156, "div", 11)(157, "div", 12);
    i09.\u0275\u0275text(158, "06");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(159, "div", 14)(160, "div", 15)(161, "div", 16)(162, "div", 17);
    i09.\u0275\u0275text(163, "STATION 6");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(164, "div", 18);
    i09.\u0275\u0275text(165, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(166, "br");
    i09.\u0275\u0275text(167, " El\xE9trica predial ");
    i09.\u0275\u0275element(168, "br");
    i09.\u0275\u0275text(169, " Lumin\xE1rias e sensores");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(170, "div", 19);
    i09.\u0275\u0275text(171, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a EL\xC9TRICA PREDIAL LUMIN\xC1RIAS E SENSORES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(172, "div", 20)(173, "h4");
    i09.\u0275\u0275text(174, "01 - LUMIN\xC1RIAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(175, "h4");
    i09.\u0275\u0275text(176, "02 - SENSORES DE PRESEN\xC7A ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(177, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(178, "div", 9)(179, "div", 10)(180, "div", 11)(181, "div", 12);
    i09.\u0275\u0275text(182, "07");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(183, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(184, "div", 14)(185, "div", 15)(186, "div", 16)(187, "div", 17);
    i09.\u0275\u0275text(188, "STATION 7");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(189, "div", 18);
    i09.\u0275\u0275text(190, "Sistema el\xE9trico ");
    i09.\u0275\u0275element(191, "br");
    i09.\u0275\u0275text(192, " Infraestrutura esgoto");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(193, "div", 19);
    i09.\u0275\u0275text(194, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a INFRAESTRUTURA ESGOTO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(195, "div", 20)(196, "h4");
    i09.\u0275\u0275text(197, "01 - CAIXAS PR\xC9-MOLDADAS DE CONCRETO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(198, "h4");
    i09.\u0275\u0275text(199, "02 - CAIXAS PVC 360\xBA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(200, "h4");
    i09.\u0275\u0275text(201, "03 - TUBOS E CONEX\xD5ES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(202, "h4");
    i09.\u0275\u0275text(203, "04 - MANILHAS DE CONCRETO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(204, "h4");
    i09.\u0275\u0275text(205, "05 - ETE ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(206, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(207, "div", 9)(208, "div", 10);
    i09.\u0275\u0275element(209, "div", 13);
    i09.\u0275\u0275elementStart(210, "div", 11)(211, "div", 12);
    i09.\u0275\u0275text(212, "08");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(213, "div", 14)(214, "div", 15)(215, "div", 16)(216, "div", 17);
    i09.\u0275\u0275text(217, "STATION 8");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(218, "div", 18);
    i09.\u0275\u0275text(219, "Sistema hidr\xE1ulico ");
    i09.\u0275\u0275element(220, "br");
    i09.\u0275\u0275text(221, " Esgoto predial");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(222, "div", 19);
    i09.\u0275\u0275text(223, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao ESGOTO PREDIAL ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(224, "div", 20)(225, "h4");
    i09.\u0275\u0275text(226, "01 - PASSANTES DE LAJE ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(227, "h4");
    i09.\u0275\u0275text(228, "02 - TUBOS E CONEX\xD5ES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(229, "h4");
    i09.\u0275\u0275text(230, "03 - ANTI INFILTRA\xC7\xC3O ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(231, "h4");
    i09.\u0275\u0275text(232, "04 - FIXA\xC7\xD5ES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(233, "h4");
    i09.\u0275\u0275text(234, "05 - BLOQUEADORES E ACABAMENTOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(235, "h4");
    i09.\u0275\u0275text(236, "06 - SIF\xC3OS E V\xC1LVULAS ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(237, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(238, "div", 9)(239, "div", 10)(240, "div", 11)(241, "div", 12);
    i09.\u0275\u0275text(242, "09");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(243, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(244, "div", 14)(245, "div", 15)(246, "div", 16)(247, "div", 17);
    i09.\u0275\u0275text(248, "STATION 9");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(249, "div", 18);
    i09.\u0275\u0275text(250, "Sistema hidr\xE1ulico ");
    i09.\u0275\u0275element(251, "br");
    i09.\u0275\u0275text(252, " Infraestrutura drenagem");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(253, "div", 19);
    i09.\u0275\u0275text(254, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a INFRAESTRUTURA DRENAGEM ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(255, "div", 20)(256, "h4");
    i09.\u0275\u0275text(257, "01 - CAIXAS PR\xC9-MOLDADAS DE CONCRETO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(258, "h4");
    i09.\u0275\u0275text(259, "02 - CAIXAS PVC 360\xBA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(260, "h4");
    i09.\u0275\u0275text(261, "03 - TUBOS E CONEX\xD5ES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(262, "h4");
    i09.\u0275\u0275text(263, "04 - MANILHAS DE CONCRETO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(264, "h4");
    i09.\u0275\u0275text(265, "05 - TUBO PEAD ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(266, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(267, "div", 9)(268, "div", 10);
    i09.\u0275\u0275element(269, "div", 13);
    i09.\u0275\u0275elementStart(270, "div", 11)(271, "div", 12);
    i09.\u0275\u0275text(272, "10");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(273, "div", 14)(274, "div", 15)(275, "div", 16)(276, "div", 17);
    i09.\u0275\u0275text(277, "STATION 10");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(278, "div", 18);
    i09.\u0275\u0275text(279, "Sistema hidr\xE1ulico ");
    i09.\u0275\u0275element(280, "br");
    i09.\u0275\u0275text(281, " Drenagem predial");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(282, "div", 19);
    i09.\u0275\u0275text(283, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a DRENAGEM PREDIAL ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(284, "div", 20)(285, "h4");
    i09.\u0275\u0275text(286, "01 - BOCAL CALHA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(287, "h4");
    i09.\u0275\u0275text(288, "02 - PASSANTES DE LAJE ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(289, "h4");
    i09.\u0275\u0275text(290, "03 - TUBOS E CONEX\xD5ES ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(291, "h4");
    i09.\u0275\u0275text(292, "04 - FIXA\xC7\xD5ES ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(293, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(294, "div", 9)(295, "div", 10)(296, "div", 11)(297, "div", 12);
    i09.\u0275\u0275text(298, "11");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(299, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(300, "div", 14)(301, "div", 15)(302, "div", 16)(303, "div", 17);
    i09.\u0275\u0275text(304, "STATION 11");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(305, "div", 18);
    i09.\u0275\u0275text(306, "Sistema hidr\xE1ulico ");
    i09.\u0275\u0275element(307, "br");
    i09.\u0275\u0275text(308, " Infraestrutura de abastecimento de \xE1gua");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(309, "div", 19);
    i09.\u0275\u0275text(310, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a INFRAESTRUTURA DE ABASTECIMENTO DE \xC1GUA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(311, "div", 20)(312, "h4");
    i09.\u0275\u0275text(313, "01 - MACROMEDIDOR ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(314, "h4");
    i09.\u0275\u0275text(315, "02 - CASTELO MET\xC1LICO / CASTELO CONCRETO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(316, "h4");
    i09.\u0275\u0275text(317, "03 - BOMBAS - CASA DE BOMBAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(318, "h4");
    i09.\u0275\u0275text(319, "04 - QUADRO DE COMANDO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(320, "h4");
    i09.\u0275\u0275text(321, "05 - TUBOS E CONEX\xD5ES ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(322, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(323, "div", 9)(324, "div", 10);
    i09.\u0275\u0275element(325, "div", 13);
    i09.\u0275\u0275elementStart(326, "div", 11)(327, "div", 12);
    i09.\u0275\u0275text(328, "12");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(329, "div", 14)(330, "div", 15)(331, "div", 16)(332, "div", 17);
    i09.\u0275\u0275text(333, "STATION 12");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(334, "div", 18);
    i09.\u0275\u0275text(335, "Sistema hidr\xE1ulico ");
    i09.\u0275\u0275element(336, "br");
    i09.\u0275\u0275text(337, " Abastecimento de \xE1gua predial");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(338, "div", 19);
    i09.\u0275\u0275text(339, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a INFRAESTRUTURA DE G\xC1S ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(340, "div", 20)(341, "h4");
    i09.\u0275\u0275text(342, "01 - MICROMEDIDOR");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(343, "h4");
    i09.\u0275\u0275text(344, "02 - HIDR\xD4METRO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(345, "h4");
    i09.\u0275\u0275text(346, "03 - TUBOS E CONEX\xD5ES");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(347, "h4");
    i09.\u0275\u0275text(348, "04 - PEX / CHASSI / CARENAGENS / COIFAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(349, "h4");
    i09.\u0275\u0275text(350, "05 - ENGATE FLEX\xCDVEL ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(351, "h4");
    i09.\u0275\u0275text(352, "06 - METATIS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(353, "h4");
    i09.\u0275\u0275text(354, "07 - LOU\xC7AS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(355, "h4");
    i09.\u0275\u0275text(356, "08 - M\xC3O FRANCESA ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(357, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(358, "div", 9)(359, "div", 10)(360, "div", 11)(361, "div", 12);
    i09.\u0275\u0275text(362, "13");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(363, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(364, "div", 14)(365, "div", 15)(366, "div", 16)(367, "div", 17);
    i09.\u0275\u0275text(368, "STATION 13");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(369, "div", 18);
    i09.\u0275\u0275text(370, "Sistema de g\xE1s ");
    i09.\u0275\u0275element(371, "br");
    i09.\u0275\u0275text(372, " Infraestrutura de g\xE1s");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(373, "div", 19);
    i09.\u0275\u0275text(374, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a INFRAESTRUTURA DE G\xC1S ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(375, "div", 20)(376, "h4");
    i09.\u0275\u0275text(377, "01 - REGULADOR DE PRIMEIRO EST\xC1GIO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(378, "h4");
    i09.\u0275\u0275text(379, "02 - TUBOS E CONEX\xD5ES MULTICAMADAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(380, "h4");
    i09.\u0275\u0275text(381, "03 - REGULADOR DE SEGUNDO EST\xC9GIO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(382, "h4");
    i09.\u0275\u0275text(383, "04 - TUBOS E CONEX\xD5ES PARA GN ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(384, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(385, "div", 9)(386, "div", 10)(387, "div", 11)(388, "div", 12);
    i09.\u0275\u0275text(389, "14");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(390, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(391, "div", 14)(392, "div", 15)(393, "div", 16)(394, "div", 17);
    i09.\u0275\u0275text(395, "STATION 14");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(396, "div", 18);
    i09.\u0275\u0275text(397, "Sistema de g\xE1s ");
    i09.\u0275\u0275element(398, "br");
    i09.\u0275\u0275text(399, " G\xE1s predial");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(400, "div", 19);
    i09.\u0275\u0275text(401, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao G\xC1S PREDIAL ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(402, "div", 20)(403, "h4");
    i09.\u0275\u0275text(404, "01 - FIXA\xC7\xD5ES PARA SISTEMAS DE G\xC1S MULTICAMADAS");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(405, "h4");
    i09.\u0275\u0275text(406, "02 - TUBOS E CONEX\xD5ES MULTICAMADAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(407, "h4");
    i09.\u0275\u0275text(408, "03 - V\xC1LVULAS E PLUGS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(409, "h4");
    i09.\u0275\u0275text(410, "04 - PLACAS E IDENTIFICA\xC7\xD5ES ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(411, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(412, "div", 9)(413, "div", 10);
    i09.\u0275\u0275element(414, "div", 13);
    i09.\u0275\u0275elementStart(415, "div", 11)(416, "div", 12);
    i09.\u0275\u0275text(417, "15");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(418, "div", 14)(419, "div", 15)(420, "div", 16)(421, "div", 17);
    i09.\u0275\u0275text(422, "STATION 15");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(423, "div", 18);
    i09.\u0275\u0275text(424, "Sistema de ar condicionado ");
    i09.\u0275\u0275element(425, "br");
    i09.\u0275\u0275text(426, " Ar condicionado predial");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(427, "div", 19);
    i09.\u0275\u0275text(428, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao AR CONDICIONADO PREDIAL ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(429, "div", 20)(430, "h4");
    i09.\u0275\u0275text(431, "01 - FIXA\xC7\xD5ES PARA SISTEMAS DE AR CONDICINADO");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(432, "h4");
    i09.\u0275\u0275text(433, "02 - TUBOS E CONEX\xD5ES MULTICAMADAS PARA AR CONDICIONADO");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(434, "h4");
    i09.\u0275\u0275text(435, "03 - PROTE\xC7\xD5ES E ENVELOPAMENTO DA CAMARA FRIGORIGINA ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(436, "h4");
    i09.\u0275\u0275text(437, "04 - KIT AR CONDICIONADO + SERVI\xC7O DE INSTALA\xC7\xC3O ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(438, "h4");
    i09.\u0275\u0275text(439, "05 - DRENO AR CONDICIONADO");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(440, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(441, "div", 9)(442, "div", 10)(443, "div", 11)(444, "div", 12);
    i09.\u0275\u0275text(445, "16");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(446, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(447, "div", 14)(448, "div", 15)(449, "div", 16)(450, "div", 17);
    i09.\u0275\u0275text(451, "STATION 16");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(452, "div", 18);
    i09.\u0275\u0275text(453, "Sistema de combate a inc\xEAndio ");
    i09.\u0275\u0275element(454, "br");
    i09.\u0275\u0275text(455, " Infraestrutura do sistema de combate a inc\xEAndio");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(456, "div", 19);
    i09.\u0275\u0275text(457, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente a INFRAESTRUTURA DO SISTEMA DE COMBATE A INC\xCANDIO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(458, "div", 20)(459, "h4");
    i09.\u0275\u0275text(460, "01 - QUADRO DE COMANDO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(461, "h4");
    i09.\u0275\u0275text(462, "02 - BOMBAS - CASA DE BOMBAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(463, "h4");
    i09.\u0275\u0275text(464, "03 - TUBOS E CONEX\xD5ES PVC ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(465, "h4");
    i09.\u0275\u0275text(466, "04 - TUBOS GALVANIZADOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(467, "h4");
    i09.\u0275\u0275text(468, "05 - CONEX\xD5ES GALVANIZADAS ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(469, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(470, "div", 9)(471, "div", 10);
    i09.\u0275\u0275element(472, "div", 13);
    i09.\u0275\u0275elementStart(473, "div", 11)(474, "div", 12);
    i09.\u0275\u0275text(475, "17");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(476, "div", 14)(477, "div", 15)(478, "div", 16)(479, "div", 17);
    i09.\u0275\u0275text(480, "STATION 17");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(481, "div", 18);
    i09.\u0275\u0275text(482, "Sistema de combate a inc\xEAndio ");
    i09.\u0275\u0275element(483, "br");
    i09.\u0275\u0275text(484, " Sistema de combate a inc\xEAndio predial");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(485, "div", 19);
    i09.\u0275\u0275text(486, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao SISTEMA DE COMBATE A INC\xCANDIO PREDIAL ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(487, "div", 20)(488, "h4");
    i09.\u0275\u0275text(489, "01 - TUBOS GALVANIZADOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(490, "h4");
    i09.\u0275\u0275text(491, "02 - CONEX\xD5ES GALVANIZADAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(492, "h4");
    i09.\u0275\u0275text(493, "03 - CAIXA DE HIDR\xC2NTE");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(494, "h4");
    i09.\u0275\u0275text(495, "04 - MANGUEIRAS / CHAVE STORZ / AGULHETA / V\xC1LVULAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(496, "h4");
    i09.\u0275\u0275text(497, "05 - PLACAS DE SCI ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(498, "h4");
    i09.\u0275\u0275text(499, "06 - LUMIN\xC1RIAS DE EMERG\xCANCIA ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(500, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(501, "div", 9)(502, "div", 10)(503, "div", 11)(504, "div", 12);
    i09.\u0275\u0275text(505, "18");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(506, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(507, "div", 14)(508, "div", 15)(509, "div", 16)(510, "div", 17);
    i09.\u0275\u0275text(511, "STATION 18");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(512, "div", 18);
    i09.\u0275\u0275text(513, "Sistema fotovolt\xE1ico ");
    i09.\u0275\u0275element(514, "br");
    i09.\u0275\u0275text(515, " Sistema fotovolt\xE1ico");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(516, "div", 19);
    i09.\u0275\u0275text(517, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao SISTEMA FOTOVOLT\xC1ICO ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(518, "div", 20)(519, "h4");
    i09.\u0275\u0275text(520, "01 - PLACAS FOTOVOLT\xC1ICOS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(521, "h4");
    i09.\u0275\u0275text(522, "02 - INVERSOR DE FREQU\xCANCIA");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(523, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(524, "div", 9)(525, "div", 10);
    i09.\u0275\u0275element(526, "div", 13);
    i09.\u0275\u0275elementStart(527, "div", 11)(528, "div", 12);
    i09.\u0275\u0275text(529, "19");
    i09.\u0275\u0275elementEnd()()();
    i09.\u0275\u0275elementStart(530, "div", 14)(531, "div", 15)(532, "div", 16)(533, "div", 17);
    i09.\u0275\u0275text(534, "STATION 19");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(535, "div", 18);
    i09.\u0275\u0275text(536, "Sistema de el\xE9tro mobilidade ");
    i09.\u0275\u0275element(537, "br");
    i09.\u0275\u0275text(538, " Sistema de carregadores para carro el\xE9trico");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(539, "div", 19);
    i09.\u0275\u0275text(540, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao SISTEMA DE EL\xC9TRO MOBILIDADE ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(541, "div", 20)(542, "h4");
    i09.\u0275\u0275text(543, "01 - CARREGADORES PARA CARROS EL\xC9TRICOS");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(544, "div", 21);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(545, "div", 9)(546, "div", 10)(547, "div", 11)(548, "div", 12);
    i09.\u0275\u0275text(549, "20");
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275element(550, "div", 13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(551, "div", 14)(552, "div", 15)(553, "div", 16)(554, "div", 17);
    i09.\u0275\u0275text(555, "STATION 20");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(556, "div", 18);
    i09.\u0275\u0275text(557, "Sistema de exaust\xE3o ");
    i09.\u0275\u0275element(558, "br");
    i09.\u0275\u0275text(559, " Sistema de exaust\xE3o");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(560, "div", 19);
    i09.\u0275\u0275text(561, " Nesta esta\xE7\xE3o voc\xEA negociar\xE1 todos os materiais referente ao SISTEMA DE EXAUST\xC3O ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(562, "div", 20)(563, "h4");
    i09.\u0275\u0275text(564, "01 - PRESSURIZA\xC7\xC3O DE ESCADAS ");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(565, "h4");
    i09.\u0275\u0275text(566, "02 - VENTO KIT ");
    i09.\u0275\u0275elementEnd()()()();
    i09.\u0275\u0275element(567, "div", 21);
    i09.\u0275\u0275elementEnd()()()()()()()();
  }
}, dependencies: [MatListModule2], styles: ['\n\n.section-supply[_ngcontent-%COMP%] {\n  padding: 2rem 1rem 1rem 1rem;\n  background-color: #1e242b;\n  background-image:\n    radial-gradient(\n      at 47% 33%,\n      hsl(212.31, 18%, 14%) 0,\n      transparent 59%),\n    radial-gradient(\n      at 82% 65%,\n      hsl(206.67, 20%, 18%) 0,\n      transparent 55%);\n}\n.section-supply[_ngcontent-%COMP%]   .titulo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  text-align: center;\n  width: 100%;\n  font-size: 3rem;\n  font-weight: 700;\n  color: #edf0f6;\n  font-family:\n    "introBlack",\n    Verdana,\n    Geneva,\n    Tahoma,\n    sans-serif;\n}\n.section-supply[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-format-container[_ngcontent-%COMP%] {\n  width: 1160px;\n  margin: 0 auto;\n  position: relative;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-block[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_title-box[_ngcontent-%COMP%] {\n  padding: 0 0 30px;\n  text-align: center;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_tagline[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: rgb(84, 89, 95);\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_title[_ngcontent-%COMP%] {\n  background-image: url(https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/bg.jpg);\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  background-size: cover;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-size: 80px;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%] {\n  margin: 0 0 50px;\n  position: relative;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n) {\n  text-align: right;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n  position: relative;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_line[_ngcontent-%COMP%] {\n  width: 2px;\n  background-color: #393935;\n  position: absolute;\n  top: 2px;\n  left: 50%;\n  bottom: 0;\n  overflow: hidden;\n  -webkit-transform: translateX(-50%);\n  -moz-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  -o-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_line-progress[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 20%;\n  background-color: #ff731d;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_box[_ngcontent-%COMP%] {\n  padding: 0 0 20px 50%;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_box[_ngcontent-%COMP%] {\n  padding: 0 50% 20px 0;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_point-box[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 14px 0 -28px;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_point-box[_ngcontent-%COMP%] {\n  margin: 0 -28px 0 14px;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_point[_ngcontent-%COMP%] {\n  height: 50px;\n  line-height: 50px;\n  width: 50px;\n  border: 3px solid #ffffff;\n  background-color: #ffffff;\n  text-align: center;\n  font-family: "ESL Legend", sans-serif;\n  font-size: 20px;\n  color: #1e242b;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n}\n.section-supply[_ngcontent-%COMP%]   .js-ag-active[_ngcontent-%COMP%]   .ag-timeline-card_point[_ngcontent-%COMP%] {\n  color: #ffffff;\n  background-color: #ff731d;\n  border: 3px solid #ff731d;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_meta-box[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_meta[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  font-family: "ESL Legend", sans-serif;\n  font-weight: bold;\n  font-size: 28px;\n  color: #ff731d;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_item[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 45%;\n  margin: -77px 0 0;\n  background-color: #282828;\n  opacity: 0;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);\n  -o-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);\n  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);\n  -webkit-transition: -webkit-transform 0.5s, opacity 0.5s;\n  -moz-transition: -moz-transform 0.5s, opacity 0.5s;\n  -o-transition: -o-transform 0.5s, opacity 0.5s;\n  transition: transform 0.5s, opacity 0.5s;\n  position: relative;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n+1)   .ag-timeline-card_item[_ngcontent-%COMP%] {\n  -webkit-transform: translateX(-200%);\n  -moz-transform: translateX(-200%);\n  -ms-transform: translateX(-200%);\n  -o-transform: translateX(-200%);\n  transform: translateX(-200%);\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_item[_ngcontent-%COMP%] {\n  -webkit-transform: translateX(200%);\n  -moz-transform: translateX(200%);\n  -ms-transform: translateX(200%);\n  -o-transform: translateX(200%);\n  transform: translateX(200%);\n}\n.section-supply[_ngcontent-%COMP%]   .js-ag-active.ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n+1)   .ag-timeline-card_item[_ngcontent-%COMP%], .section-supply[_ngcontent-%COMP%]   .js-ag-active.ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_item[_ngcontent-%COMP%] {\n  opacity: 1;\n  -webkit-transform: translateX(0);\n  -moz-transform: translateX(0);\n  -ms-transform: translateX(0);\n  -o-transform: translateX(0);\n  transform: translateX(0);\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_arrow[_ngcontent-%COMP%] {\n  height: 18px;\n  width: 18px;\n  margin-top: 20px;\n  background-color: #282828;\n  z-index: -1;\n  position: absolute;\n  top: 0;\n  right: 0;\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  -o-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n+1)   .ag-timeline-card_arrow[_ngcontent-%COMP%] {\n  margin-left: -9px;\n  margin-right: -9px;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_arrow[_ngcontent-%COMP%] {\n  margin-left: -10px;\n  right: auto;\n  left: 0;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_img[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_info[_ngcontent-%COMP%] {\n  padding: 20px 30px;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  font-family: ESL Legend, sans-serif;\n  font-weight: 700;\n  font-size: 4rem;\n  color: #fff;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_subtitle[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 10px 0 0;\n  font-family: ESL Legend, sans-serif;\n  font-weight: 700;\n  font-size: 2rem;\n  color: #da692d;\n  text-align: left;\n}\n.section-supply[_ngcontent-%COMP%]   .ag-timeline-card_desc[_ngcontent-%COMP%] {\n  line-height: 1.45;\n  font-size: 1.3rem;\n  color: #edf0f6;\n  text-align: left;\n  padding: 1em 1em 0 1em;\n}\n.section-supply[_ngcontent-%COMP%]   .details-station[_ngcontent-%COMP%] {\n  padding: 1em;\n  line-height: 1.45;\n  color: #edf0f6;\n  text-align: left;\n}\n@media only screen and (max-width: 979px) {\n  .ag-timeline_line[_ngcontent-%COMP%] {\n    left: 30px;\n  }\n  .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n) {\n    text-align: left;\n  }\n  .ag-timeline-card_box[_ngcontent-%COMP%], .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_box[_ngcontent-%COMP%] {\n    padding: 0 0 20px;\n  }\n  .ag-timeline-card_meta-box[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .ag-timeline-card_point-box[_ngcontent-%COMP%], .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_point-box[_ngcontent-%COMP%] {\n    margin: 0 0 0 8px;\n  }\n  .ag-timeline-card_point[_ngcontent-%COMP%] {\n    height: 40px;\n    line-height: 40px;\n    width: 40px;\n  }\n  .ag-timeline-card_item[_ngcontent-%COMP%] {\n    width: auto;\n    margin: -65px 0 0 75px;\n  }\n  .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n+1)   .ag-timeline-card_item[_ngcontent-%COMP%], .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n)   .ag-timeline-card_item[_ngcontent-%COMP%] {\n    -webkit-transform: translateX(200%);\n    -moz-transform: translateX(200%);\n    -ms-transform: translateX(200%);\n    -o-transform: translateX(200%);\n    transform: translateX(200%);\n  }\n  .ag-timeline_item[_ngcontent-%COMP%]:nth-child(2n+1)   .ag-timeline-card_arrow[_ngcontent-%COMP%] {\n    right: auto;\n    left: 0;\n  }\n  .ag-timeline-card_title[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .ag-timeline-card_arrow[_ngcontent-%COMP%] {\n    margin-top: 12px;\n  }\n}\n@media only screen and (max-width: 767px) {\n  .ag-format-container[_ngcontent-%COMP%] {\n    width: 96%;\n  }\n  .ag-timeline-card_img[_ngcontent-%COMP%] {\n    height: auto;\n    width: auto;\n  }\n}\n@media only screen and (max-width: 639px) {\n  .ag-timeline_title[_ngcontent-%COMP%] {\n    font-size: 60px;\n  }\n  .ag-timeline-card_info[_ngcontent-%COMP%] {\n    padding: 10px 15px;\n  }\n  .ag-timeline-card_desc[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n@media (min-width: 768px) and (max-width: 979px) {\n  .ag-format-container[_ngcontent-%COMP%] {\n    width: 750px;\n  }\n}\n@media (min-width: 980px) and (max-width: 1161px) {\n  .ag-format-container[_ngcontent-%COMP%] {\n    width: 960px;\n  }\n}\n/*# sourceMappingURL=hgi-supply.component.css.map */'] });
var HgiSupplyComponent = _HgiSupplyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i09.\u0275setClassDebugInfo(HgiSupplyComponent, { className: "HgiSupplyComponent" });
})();

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "hgi-supply",
    component: HgiSupplyComponent
  }
  // {
  //   path: 'eletrica-predial',
  //   component: EletricaPredialComponent,
  // },
  // {
  //   path: 'hidraulica-predial',
  //   component: HidraulicaPredialComponent,
  // },
  // {
  //   path: 'infraestrutura-eletrica',
  //   component: InfraEstruturaEletricaComponent,
  // },
  // {
  //   path: 'infraestrutura-hidraulica',
  //   component: InfraEstruturaHidraulicaComponent,
  // },
  // {
  //   path: 'sistema-gas',
  //   component: SistemaGasComponent,
  // },
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ]
};

// src/app/app.component.ts
import { Component as Component10 } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
import { RouterOutlet } from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_router.js?v=757d2c37";
import * as i010 from "/@fs/Users/apl/Desenvolvimento/Projetos/freelancer/grupo-hgi/.angular/cache/17.3.8/vite/deps/@angular_core.js?v=757d2c37";
var _AppComponent = class _AppComponent {
  constructor() {
    this.title = "grupo-hgi";
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(t) {
  return new (t || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ i010.\u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [i010.\u0275\u0275StandaloneFeature], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275element(0, "router-outlet");
  }
}, dependencies: [RouterOutlet] });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i010.\u0275setClassDebugInfo(AppComponent, { className: "AppComponent" });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tYWluLnRzIiwic3JjL2FwcC9hcHAuY29uZmlnLnRzIiwic3JjL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudC50cyIsInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LnRzIiwic3JjL2FwcC9jb21wb25lbnRzL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvY29tcG9uZW50cy9hYm91dC9hYm91dC5jb21wb25lbnQudHMiLCJzcmMvYXBwL2NvbXBvbmVudHMvYWJvdXQvYWJvdXQuY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL2NvbXBvbmVudHMvY29udGFjdC9jb250YWN0LmNvbXBvbmVudC50cyIsInNyYy9hcHAvY29tcG9uZW50cy9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQudHMiLCJzcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC50cyIsInNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9jb21wb25lbnRzL21lbnUvbWVudS5jb21wb25lbnQudHMiLCJzcmMvYXBwL2NvbXBvbmVudHMvbWVudS9tZW51LmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9jb21wb25lbnRzL2J1c2luZXNzLXVuaXRzL2J1c2luZXNzLXVuaXRzLmNvbXBvbmVudC50cyIsInNyYy9hcHAvY29tcG9uZW50cy9idXNpbmVzcy11bml0cy9idXNpbmVzcy11bml0cy5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvY29tcG9uZW50cy9idG4tZGV0YWxoZXMvYnRuLWRldGFsaGVzLmNvbXBvbmVudC50cyIsInNyYy9hcHAvY29tcG9uZW50cy9idG4tZGV0YWxoZXMvYnRuLWRldGFsaGVzLmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9jb21wb25lbnRzL2J1c2luZXNzLXVuaXRzL2hnaS1zdXBwbHkvaGdpLXN1cHBseS5jb21wb25lbnQudHMiLCJzcmMvYXBwL2NvbXBvbmVudHMvYnVzaW5lc3MtdW5pdHMvaGdpLXN1cHBseS9oZ2ktc3VwcGx5LmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9hcHAucm91dGVzLnRzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnRzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwQXBwbGljYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGFwcENvbmZpZyB9IGZyb20gJy4vYXBwL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAvYXBwLmNvbXBvbmVudCc7XG5cbmJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwgYXBwQ29uZmlnKVxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiIsImltcG9ydCB7IEFwcGxpY2F0aW9uQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbml0aWFsaXplQXBwLCBwcm92aWRlRmlyZWJhc2VBcHAgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcCc7XG5pbXBvcnQgeyBwcm92aWRlQW5pbWF0aW9uc0FzeW5jIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jJztcbmltcG9ydCB7IHByb3ZpZGVSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5cbmltcG9ydCB7IHByb3ZpZGVIdHRwQ2xpZW50LCB3aXRoRmV0Y2ggfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBwcm92aWRlQ2xpZW50SHlkcmF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBwcm92aWRlQW5pbWF0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL2FwcC5yb3V0ZXMnO1xuXG5leHBvcnQgY29uc3QgYXBwQ29uZmlnOiBBcHBsaWNhdGlvbkNvbmZpZyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZVJvdXRlcihyb3V0ZXMpLFxuICAgIHByb3ZpZGVDbGllbnRIeWRyYXRpb24oKSxcbiAgICBwcm92aWRlSHR0cENsaWVudCh3aXRoRmV0Y2goKSksXG4gICAgcHJvdmlkZUFuaW1hdGlvbnNBc3luYygpLFxuICAgIHByb3ZpZGVBbmltYXRpb25zKCksXG4gICAgcHJvdmlkZUZpcmViYXNlQXBwKCgpID0+IGluaXRpYWxpemVBcHAoZW52aXJvbm1lbnQuZmlyZWJhc2VDb25maWcpKSxcbiAgXSxcbn07XG4iLCJleHBvcnQgY29uc3QgZW52aXJvbm1lbnQgPSB7XG4gIGZpcmViYXNlQ29uZmlnOiB7XG4gICAgYXBpS2V5OiAnQUl6YVN5Q000MjVHeDF3azhSZ3lyUnNCdERVTU92TEpHTmI2YmxNJyxcbiAgICBhdXRoRG9tYWluOiAnZ3J1cG8taGdpLmZpcmViYXNlYXBwLmNvbScsXG4gICAgcHJvamVjdElkOiAnZ3J1cG8taGdpJyxcbiAgICBzdG9yYWdlQnVja2V0OiAnZ3J1cG8taGdpLmFwcHNwb3QuY29tJyxcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogJzQ1ODAxMjcxNDM0MScsXG4gICAgYXBwSWQ6ICcxOjQ1ODAxMjcxNDM0MTp3ZWI6YzIwNWFlZTE2Mjg4ZjhiZDEzZWQ4YycsXG4gICAgbWVhc3VyZW1lbnRJZDogJ0ctSDQwMkxINFRMVycsXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgTmdPcHRpbWl6ZWRJbWFnZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFib3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vYWJvdXQvYWJvdXQuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRhY3RDb21wb25lbnQgfSBmcm9tICcuLi9jb250YWN0L2NvbnRhY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4uL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4uL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuLi9tZW51L21lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1c2luZXNzVW5pdHNDb21wb25lbnQgfSBmcm9tICcuLi9idXNpbmVzcy11bml0cy9idXNpbmVzcy11bml0cy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtaG9tZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBOZ09wdGltaXplZEltYWdlLFxuICAgIE1lbnVDb21wb25lbnQsXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIEFib3V0Q29tcG9uZW50LFxuICAgIEJ1c2luZXNzVW5pdHNDb21wb25lbnQsXG4gICAgQ29udGFjdENvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2hvbWUuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IHt9XG4iLCI8YXBwLW1lbnU+PC9hcHAtbWVudT5cbjxhcHAtaGVhZGVyPjwvYXBwLWhlYWRlcj5cbjxhcHAtYWJvdXQ+PC9hcHAtYWJvdXQ+XG48YXBwLWJ1c2luZXNzLXVuaXRzPjwvYXBwLWJ1c2luZXNzLXVuaXRzPlxuPGFwcC1jb250YWN0PjwvYXBwLWNvbnRhY3Q+XG48YXBwLWZvb3Rlcj48L2FwcC1mb290ZXI+XG4iLCJpbXBvcnQgeyBOZ09wdGltaXplZEltYWdlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1hYm91dCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOZ09wdGltaXplZEltYWdlXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2Fib3V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWJvdXQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQWJvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIiwiPHNlY3Rpb24gY2xhc3M9XCJtYWluLXNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cInRpdHVsb1wiPlFVRU0gU09NT1M8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInN1YnRpdHVsb1wiPkVzcGVjaWFsaXN0YXMgZW0gc2lzdGVtYXMgcHJlZGlhaXM8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInN1YnRpdHVsb1wiPlxuICAgIFVtYSB2aWRhIGRlZGljYWRhIGEgZW5nZW5oYXJpYSBkZSBzaXN0ZW1hcyBwcmVkaWFpc1xuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiYm9keS1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWNhcmRcIj5cbiAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaW1ncy9odWItYnVzaW5lc3MucG5nXCIgYWx0PVwiXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJib2R5LWNhcmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eHRcIj5cbiAgICAgICAgICBTb21vcyBvXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXN0YXF1ZVwiPmh1YiBkZSBuZWfDs2Npb3MgY29ycG9yYXRpdm9zPC9zcGFuPiAxMDAlXG4gICAgICAgICAgZm9jYWRvcyBub3Mgc2lzdGVtYXMgcHJlZGlhaXMsIGNvbmVjdGFtb3MgYXMgY29uc3RydXRvcmFzIGVcbiAgICAgICAgICBpbmNvcnBvcmFkb3JhcyBhcyBpbmR1c3RyaWFzIGNyaWFuZG8gdW0gZWNvc3Npc3RlbWEgbW9kZXJubyxcbiAgICAgICAgICBzb2Zpc3RpY2Fkbywgw6FnaWwgZSBkaXNydXB0aXZvLlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctY2FyZFwiPlxuICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9waG90by9oZWl0b3IyLnBuZ1wiIGFsdD1cIlwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0b3JcIj5IZWl0b3IgVmFzY29uY2Vsb3MgR291dmVpYTwvZGl2PlxuICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJzb2NpYWlzXCI+XG4gICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ljb25zL2xpbmtlZGluLWNpcmNsZS5wbmdcIiBhbHQ9XCJsaW5rZWRpblwiIC8+XG4gICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ljb25zL2luc3RhZ3JhbS1jaXJjbGUucG5nXCIgYWx0PVwiaW5zdGFncmFtXCIgLz5cbiAgICAgICAgICA8aW1nIHNyYz1cIi9hc3NldHMvaWNvbnMvZmFjZWJvb2stY2lyY2xlLnBuZ1wiIGFsdD1cImZhY2Vib29rXCIgLz5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYm9keS1jYXJkXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidHh0XCI+U29saWRpZmljb3Ugc3VhIGNhcnJlaXJhIGNvbW9cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc3RhcXVlXCI+Z2VzdG9yIG5hY2lvbmFsPC9zcGFuPiBkYSBNUlYgcG9yIDEwIGFub3MsXG4gICAgICAgICAgaW1wbGVtZW50YW5kbyBpbm92YcOnw7VlcyBlIGluZHVzdHJpYWxpemFuZG8gc2lzdGVtYXMgcHJlZGlhaXMuXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eHRcIj5cbiAgICAgICAgICBFbSBzZWd1aWRhLCBnYW5ob3UgZGVzdGFxdWUgY29tbyBkaXJldG9yIGUgcGFyY2Vpcm8gZG8gR3J1cG8gQW1iYXIsXG4gICAgICAgICAgZm9jYW5kbyBlbSBpbmR1c3RyaWFsaXphw6fDo28uXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eHRcIj5cbiAgICAgICAgICBFbSAyMDIzLCBmdW5kb3UgbyBHcnVwbyBDb25zdHJ1QVBQLCB1bWEgZW1wcmVzYSBpbm92YWRvcmEgcXVlIGVzdMOhXG4gICAgICAgICAgdHJhbnNmb3JtYW5kbyBvXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXN0YXF1ZVwiPm1lcmNhZG8gZGUgc2lzdGVtYXMgcHJlZGlhaXM8L3NwYW4+IGRlIGZvcm1hXG4gICAgICAgICAgc8OzbGlkYSBlIHRlY25vbMOzZ2ljYSBlbSB0b2RvIG8gcGHDrXMuXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltZy1jYXJkXCI+XG4gICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ltZ3MvZG5hLnBuZ1wiIGFsdD1cIlwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYm9keS1jYXJkXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidHh0XCI+XG4gICAgICAgICAgQ29tIDxzcGFuIGNsYXNzPVwiZGVzdGFxdWVcIj5ETkEgZGUgaW5vdmHDp8Ojbzwvc3Bhbj4gbGFuw6dhIHNldSBub3ZvXG4gICAgICAgICAgZW1wcmVlbmRpbWVudG8gY29tIGZvY28gMTAwJSBub1xuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzdGFxdWVcIj5TVVBSSU1FTlRPUzwvc3Bhbj4gZG9zXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXN0YXF1ZVwiPlNJU1RFTUFTIFBSRURJQUlTPC9zcGFuPiwgYXNzdW1pbmRvIHVtYSBwb3Npw6fDo29cbiAgICAgICAgICBkZSB1bSA8c3BhbiBjbGFzcz1cImRlc3RhcXVlXCI+aHViIGRlIG5lZ8OzY2lvcyBjb3Jwb3JhdGl2b3M8L3NwYW4+LFxuICAgICAgICAgIGFsaWFuZG8gdMOpY25pY2EsIG5ldCB3b3JrLCBjcmlhbmRvIGNvbmVjdGl2aWRhZGUgZ2VyYW5kbyB1bWEgam9ybmFkYVxuICAgICAgICAgIHByZWNpc2EsIGVmaWNpZW50ZSBlIHJldm9sdWNpb27DoXJpYS5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG5cbjxzZWN0aW9uIGNsYXNzPVwiYmFubmVyLWFib3V0XCI+XG4gIDxkaXYgY2xhc3M9XCJyb3ctYmFubmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1iYW5uZXIxXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1iYW5uZXIyXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInRpdGxlLWNvbC1iYW5uZXItMlwiPk5PU1NPIDxicj48c3BhbiBjbGFzcz1cInR4dC1vYmpldG9cIj5PQkpFVElWTzwvc3Bhbj48L3NwYW4+XG4gICAgICBBdXhpbGlhciBjb25zdHJ1dG9yYXMgZSBpbmNvcnBvcmFkb3JhcyBuYSBpbXBsYW50YcOnw6NvIGludGVncmFkYSBkb3NcbiAgICAgIHByb2Nlc3NvcyBkZSBHZXN0w6NvIGRlIG1vZGVybml6YXIgYSBvcGVyYcOnw6NvIGRvcyBzaXN0ZW1hcyBwcmVkaWFpc1xuICAgICAgcHJvY2VkaW1lbnRvcyBkZSBhcHJvdmHDp8O1ZXMgZGUgcHJvamV0b3MganVudG8gYXMgY29uY2Vzc2lvbsOhcmlhcyxcbiAgICAgIHBhcsOibWV0cm9zIGRlIGltcGxhbnRhw6fDo28gZGEgY29uc3RydXRpdmEsIGNvbmZlY8Onw6NvIGRlIFByb2NlZGltZW50b3MgZGVcbiAgICAgIEV4ZWN1w6fDo28gZGUgU2VydmnDp29zIChQRVMpLCBhcGxpY2HDp8OjbyBkb3MgdGVzdGVzLlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cblxuPHNlY3Rpb24gY2xhc3M9XCJjYWxsLXRvLWFjdGlvbi1hYm91dCBiZy0xLWFib3V0IG92ZXJseVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2Utb25lIG92ZXJseVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjdXN0b3NcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYmFubmVyXCI+R2VzdMOjbyBkZSBJbnN0YWxhw6fDtWVzPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJiYW5uZXItZGVzdGFxdWVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXN0YXF1ZVwiPisgMTAwIGNpZGFkZXM8L3NwYW4+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJiYW5uZXJcIj5QYXJ0aWNpcGHDp8OjbyBlZmV0aXZhIGRhIGNvbnN0cnXDp8O1ZXMgaGFiaXRhY2lvbmFpczwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYmFubmVyLWRlc3RhcXVlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzdGFxdWVcIj4rIDUwMC4wMDAgdW5pZGFkZXM8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9zZWN0aW9uPlxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsRGVzdHJveWVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1zTW9kdWxlLFxuICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jb250YWN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250YWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGFjdC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBDb250YWN0Q29tcG9uZW50IHtcblxuICBlbWFpbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWxdKTtcbiAgbm9tZSA9IG5ldyBGb3JtQ29udHJvbCgnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcbiAgbWVuc2FnZW0gPSBuZXcgRm9ybUNvbnRyb2woJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSk7XG4gIGVycm9yTWVzc2FnZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIG1lcmdlKFxuICAgICAgdGhpcy5lbWFpbC5zdGF0dXNDaGFuZ2VzLFxuICAgICAgdGhpcy5lbWFpbC52YWx1ZUNoYW5nZXMsXG4gICAgICB0aGlzLm5vbWUuc3RhdHVzQ2hhbmdlcyxcbiAgICAgIHRoaXMubm9tZS52YWx1ZUNoYW5nZXMsXG4gICAgICB0aGlzLm1lbnNhZ2VtLnN0YXR1c0NoYW5nZXMsXG4gICAgICB0aGlzLm1lbnNhZ2VtLnZhbHVlQ2hhbmdlc1xuICAgIClcbiAgICAgIC5waXBlKHRha2VVbnRpbERlc3Ryb3llZCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZUVycm9yTWVzc2FnZSgpKTtcbiAgfVxuXG4gIHVwZGF0ZUVycm9yTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5ub21lLmhhc0Vycm9yKCdyZXF1aXJlZCcpKSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdDYW1wbyBvYnJpZ2F0w7NyaW8uJztcbiAgICB9XG4gICAgaWYgKHRoaXMubWVuc2FnZW0uaGFzRXJyb3IoJ3JlcXVpcmVkJykpIHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ0NhbXBvIG9icmlnYXTDs3Jpby4nO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbWFpbC5oYXNFcnJvcigncmVxdWlyZWQnKSkge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnQ2FtcG8gb2JyaWdhdMOzcmlvLic7XG4gICAgfSBlbHNlIGlmICh0aGlzLmVtYWlsLmhhc0Vycm9yKCdlbWFpbCcpKSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdFc3RlIGUtbWFpbCBuw6NvIMOpIHbDoWxpZG8uJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB9XG4gIH1cbn1cbiIsIjxzZWN0aW9uIGNsYXNzPVwibWFpbi1zZWN0aW9uLWNvbnRhY3RcIj5cbiAgPGRpdiBjbGFzcz1cInRpdHVsb1wiPmNvbnRhdG88L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhdG9cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1jb250YXRvXCI+XG4gICAgICA8aDM+RW50cmUgZW0gY29udGF0byBjb25vc2NvPC9oMz5cblxuICAgICAgPHA+VGVsZWZvbmU6XG4gICAgICAgICs1NSAoMzQpIDk5OTA3IDg4MDg8L3A+XG4gICAgICA8cD4gRW1haWw6XG4gICAgICAgIGdydXBvaGdpJiM2NDtncnVwb2hnaS5jb20uYnI8L3A+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIDxhIGNsYXNzPVwic29jaWFsLWxpbmsxXCI+XG4gICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ljb25zL2luc3RhZ3JhbS5zdmdcIiBhbHQ9XCJcIj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8YSBjbGFzcz1cInNvY2lhbC1saW5rMlwiPlxuICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pY29ucy9saW5rZWRpbi5zdmdcIiBhbHQ9XCJcIj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8YSBjbGFzcz1cInNvY2lhbC1saW5rM1wiPlxuICAgICAgICAgIDxpbWcgc3JjPVwiL2Fzc2V0cy9pY29ucy95b3V0dWJlLnN2Z1wiIGFsdD1cIlwiPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxhIGNsYXNzPVwic29jaWFsLWxpbms0XCI+XG4gICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL2ljb25zL3doYXRzYXBwLnN2Z1wiIGFsdD1cIlwiPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250YXRvXCI+XG4gICAgICA8Zm9ybSBhY3Rpb249XCJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDwhLS0gZmlsbCAtLT5cbiAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgYXBwZWFyYW5jZT1cIm91dGxpbmVcIj5cbiAgICAgICAgICAgIDxtYXQtbGFiZWw+Tm9tZTwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtmb3JtQ29udHJvbF09XCJub21lXCIgKGJsdXIpPVwidXBkYXRlRXJyb3JNZXNzYWdlKClcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgQGlmIChub21lLmludmFsaWQpIHtcbiAgICAgICAgICAgIDxtYXQtZXJyb3I+e3sgZXJyb3JNZXNzYWdlIH19PC9tYXQtZXJyb3I+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8IS0tIG91dGxpbmUgLS0+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGFwcGVhcmFuY2U9XCJvdXRsaW5lXCI+XG4gICAgICAgICAgICA8bWF0LWxhYmVsPkUtTWFpbDwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtmb3JtQ29udHJvbF09XCJlbWFpbFwiIChibHVyKT1cInVwZGF0ZUVycm9yTWVzc2FnZSgpXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgIEBpZiAoZW1haWwuaW52YWxpZCkge1xuICAgICAgICAgICAgPG1hdC1lcnJvcj57eyBlcnJvck1lc3NhZ2UgfX08L21hdC1lcnJvcj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBhcHBlYXJhbmNlPVwib3V0bGluZVwiPlxuICAgICAgICAgICAgPG1hdC1sYWJlbD5NZW5zYWdlbTwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IFtmb3JtQ29udHJvbF09XCJtZW5zYWdlbVwiIChibHVyKT1cInVwZGF0ZUVycm9yTWVzc2FnZSgpXCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIEBpZiAobWVuc2FnZW0uaW52YWxpZCkge1xuICAgICAgICAgICAgPG1hdC1lcnJvcj57eyBlcnJvck1lc3NhZ2UgfX08L21hdC1lcnJvcj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxidXR0b24gbWF0LWZsYXQtYnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5FbnZpYXI8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9zZWN0aW9uPlxuIiwiaW1wb3J0IHsgTmdPcHRpbWl6ZWRJbWFnZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWZvb3RlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOZ09wdGltaXplZEltYWdlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9mb290ZXIuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBGb290ZXJDb21wb25lbnQge31cbiIsIjxmb290ZXIgY2xhc3M9XCJmb290ZXItZGlzdHJpYnV0ZWRcIj5cbiAgPGRpdiBjbGFzcz1cImZvb3Rlci1pbWdcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb3Rlci1jb21wYW55XCI+PHNtYWxsPkhHSVNVUFBMWSDCqSAyMDI0PC9zbWFsbD48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb3Rlci1kZXZcIj5cbiAgICA8YSBocmVmPVwiI1wiPjxzbWFsbD5EZXNpZ25lZCAmIERldmVsb3BlZCBieSBhcGxkZXZlbG9wZXIuPC9zbWFsbD48L2E+XG4gIDwvZGl2PlxuPC9mb290ZXI+XG4iLCJpbXBvcnQgeyBOZ09wdGltaXplZEltYWdlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtaGVhZGVyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nT3B0aW1pemVkSW1hZ2VdLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7fVxuIiwiPHNlY3Rpb24gY2xhc3M9XCJzZWN0aW9uLWhlYWRlclwiPlxuICA8ZGl2IGNsYXNzPVwibG9nb1wiPlxuICAgIDxzcGFuIGNsYXNzPVwibG9nby1ncnVwb1wiPkdSVVBPPC9zcGFuPjxzcGFuIGNsYXNzPVwibG9nby1oZ2lcIj5IR0k8L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2xvZ2FuXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJkZXNjcmljYW9cIj5TaXN0ZW1hcyBpbnRlZ3JhZG9zPC9zcGFuPlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lbnUnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vbWVudS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVDb21wb25lbnQge31cbiIsIjxtZW51IGNsYXNzPVwibWVudVwiPlxuICA8bmF2IGNsYXNzPVwibmF2XCI+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uPkhvbWU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24+UXVlbSBTb21vczwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbj5Ob3NzbyBQcm9ww7NzaXRvPC9idXR0b24+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uPlRyaWxoYSBkZSBOZWdvY2lhw6fDo288L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24+Q29udGF0bzwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJ4XCI+XG4gICAgICA8bWF0LWljb24+bWVudTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIDwvbmF2PlxuICA8IS0tXG4gICAgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIlxuICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uPkhvbWU8L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24+UXVlbSBTb21vczwvYnV0dG9uPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbj5Ob3NzbyBQcm9ww7NzaXRvPC9idXR0b24+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uPlRyaWxoYSBkZSBOZWdvY2lhw6fDo288L2J1dHRvbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24+Q29udGF0bzwvYnV0dG9uPlxuICA8L21hdC1tZW51PiAtLT5cbjwvbWVudT5cbiIsImltcG9ydCB7IE5nT3B0aW1pemVkSW1hZ2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ0bkRldGFsaGVDb21wb25lbnQgfSBmcm9tICcuLi9idG4tZGV0YWxoZXMvYnRuLWRldGFsaGVzLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1idXNpbmVzcy11bml0cycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOZ09wdGltaXplZEltYWdlLCBCdG5EZXRhbGhlQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2J1c2luZXNzLXVuaXRzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnVzaW5lc3MtdW5pdHMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCdXNpbmVzc1VuaXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIjxzZWN0aW9uIGNsYXNzPVwiYnVzaW5lc3MtdW5pdHMtc2VjdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwidGl0dWxvXCI+VU5JREFERVMgREUgTkVHw5NDSU88L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInN1YnRpdHVsb1wiPjwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50LWJvZHlcIj5cbiAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWdsb3dcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpYm9yZGVyZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGl0aXRsZVwiPjxzcGFuIGNsYXNzPVwibG9nby1pbmljaWFsLXNtYWxsXCI+SEdJPC9zcGFuPjxzcGFuIGNsYXNzPVwibG9nby11bmQtc21hbGxcIj5TVVBQTFk8L3NwYW4+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWJvZHlcIj5cbiAgICAgICAgQ29udHJpYnV0ZSB0byBPcGVuIFNvdXJjZSBVSSBFbGVtZW50c1xuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuRGV0YWxoZXNcIj5cbiAgICAgICAgPGEgY2xhc3M9XCJtZW51X19saW5rXCIgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImJ0blNpbWJvbG9EZXRhbGhlc1wiPis8L3NwYW4+IERldGFsaGVzPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWdsb3dcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpYm9yZGVyZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGl0aXRsZVwiPjxzcGFuIGNsYXNzPVwibG9nby1pbmljaWFsLXNtYWxsXCI+SEdJPC9zcGFuPjxzcGFuIGNsYXNzPVwibG9nby11bmQtc21hbGxcIj5NS1QgVMOJQ05JQ088L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpYm9keVwiPlxuICAgICAgICBDb250cmlidXRlIHRvIE9wZW4gU291cmNlIFVJIEVsZW1lbnRzXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJidG5EZXRhbGhlc1wiPlxuICAgICAgICA8YSBjbGFzcz1cIm1lbnVfX2xpbmtcIiBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiYnRuU2ltYm9sb0RldGFsaGVzXCI+Kzwvc3Bhbj4gRGV0YWxoZXM8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGlib3JkZXJnbG93XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aXRpdGxlXCI+PHNwYW4gY2xhc3M9XCJsb2dvLWluaWNpYWwtc21hbGxcIj5IR0k8L3NwYW4+PHNwYW4gY2xhc3M9XCJsb2dvLXVuZC1zbWFsbFwiPkdFU1TDg08gREVcbiAgICAgICAgICBPQlJBUzwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWJvZHlcIj5cbiAgICAgICAgICAgIENvbnRyaWJ1dGUgdG8gT3BlbiBTb3VyY2UgVUkgRWxlbWVudHNcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuRGV0YWxoZXNcIj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwibWVudV9fbGlua1wiIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJidG5TaW1ib2xvRGV0YWxoZXNcIj4rPC9zcGFuPiBEZXRhbGhlczwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGlib3JkZXJnbG93XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aXRpdGxlXCI+PHNwYW4gY2xhc3M9XCJsb2dvLWluaWNpYWwtc21hbGxcIj5IR0k8L3NwYW4+PHNwYW4gY2xhc3M9XCJsb2dvLXVuZC1zbWFsbFwiPkVEVUNBw4fDg088L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpYm9keVwiPlxuICAgICAgICBDb250cmlidXRlIHRvIE9wZW4gU291cmNlIFVJIEVsZW1lbnRzXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJidG5EZXRhbGhlc1wiPlxuICAgICAgICA8YSBjbGFzcz1cIm1lbnVfX2xpbmtcIiBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiYnRuU2ltYm9sb0RldGFsaGVzXCI+Kzwvc3Bhbj4gRGV0YWxoZXM8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImNvbnRlbnQtYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGlib3JkZXJnbG93XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aXRpdGxlXCI+PHNwYW4gY2xhc3M9XCJsb2dvLWluaWNpYWwtc21hbGxcIj5IR0k8L3NwYW4+PHNwYW4gY2xhc3M9XCJsb2dvLXVuZC1zbWFsbFwiPkNPTlNVTFRPUklBPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWJvZHlcIj5cbiAgICAgICAgQ29udHJpYnV0ZSB0byBPcGVuIFNvdXJjZSBVSSBFbGVtZW50c1xuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuRGV0YWxoZXNcIj5cbiAgICAgICAgPGEgY2xhc3M9XCJtZW51X19saW5rXCIgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImJ0blNpbWJvbG9EZXRhbGhlc1wiPis8L3NwYW4+IERldGFsaGVzPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWdsb3dcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpYm9yZGVyZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGl0aXRsZVwiPjxzcGFuIGNsYXNzPVwibG9nby1pbmljaWFsLXNtYWxsXCI+SEdJPC9zcGFuPjxzcGFuIGNsYXNzPVwibG9nby11bmQtc21hbGxcIj5TRVJWScOHT1NcbiAgICAgICAgICBFU1BFQ0lBSVM8L3NwYW4+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWJvZHlcIj5cbiAgICAgICAgQ29udHJpYnV0ZSB0byBPcGVuIFNvdXJjZSBVSSBFbGVtZW50c1xuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuRGV0YWxoZXNcIj5cbiAgICAgICAgPGEgY2xhc3M9XCJtZW51X19saW5rXCIgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImJ0blNpbWJvbG9EZXRhbGhlc1wiPis8L3NwYW4+IERldGFsaGVzPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWdsb3dcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpYm9yZGVyZ2xvd1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdGl0aXRsZVwiPjxzcGFuIGNsYXNzPVwibG9nby1pbmljaWFsLXNtYWxsXCI+SEdJPC9zcGFuPjxzcGFuIGNsYXNzPVwibG9nby11bmQtc21hbGxcIj5TRUdVUkFOw4dBIERPXG4gICAgICAgICAgVFJBQkFMSE88L3NwYW4+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWJvZHlcIj5cbiAgICAgICAgQ29udHJpYnV0ZSB0byBPcGVuIFNvdXJjZSBVSSBFbGVtZW50c1xuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuRGV0YWxoZXNcIj5cbiAgICAgICAgPGEgY2xhc3M9XCJtZW51X19saW5rXCIgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImJ0blNpbWJvbG9EZXRhbGhlc1wiPis8L3NwYW4+IERldGFsaGVzPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9zZWN0aW9uPlxuXG48c2NyaXB0PlxuICAoZnVuY3Rpb24gKCQpIHtcbiAgICAkKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm5PblNjcm9sbCgpO1xuICAgICAgfSk7XG5cbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBmbk9uUmVzaXplKCk7XG4gICAgICB9KTtcblxuXG4gICAgICB2YXIgYWdUaW1lbGluZSA9ICQoJy5qcy10aW1lbGluZScpLFxuICAgICAgICBhZ1RpbWVsaW5lTGluZSA9ICQoJy5qcy10aW1lbGluZV9saW5lJyksXG4gICAgICAgIGFnVGltZWxpbmVMaW5lUHJvZ3Jlc3MgPSAkKCcuanMtdGltZWxpbmVfbGluZS1wcm9ncmVzcycpLFxuICAgICAgICBhZ1RpbWVsaW5lUG9pbnQgPSAkKCcuanMtdGltZWxpbmUtY2FyZF9wb2ludC1ib3gnKSxcbiAgICAgICAgYWdUaW1lbGluZUl0ZW0gPSAkKCcuanMtdGltZWxpbmVfaXRlbScpLFxuICAgICAgICBhZ091dGVySGVpZ2h0ID0gJCh3aW5kb3cpLm91dGVySGVpZ2h0KCksXG4gICAgICAgIGFnSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICBmID0gLTEsXG4gICAgICAgIGFnRmxhZyA9IGZhbHNlO1xuXG4gICAgICBmdW5jdGlvbiBmbk9uU2Nyb2xsKCkge1xuICAgICAgICBhZ1Bvc1kgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgZm5VcGRhdGVGcmFtZSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmbk9uUmVzaXplKCkge1xuICAgICAgICBhZ1Bvc1kgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGFnSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgICAgIGZuVXBkYXRlRnJhbWUoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZm5VcGRhdGVXaW5kb3coKSB7XG4gICAgICAgIGFnRmxhZyA9IGZhbHNlO1xuXG4gICAgICAgIGFnVGltZWxpbmVMaW5lLmNzcyh7XG4gICAgICAgICAgdG9wOiBhZ1RpbWVsaW5lSXRlbS5maXJzdCgpLmZpbmQoYWdUaW1lbGluZVBvaW50KS5vZmZzZXQoKS50b3AgLSBhZ1RpbWVsaW5lSXRlbS5maXJzdCgpLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICBib3R0b206IGFnVGltZWxpbmUub2Zmc2V0KCkudG9wICsgYWdUaW1lbGluZS5vdXRlckhlaWdodCgpIC0gYWdUaW1lbGluZUl0ZW0ubGFzdCgpLmZpbmQoYWdUaW1lbGluZVBvaW50KS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZiAhPT0gYWdQb3NZICYmIChmID0gYWdQb3NZLCBhZ0hlaWdodCwgZm5VcGRhdGVQcm9ncmVzcygpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZm5VcGRhdGVQcm9ncmVzcygpIHtcbiAgICAgICAgdmFyIGFnVG9wID0gYWdUaW1lbGluZUl0ZW0ubGFzdCgpLmZpbmQoYWdUaW1lbGluZVBvaW50KS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgaSA9IGFnVG9wICsgYWdQb3NZIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICBhID0gYWdUaW1lbGluZUxpbmVQcm9ncmVzcy5vZmZzZXQoKS50b3AgKyBhZ1Bvc1kgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIG4gPSBhZ1Bvc1kgLSBhICsgYWdPdXRlckhlaWdodCAvIDI7XG4gICAgICAgIGkgPD0gYWdQb3NZICsgYWdPdXRlckhlaWdodCAvIDIgJiYgKG4gPSBpIC0gYSk7XG4gICAgICAgIGFnVGltZWxpbmVMaW5lUHJvZ3Jlc3MuY3NzKHsgaGVpZ2h0OiBuICsgXCJweFwiIH0pO1xuXG4gICAgICAgIGFnVGltZWxpbmVJdGVtLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhZ1RvcCA9ICQodGhpcykuZmluZChhZ1RpbWVsaW5lUG9pbnQpLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgIChhZ1RvcCArIGFnUG9zWSAtICQod2luZG93KS5zY3JvbGxUb3AoKSkgPCBhZ1Bvc1kgKyAuNSAqIGFnT3V0ZXJIZWlnaHQgPyAkKHRoaXMpLmFkZENsYXNzKCdqcy1hZy1hY3RpdmUnKSA6ICQodGhpcykucmVtb3ZlQ2xhc3MoJ2pzLWFnLWFjdGl2ZScpO1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmblVwZGF0ZUZyYW1lKCkge1xuICAgICAgICBhZ0ZsYWcgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuVXBkYXRlV2luZG93KTtcbiAgICAgICAgYWdGbGFnID0gdHJ1ZTtcbiAgICAgIH1cblxuXG4gICAgfSk7XG4gIH0pKGpRdWVyeSk7XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgTmdPcHRpbWl6ZWRJbWFnZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IFJvdXRlckxpbmsgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYnRuLWRldGFsaGVzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nT3B0aW1pemVkSW1hZ2UsIE1hdENhcmRNb2R1bGUsIE1hdEljb25Nb2R1bGUsIFJvdXRlckxpbmtdLFxuICBwcm92aWRlcnM6IFtdLFxuICB0ZW1wbGF0ZVVybDogJy4vYnRuLWRldGFsaGVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnRuLWRldGFsaGVzLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEJ0bkRldGFsaGVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYnRuLWNvbnRlaW5lclwiPlxuICA8YSBjbGFzcz1cImJ0bi1jb250ZW50XCIgaHJlZj1cIiNcIj5cbiAgICA8c3BhbiBjbGFzcz1cImJ0bi10aXRsZVwiPisgREVUQUxIRVM8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJpY29uLWFycm93XCI+XG4gICAgICA8c3ZnXG4gICAgICAgIHdpZHRoPVwiNjZweFwiXG4gICAgICAgIGhlaWdodD1cIjQzcHhcIlxuICAgICAgICB2aWV3Qm94PVwiMCAwIDY2IDQzXCJcbiAgICAgICAgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgPlxuICAgICAgICA8Z1xuICAgICAgICAgIGlkPVwiYXJyb3dcIlxuICAgICAgICAgIHN0cm9rZT1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjFcIlxuICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICBmaWxsLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBpZD1cImFycm93LWljb24tb25lXCJcbiAgICAgICAgICAgIGQ9XCJNNDAuMTU0MzkzMywzLjg5NDg1NDU0IEw0My45NzYzMTQ5LDAuMTM5Mjk2NTkyIEM0NC4xNzA4MzExLC0wLjA1MTg0MjA3MzkgNDQuNDgyNjMyOSwtMC4wNTE4NTcxMTI1IDQ0LjY3NzE2NzUsMC4xMzkyNjI3ODkgTDY1LjY5MTYxMzQsMjAuNzg0ODMxMSBDNjYuMDg1NTgwMSwyMS4xNzE4ODI0IDY2LjA5MTE4NjMsMjEuODA1MDIyNSA2NS43MDQxMzUsMjIuMTk4OTg5MyBDNjUuNzAwMDE4OCwyMi4yMDMxNzkxIDY1LjY5NTg2NTcsMjIuMjA3MzMyNiA2NS42OTE2NzYyLDIyLjIxMTQ0OTIgTDQ0LjY3NzA5OCw0Mi44NjA3ODQxIEM0NC40ODI1OTU3LDQzLjA1MTkwNTkgNDQuMTcwODI0Miw0My4wNTE5MzU4IDQzLjk3NjI4NTMsNDIuODYwODUxMyBMNDAuMTU0NTE4NiwzOS4xMDY5NDc5IEMzOS45NTc1MTUyLDM4LjkxMzQ0MjcgMzkuOTU0Njc5MywzOC41OTY4NzI5IDQwLjE0ODE4NDUsMzguMzk5ODY5NSBDNDAuMTUwMjg5MywzOC4zOTc3MjY4IDQwLjE1MjQxMzIsMzguMzk1NjAzIDQwLjE1NDU1NjIsMzguMzkzNDk4NSBMNTYuOTkzNzc4OSwyMS44NTY3ODEyIEM1Ny4xOTA4MDI4LDIxLjY2MzI5NjggNTcuMTkzNjcyLDIxLjM0NjcyNzMgNTcuMDAwMTg3NiwyMS4xNDk3MDM1IEM1Ni45OTgwNjQ3LDIxLjE0NzU0MTggNTYuOTk1OTIyMywyMS4xNDUzOTk1IDU2Ljk5Mzc2MDUsMjEuMTQzMjc2NyBMNDAuMTU0NTIwOCw0LjYwODI1MTk3IEMzOS45NTc0ODY5LDQuNDE0Nzc3NzMgMzkuOTU0NjAxMyw0LjA5ODIwODM5IDQwLjE0ODA3NTYsMy45MDExNzQ1NiBDNDAuMTUwMTYyNiwzLjg5OTA0OTExIDQwLjE1MjI2ODYsMy44OTY5NDIzNSA0MC4xNTQzOTMzLDMuODk0ODU0NTQgWlwiXG4gICAgICAgICAgICBmaWxsPVwiI0ZGRkZGRlwiXG4gICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgaWQ9XCJhcnJvdy1pY29uLXR3b1wiXG4gICAgICAgICAgICBkPVwiTTIwLjE1NDM5MzMsMy44OTQ4NTQ1NCBMMjMuOTc2MzE0OSwwLjEzOTI5NjU5MiBDMjQuMTcwODMxMSwtMC4wNTE4NDIwNzM5IDI0LjQ4MjYzMjksLTAuMDUxODU3MTEyNSAyNC42NzcxNjc1LDAuMTM5MjYyNzg5IEw0NS42OTE2MTM0LDIwLjc4NDgzMTEgQzQ2LjA4NTU4MDEsMjEuMTcxODgyNCA0Ni4wOTExODYzLDIxLjgwNTAyMjUgNDUuNzA0MTM1LDIyLjE5ODk4OTMgQzQ1LjcwMDAxODgsMjIuMjAzMTc5MSA0NS42OTU4NjU3LDIyLjIwNzMzMjYgNDUuNjkxNjc2MiwyMi4yMTE0NDkyIEwyNC42NzcwOTgsNDIuODYwNzg0MSBDMjQuNDgyNTk1Nyw0My4wNTE5MDU5IDI0LjE3MDgyNDIsNDMuMDUxOTM1OCAyMy45NzYyODUzLDQyLjg2MDg1MTMgTDIwLjE1NDUxODYsMzkuMTA2OTQ3OSBDMTkuOTU3NTE1MiwzOC45MTM0NDI3IDE5Ljk1NDY3OTMsMzguNTk2ODcyOSAyMC4xNDgxODQ1LDM4LjM5OTg2OTUgQzIwLjE1MDI4OTMsMzguMzk3NzI2OCAyMC4xNTI0MTMyLDM4LjM5NTYwMyAyMC4xNTQ1NTYyLDM4LjM5MzQ5ODUgTDM2Ljk5Mzc3ODksMjEuODU2NzgxMiBDMzcuMTkwODAyOCwyMS42NjMyOTY4IDM3LjE5MzY3MiwyMS4zNDY3MjczIDM3LjAwMDE4NzYsMjEuMTQ5NzAzNSBDMzYuOTk4MDY0NywyMS4xNDc1NDE4IDM2Ljk5NTkyMjMsMjEuMTQ1Mzk5NSAzNi45OTM3NjA1LDIxLjE0MzI3NjcgTDIwLjE1NDUyMDgsNC42MDgyNTE5NyBDMTkuOTU3NDg2OSw0LjQxNDc3NzczIDE5Ljk1NDYwMTMsNC4wOTgyMDgzOSAyMC4xNDgwNzU2LDMuOTAxMTc0NTYgQzIwLjE1MDE2MjYsMy44OTkwNDkxMSAyMC4xNTIyNjg2LDMuODk2OTQyMzUgMjAuMTU0MzkzMywzLjg5NDg1NDU0IFpcIlxuICAgICAgICAgICAgZmlsbD1cIiNGRkZGRkZcIlxuICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGlkPVwiYXJyb3ctaWNvbi10aHJlZVwiXG4gICAgICAgICAgICBkPVwiTTAuMTU0MzkzMzM5LDMuODk0ODU0NTQgTDMuOTc2MzE0ODgsMC4xMzkyOTY1OTIgQzQuMTcwODMxMTEsLTAuMDUxODQyMDczOSA0LjQ4MjYzMjg2LC0wLjA1MTg1NzExMjUgNC42NzcxNjc1MywwLjEzOTI2Mjc4OSBMMjUuNjkxNjEzNCwyMC43ODQ4MzExIEMyNi4wODU1ODAxLDIxLjE3MTg4MjQgMjYuMDkxMTg2MywyMS44MDUwMjI1IDI1LjcwNDEzNSwyMi4xOTg5ODkzIEMyNS43MDAwMTg4LDIyLjIwMzE3OTEgMjUuNjk1ODY1NywyMi4yMDczMzI2IDI1LjY5MTY3NjIsMjIuMjExNDQ5MiBMNC42NzcwOTc5Nyw0Mi44NjA3ODQxIEM0LjQ4MjU5NTY3LDQzLjA1MTkwNTkgNC4xNzA4MjQxOCw0My4wNTE5MzU4IDMuOTc2Mjg1MjYsNDIuODYwODUxMyBMMC4xNTQ1MTg1OTEsMzkuMTA2OTQ3OSBDLTAuMDQyNDg0ODIxNSwzOC45MTM0NDI3IC0wLjA0NTMyMDY3MzMsMzguNTk2ODcyOSAwLjE0ODE4NDUzOCwzOC4zOTk4Njk1IEMwLjE1MDI4OTI1NiwzOC4zOTc3MjY4IDAuMTUyNDEzMjM5LDM4LjM5NTYwMyAwLjE1NDU1NjIyOCwzOC4zOTM0OTg1IEwxNi45OTM3Nzg5LDIxLjg1Njc4MTIgQzE3LjE5MDgwMjgsMjEuNjYzMjk2OCAxNy4xOTM2NzIsMjEuMzQ2NzI3MyAxNy4wMDAxODc2LDIxLjE0OTcwMzUgQzE2Ljk5ODA2NDcsMjEuMTQ3NTQxOCAxNi45OTU5MjIzLDIxLjE0NTM5OTUgMTYuOTkzNzYwNSwyMS4xNDMyNzY3IEwwLjE1NDUyMDc2LDQuNjA4MjUxOTcgQy0wLjA0MjUxMzA2NTEsNC40MTQ3Nzc3MyAtMC4wNDUzOTg2NzU2LDQuMDk4MjA4MzkgMC4xNDgwNzU1NjgsMy45MDExNzQ1NiBDMC4xNTAxNjI2MjQsMy44OTkwNDkxMSAwLjE1MjI2ODYzMSwzLjg5Njk0MjM1IDAuMTU0MzkzMzM5LDMuODk0ODU0NTQgWlwiXG4gICAgICAgICAgICBmaWxsPVwiI0ZGRkZGRlwiXG4gICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgPC9zcGFuPlxuICA8L2E+XG48L2Rpdj5cbiIsImltcG9ydCB7IE5nT3B0aW1pemVkSW1hZ2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWhnaS1zdXBwbHknLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdPcHRpbWl6ZWRJbWFnZSwgTWF0TGlzdE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW10sXG4gIHRlbXBsYXRlVXJsOiAnLi9oZ2ktc3VwcGx5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGdpLXN1cHBseS5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBIZ2lTdXBwbHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgIH1cblxuXG59XG4iLCI8c2VjdGlvbiBjbGFzcz1cInNlY3Rpb24tc3VwcGx5XCI+XG4gIDxkaXYgY2xhc3M9XCJ0aXR1bG9cIj5UUklMSEEgREUgTkVHT0NJQcOHw5VFUzwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1ibG9ja1wiPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwiYWctc2VjdGlvblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFnLWZvcm1hdC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lIGFnLXRpbWVsaW5lXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2xpbmUgYWctdGltZWxpbmVfbGluZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2xpbmUtcHJvZ3Jlc3MgYWctdGltZWxpbmVfbGluZS1wcm9ncmVzc1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZV9saXN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmVfaXRlbSBhZy10aW1lbGluZV9pdGVtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2JveFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZS1jYXJkX3BvaW50LWJveCBhZy10aW1lbGluZS1jYXJkX3BvaW50LWJveFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfcG9pbnRcIj4wMTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX21ldGEtYm94XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2luZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfdGl0bGVcIj5TVEFUSU9OIDE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfc3VidGl0bGVcIj5TaXN0ZW1hIGVsw6l0cmljbyA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgSW5mcmFlc3RydXR1cmEgc3VidGVycsOibmVhPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGEgRU5UUkFEQSBERSBFTkVSR0lBIFNVQlRFUlLDgk5FQVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtc3RhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMSAtIFFHQlQgLSBRVUFEUk8gR0VSQUwgREUgQkFJWEEgVEVOU8ODTzwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAyIC0gRUxFVFJPRFVUT1M8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMyAtIENBQk9TIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA0IC0gUU0gLSBRVUFEUk8gTUVESURPUjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA1IC0gUE9TVEVBTUVOVE8gREVDT1JBVElWTyAvIEZPVE9Dw4lMVUxBIEUgTFVNSU7DgVJJQVM8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmUtY2FyZF9wb2ludC1ib3ggYWctdGltZWxpbmUtY2FyZF9wb2ludC1ib3hcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3BvaW50XCI+MDI8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gMjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgZWzDqXRyaWNvIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICBJbmZyYWVzdHJ1dHVyYSBhw6lyZWE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYSBFTlRSQURBIERFIEVORVJHSUEgQcOJUkVBXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1zdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAxIC0gUE9TVEVTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAyIC0gVFJBTlNGT1JNQURPUkVTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAzIC0gQ0FCT1MgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDQgLSBNSVNDRUzDgk5FQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDUgLSBQT1NURUFNRU5UTyBERUNPUkFUSVZPIC8gRk9UT0PDiUxVTEEgRSBMVU1JTsOBUklBUzwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmUtY2FyZF9wb2ludC1ib3ggYWctdGltZWxpbmUtY2FyZF9wb2ludC1ib3hcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3BvaW50XCI+MDM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiAzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3N1YnRpdGxlXCI+U2lzdGVtYSBlbMOpdHJpY28gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEVsw6l0cmljYSBwcmVkaWFsIC0gRXN0cnV0dXJhPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGEgRUzDiVRSSUNBIFBSRURJQUwgLSBFU1RSVVRVUkFcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBFTEVUUk9EVVRPUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIFFEQyAtIFFVQURSTyBERSBESVNUUklCVUnDh8ODTyBERSBDSVJDw5pJVE9TIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAzIC0gQ0FJWElOSEFTIEVMw4lUUklDQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDQgLSBDQUJPUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNSAtIFRFUk1JTkFJUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNiAtIEVTUEHDh0FET1JFUyBFIEZJVEFTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZS1jYXJkX3BvaW50LWJveCBhZy10aW1lbGluZS1jYXJkX3BvaW50LWJveFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfcG9pbnRcIj4wNDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiA0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3N1YnRpdGxlXCI+U2lzdGVtYSBlbMOpdHJpY28gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEVsw6l0cmljYSBwcmVkaWFsIDxicj4gRGlzanVudG9yZXMgZSBtaXNjZWzDom5lYXM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYSBFTMOJVFJJQ0EgUFJFRElBTCAtIERJU0pVTlRPUkVTIEVcbiAgICAgICAgICAgICAgICAgICAgICBNSVNDRUzDgk5FQVNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBEUnMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDIgLSBEUHMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDMgLSBESVNKVU5UT1JFUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIEJBUlJBTUVOVE9TIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA1IC0gVEVSTUlOQUlTIEUgQU5JTEhBUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjA1PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gNTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgZWzDqXRyaWNvIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICBFbMOpdHJpY2EgcHJlZGlhbCA8YnI+IEFjYWJhbWVudG8gZWzDqXRyaWNvPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGEgRUzDiVRSSUNBIFBSRURJQUwgQUNBQkFNRU5UTyBFTMOJVFJJQ09cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBUT01BREFTIC8gSU5URVJSVVBUT1JFUyAvIEVTUEVMSE9TIC8gVVNCIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZS1jYXJkX3BvaW50LWJveCBhZy10aW1lbGluZS1jYXJkX3BvaW50LWJveFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfcG9pbnRcIj4wNjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiA2PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3N1YnRpdGxlXCI+U2lzdGVtYSBlbMOpdHJpY28gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEVsw6l0cmljYSBwcmVkaWFsIDxicj4gTHVtaW7DoXJpYXMgZSBzZW5zb3JlczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmVzdGEgZXN0YcOnw6NvIHZvY8OqIG5lZ29jaWFyw6EgdG9kb3Mgb3MgbWF0ZXJpYWlzIHJlZmVyZW50ZSBhIEVMw4lUUklDQSBQUkVESUFMIExVTUlOw4FSSUFTIEUgU0VOU09SRVNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBMVU1JTsOBUklBUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIFNFTlNPUkVTIERFIFBSRVNFTsOHQSA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjA3PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gNzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgZWzDqXRyaWNvIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICBJbmZyYWVzdHJ1dHVyYSBlc2dvdG88L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYSBJTkZSQUVTVFJVVFVSQSBFU0dPVE9cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBDQUlYQVMgUFLDiS1NT0xEQURBUyBERSBDT05DUkVUTyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIENBSVhBUyBQVkMgMzYwwrogPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDMgLSBUVUJPUyBFIENPTkVYw5VFUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIE1BTklMSEFTIERFIENPTkNSRVRPIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA1IC0gRVRFIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZS1jYXJkX3BvaW50LWJveCBhZy10aW1lbGluZS1jYXJkX3BvaW50LWJveFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfcG9pbnRcIj4wODwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiA4PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3N1YnRpdGxlXCI+U2lzdGVtYSBoaWRyw6F1bGljbyA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgRXNnb3RvIHByZWRpYWw8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYW8gRVNHT1RPIFBSRURJQUxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBQQVNTQU5URVMgREUgTEFKRSA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIFRVQk9TIEUgQ09ORVjDlUVTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAzIC0gQU5USSBJTkZJTFRSQcOHw4NPIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA0IC0gRklYQcOHw5VFUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNSAtIEJMT1FVRUFET1JFUyBFIEFDQUJBTUVOVE9TIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA2IC0gU0lGw4NPUyBFIFbDgUxWVUxBUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjA5PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gOTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgaGlkcsOhdWxpY28gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEluZnJhZXN0cnV0dXJhIGRyZW5hZ2VtPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGEgSU5GUkFFU1RSVVRVUkEgRFJFTkFHRU1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBDQUlYQVMgUFLDiS1NT0xEQURBUyBERSBDT05DUkVUTyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIENBSVhBUyBQVkMgMzYwwrogPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDMgLSBUVUJPUyBFIENPTkVYw5VFUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIE1BTklMSEFTIERFIENPTkNSRVRPIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA1IC0gVFVCTyBQRUFEIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZS1jYXJkX3BvaW50LWJveCBhZy10aW1lbGluZS1jYXJkX3BvaW50LWJveFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfcG9pbnRcIj4xMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiAxMDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgaGlkcsOhdWxpY28gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIERyZW5hZ2VtIHByZWRpYWw8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYSBEUkVOQUdFTSBQUkVESUFMXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1zdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAxIC0gQk9DQUwgQ0FMSEEgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDIgLSBQQVNTQU5URVMgREUgTEFKRSA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMyAtIFRVQk9TIEUgQ09ORVjDlUVTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA0IC0gRklYQcOHw5VFUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjExPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gMTE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfc3VidGl0bGVcIj5TaXN0ZW1hIGhpZHLDoXVsaWNvIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICBJbmZyYWVzdHJ1dHVyYSBkZSBhYmFzdGVjaW1lbnRvIGRlIMOhZ3VhPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGEgSU5GUkFFU1RSVVRVUkEgREUgQUJBU1RFQ0lNRU5UTyBERVxuICAgICAgICAgICAgICAgICAgICAgIMOBR1VBXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1zdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAxIC0gTUFDUk9NRURJRE9SIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAyIC0gQ0FTVEVMTyBNRVTDgUxJQ08gLyBDQVNURUxPIENPTkNSRVRPIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAzIC0gQk9NQkFTIC0gQ0FTQSBERSBCT01CQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDQgLSBRVUFEUk8gREUgQ09NQU5ETyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNSAtIFRVQk9TIEUgQ09ORVjDlUVTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZS1jYXJkX3BvaW50LWJveCBhZy10aW1lbGluZS1jYXJkX3BvaW50LWJveFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfcG9pbnRcIj4xMjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiAxMjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgaGlkcsOhdWxpY28gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEFiYXN0ZWNpbWVudG8gZGUgw6FndWEgcHJlZGlhbDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmVzdGEgZXN0YcOnw6NvIHZvY8OqIG5lZ29jaWFyw6EgdG9kb3Mgb3MgbWF0ZXJpYWlzIHJlZmVyZW50ZSBhIElORlJBRVNUUlVUVVJBIERFIEfDgVNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBNSUNST01FRElET1I8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIEhJRFLDlE1FVFJPIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAzIC0gVFVCT1MgRSBDT05FWMOVRVM8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIFBFWCAvIENIQVNTSSAvIENBUkVOQUdFTlMgLyBDT0lGQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDUgLSBFTkdBVEUgRkxFWMONVkVMIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA2IC0gTUVUQVRJUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNyAtIExPVcOHQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDggLSBNw4NPIEZSQU5DRVNBIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmUtY2FyZF9wb2ludC1ib3ggYWctdGltZWxpbmUtY2FyZF9wb2ludC1ib3hcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3BvaW50XCI+MTM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiAxMzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgZGUgZ8OhcyA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgSW5mcmFlc3RydXR1cmEgZGUgZ8OhczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmVzdGEgZXN0YcOnw6NvIHZvY8OqIG5lZ29jaWFyw6EgdG9kb3Mgb3MgbWF0ZXJpYWlzIHJlZmVyZW50ZSBhIElORlJBRVNUUlVUVVJBIERFIEfDgVNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBSRUdVTEFET1IgREUgUFJJTUVJUk8gRVNUw4FHSU8gPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDIgLSBUVUJPUyBFIENPTkVYw5VFUyBNVUxUSUNBTUFEQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDMgLSBSRUdVTEFET1IgREUgU0VHVU5ETyBFU1TDiUdJTyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIFRVQk9TIEUgQ09ORVjDlUVTIFBBUkEgR04gPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9hcnJvd1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjE0PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gMTQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfc3VidGl0bGVcIj5TaXN0ZW1hIGRlIGfDoXMgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEfDoXMgcHJlZGlhbDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmVzdGEgZXN0YcOnw6NvIHZvY8OqIG5lZ29jaWFyw6EgdG9kb3Mgb3MgbWF0ZXJpYWlzIHJlZmVyZW50ZSBhbyBHw4FTIFBSRURJQUxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBGSVhBw4fDlUVTIFBBUkEgU0lTVEVNQVMgREUgR8OBUyBNVUxUSUNBTUFEQVM8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIFRVQk9TIEUgQ09ORVjDlUVTIE1VTFRJQ0FNQURBUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMyAtIFbDgUxWVUxBUyBFIFBMVUdTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA0IC0gUExBQ0FTIEUgSURFTlRJRklDQcOHw5VFUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmUtY2FyZF9wb2ludC1ib3ggYWctdGltZWxpbmUtY2FyZF9wb2ludC1ib3hcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3BvaW50XCI+MTU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gMTU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfc3VidGl0bGVcIj5TaXN0ZW1hIGRlIGFyIGNvbmRpY2lvbmFkbyA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgQXIgY29uZGljaW9uYWRvIHByZWRpYWw8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYW8gQVIgQ09ORElDSU9OQURPIFBSRURJQUxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBGSVhBw4fDlUVTIFBBUkEgU0lTVEVNQVMgREUgQVIgQ09ORElDSU5BRE88L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIFRVQk9TIEUgQ09ORVjDlUVTIE1VTFRJQ0FNQURBUyBQQVJBIEFSIENPTkRJQ0lPTkFETzwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAzIC0gUFJPVEXDh8OVRVMgRSBFTlZFTE9QQU1FTlRPIERBIENBTUFSQSBGUklHT1JJR0lOQSA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIEtJVCBBUiBDT05ESUNJT05BRE8gKyBTRVJWScOHTyBERSBJTlNUQUxBw4fDg08gPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDUgLSBEUkVOTyBBUiBDT05ESUNJT05BRE88L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjE2PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gMTY8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfc3VidGl0bGVcIj5TaXN0ZW1hIGRlIGNvbWJhdGUgYSBpbmPDqm5kaW8gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIEluZnJhZXN0cnV0dXJhIGRvIHNpc3RlbWEgZGUgY29tYmF0ZSBhIGluY8OqbmRpbzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmVzdGEgZXN0YcOnw6NvIHZvY8OqIG5lZ29jaWFyw6EgdG9kb3Mgb3MgbWF0ZXJpYWlzIHJlZmVyZW50ZSBhIElORlJBRVNUUlVUVVJBIERPIFNJU1RFTUEgREUgQ09NQkFURSBBXG4gICAgICAgICAgICAgICAgICAgICAgSU5Dw4pORElPXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1zdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAxIC0gUVVBRFJPIERFIENPTUFORE8gPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDIgLSBCT01CQVMgLSBDQVNBIERFIEJPTUJBUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMyAtIFRVQk9TIEUgQ09ORVjDlUVTIFBWQyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIFRVQk9TIEdBTFZBTklaQURPUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNSAtIENPTkVYw5VFUyBHQUxWQU5JWkFEQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9hcnJvd1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmVfaXRlbSBhZy10aW1lbGluZV9pdGVtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2JveFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX21ldGEtYm94XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjE3PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2luZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfdGl0bGVcIj5TVEFUSU9OIDE3PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3N1YnRpdGxlXCI+U2lzdGVtYSBkZSBjb21iYXRlIGEgaW5jw6puZGlvIDxicj5cbiAgICAgICAgICAgICAgICAgICAgICBTaXN0ZW1hIGRlIGNvbWJhdGUgYSBpbmPDqm5kaW8gcHJlZGlhbDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9kZXNjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTmVzdGEgZXN0YcOnw6NvIHZvY8OqIG5lZ29jaWFyw6EgdG9kb3Mgb3MgbWF0ZXJpYWlzIHJlZmVyZW50ZSBhbyBTSVNURU1BIERFIENPTUJBVEUgQSBJTkPDik5ESU8gUFJFRElBTFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtc3RhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMSAtIFRVQk9TIEdBTFZBTklaQURPUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIENPTkVYw5VFUyBHQUxWQU5JWkFEQVMgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDMgLSBDQUlYQSBERSBISURSw4JOVEU8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNCAtIE1BTkdVRUlSQVMgLyBDSEFWRSBTVE9SWiAvIEFHVUxIRVRBIC8gVsOBTFZVTEFTIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjA1IC0gUExBQ0FTIERFIFNDSSA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wNiAtIExVTUlOw4FSSUFTIERFIEVNRVJHw4pOQ0lBIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lX2l0ZW0gYWctdGltZWxpbmVfaXRlbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmUtY2FyZF9wb2ludC1ib3ggYWctdGltZWxpbmUtY2FyZF9wb2ludC1ib3hcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3BvaW50XCI+MTg8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9tZXRhLWJveFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2lubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3RpdGxlXCI+U1RBVElPTiAxODwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9zdWJ0aXRsZVwiPlNpc3RlbWEgZm90b3ZvbHTDoWljbyA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgU2lzdGVtYSBmb3Rvdm9sdMOhaWNvPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGFvIFNJU1RFTUEgRk9UT1ZPTFTDgUlDT1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHMtc3RhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMSAtIFBMQUNBUyBGT1RPVk9MVMOBSUNPUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIElOVkVSU09SIERFIEZSRVFVw4pOQ0lBPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9hcnJvd1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwianMtdGltZWxpbmVfaXRlbSBhZy10aW1lbGluZV9pdGVtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2JveFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX21ldGEtYm94XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjE5PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2luZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfdGl0bGVcIj5TVEFUSU9OIDE5PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX3N1YnRpdGxlXCI+U2lzdGVtYSBkZSBlbMOpdHJvIG1vYmlsaWRhZGUgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgIFNpc3RlbWEgZGUgY2FycmVnYWRvcmVzIHBhcmEgY2Fycm8gZWzDqXRyaWNvPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Rlc2NcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOZXN0YSBlc3Rhw6fDo28gdm9jw6ogbmVnb2NpYXLDoSB0b2RvcyBvcyBtYXRlcmlhaXMgcmVmZXJlbnRlIGFvIFNJU1RFTUEgREUgRUzDiVRSTyBNT0JJTElEQURFXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscy1zdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0PjAxIC0gQ0FSUkVHQURPUkVTIFBBUkEgQ0FSUk9TIEVMw4lUUklDT1M8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqcy10aW1lbGluZV9pdGVtIGFnLXRpbWVsaW5lX2l0ZW1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94IGFnLXRpbWVsaW5lLWNhcmRfcG9pbnQtYm94XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9wb2ludFwiPjIwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfbWV0YS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF9pbm5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWctdGltZWxpbmUtY2FyZF90aXRsZVwiPlNUQVRJT04gMjA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfc3VidGl0bGVcIj5TaXN0ZW1hIGRlIGV4YXVzdMOjbyA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgU2lzdGVtYSBkZSBleGF1c3TDo288L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnLXRpbWVsaW5lLWNhcmRfZGVzY1wiPlxuICAgICAgICAgICAgICAgICAgICAgIE5lc3RhIGVzdGHDp8OjbyB2b2PDqiBuZWdvY2lhcsOhIHRvZG9zIG9zIG1hdGVyaWFpcyByZWZlcmVudGUgYW8gU0lTVEVNQSBERSBFWEFVU1TDg09cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzLXN0YXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQ+MDEgLSBQUkVTU1VSSVpBw4fDg08gREUgRVNDQURBUyA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDxoND4wMiAtIFZFTlRPIEtJVCA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZy10aW1lbGluZS1jYXJkX2Fycm93XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gIDwvZGl2PlxuPC9zZWN0aW9uPlxuIiwiaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZ2lTdXBwbHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYnVzaW5lc3MtdW5pdHMvaGdpLXN1cHBseS9oZ2ktc3VwcGx5LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICcnLFxuICAgIGNvbXBvbmVudDogSG9tZUNvbXBvbmVudCxcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdoZ2ktc3VwcGx5JyxcbiAgICBjb21wb25lbnQ6IEhnaVN1cHBseUNvbXBvbmVudCxcbiAgfSxcbiAgLy8ge1xuICAvLyAgIHBhdGg6ICdlbGV0cmljYS1wcmVkaWFsJyxcbiAgLy8gICBjb21wb25lbnQ6IEVsZXRyaWNhUHJlZGlhbENvbXBvbmVudCxcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIHBhdGg6ICdoaWRyYXVsaWNhLXByZWRpYWwnLFxuICAvLyAgIGNvbXBvbmVudDogSGlkcmF1bGljYVByZWRpYWxDb21wb25lbnQsXG4gIC8vIH0sXG4gIC8vIHtcbiAgLy8gICBwYXRoOiAnaW5mcmFlc3RydXR1cmEtZWxldHJpY2EnLFxuICAvLyAgIGNvbXBvbmVudDogSW5mcmFFc3RydXR1cmFFbGV0cmljYUNvbXBvbmVudCxcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIHBhdGg6ICdpbmZyYWVzdHJ1dHVyYS1oaWRyYXVsaWNhJyxcbiAgLy8gICBjb21wb25lbnQ6IEluZnJhRXN0cnV0dXJhSGlkcmF1bGljYUNvbXBvbmVudCxcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIHBhdGg6ICdzaXN0ZW1hLWdhcycsXG4gIC8vICAgY29tcG9uZW50OiBTaXN0ZW1hR2FzQ29tcG9uZW50LFxuICAvLyB9LFxuXTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXJvb3QnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbUm91dGVyT3V0bGV0XSxcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9hcHAuY29tcG9uZW50LnNjc3MnXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHRpdGxlID0gJ2dydXBvLWhnaSc7XG59XG4iLCI8cm91dGVyLW91dGxldCAvPlxuIl0sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUyw0QkFBNEI7OztBQ0NyQyxTQUFTLGVBQWUsMEJBQTBCO0FBQ2xELFNBQVMsOEJBQThCO0FBQ3ZDLFNBQVMscUJBQXFCOzs7QUNIdkIsSUFBTSxjQUFjO0VBQ3pCLGdCQUFnQjtJQUNkLFFBQVE7SUFDUixZQUFZO0lBQ1osV0FBVztJQUNYLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLGVBQWU7Ozs7O0FERm5CLFNBQVMsbUJBQW1CLGlCQUFpQjtBQUM3QyxTQUFTLDhCQUE4QjtBQUN2QyxTQUFTLHlCQUF5Qjs7O0FFUmxDLFNBQVMsb0JBQUFBLHlCQUF3QjtBQUNqQyxTQUFTLGFBQUFDLGtCQUFpQjs7O0FFRDFCLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsaUJBQXlCOztBQVU1QixJQUFPLGtCQUFQLE1BQU8sZ0JBQWM7RUFDekIsY0FBQTtFQUFlO0VBRWYsV0FBUTtFQUFJOzs7bUJBSEQsaUJBQWM7QUFBQTttRkFBZCxpQkFBYyxXQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsR0FBQSxZQUFBLE1BQUEsVUFBQSxDQUFBLGdDQUpkLENBQUEsQ0FBRSxHQUFBLGdDQUFBLEdBQUEsT0FBQSxJQUFBLE1BQUEsR0FBQSxRQUFBLENBQUEsQ0FBQSxHQUFBLGNBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsQ0FBQSxHQUFBLGNBQUEsR0FBQSxDQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsR0FBQSxhQUFBLEdB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dkIsSUFBTyxnQkFBUCxNQUFPLGNBQVk7RUFQekIsY0FBQTtBQVFFLFNBQUEsUUFBUTs7OzttQkFERyxlQUFZO0FBQUE7bUZBQVosZUFBWSxXQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxZQUFBLE1BQUEsVUFBQSxDQUFBLGtDQUFBLEdBQUEsT0FBQSxHQUFBLE1BQUEsR0FBQSxVQUFBLFNBQUEsc0JBQUEsSUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQUE7QUNWekIsSUFBQSx5QkFBQSxHQUFBLGVBQUE7O2tCRE1ZLFlBQVksRUFBQSxDQUFBO0FBSWxCLElBQU8sZUFBUDs7a0ZBQU8sY0FBWSxFQUFBLFdBQUEsZUFBQSxDQUFBO0FBQUEsR0FBQTs7O0F0Qk56QixxQkFBcUIsY0FBYyxTQUFTLEVBQ3pDLE1BQU0sQ0FBQyxRQUFRLFFBQVEsTUFBTSxHQUFHLENBQUM7IiwibmFtZXMiOlsiTmdPcHRpbWl6ZWRJbWFnZSIsIkNvbXBvbmVudCIsIkNvbXBvbmVudCIsIk5nT3B0aW1pemVkSW1hZ2UiLCJDb21wb25lbnQiLCJOZ09wdGltaXplZEltYWdlIiwiQ29tcG9uZW50IiwiQ29tcG9uZW50IiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk5nT3B0aW1pemVkSW1hZ2UiLCJDb21wb25lbnQiLCJOZ09wdGltaXplZEltYWdlIiwiQ29tcG9uZW50IiwiTWF0SWNvbk1vZHVsZSIsIk5nT3B0aW1pemVkSW1hZ2UiLCJDb21wb25lbnQiLCJNYXRMaXN0TW9kdWxlIiwiQ29tcG9uZW50Il19