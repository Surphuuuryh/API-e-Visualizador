/**
 * Aula: Manipulação do DOM
 *
 * Preencha cada seção ao vivo durante a aula.
 * HTML: public/index.html
 * DevTools (F12) → inspecionar elementos e acompanhar o console.
 */

// ===========================================================================
// Helpers (opcional — crie funções auxiliares se quiser)
// ===========================================================================

// ===========================================================================
// 1. Seleção de elementos
//
// APIs: getElementById, querySelector, querySelectorAll
//
// Botões (data-action):
//   selecionar-por-id | selecionar-query | selecionar-query-all
//
// Elementos no HTML:
//   #caixa-selecao, .secundario, #output-selecao
// ===========================================================================
const selectionBox = document.getElementById("caixa-selecao");
const htmlCards = document.getElementsByClassName("card");
const selectBoxWithQuery = document.querySelector("#caixa-selecao");
const selectCardWithQuery = document.querySelector(".card");

console.log("htmlCards", htmlCards.length);

// ===========================================================================
// 2. Conteúdo
//
// APIs: textContent, innerText, innerHTML
//
// Botões (data-action):
//   alterar-text-content | alterar-inner-text | alterar-inner-html | restaurar-conteudo
//
// Elemento no HTML:
//   #caixa-conteudo
// ===========================================================================
console.log("selectionBox text content", selectionBox?.textContent);
const randomCard = htmlCards.item(0);
console.log("randomCard", randomCard?.innerHTML);

// ===========================================================================
// 3. Atributos
//
// APIs: setAttribute, getAttribute, removeAttribute
//
// Botões (data-action):
//   definir-atributo | ler-atributo | remover-atributo
//
// Elementos no HTML:
//   #imagem-demo, #output-atributos
// ===========================================================================
const testButton = document.getElementById("button-teste");
testButton?.setAttribute("test-attribute", "testing");
const testAttribute = testButton?.getAttribute("test-attribute");

if (testAttribute === "testing") {
  console.log("testAttribute is testing");
}

// ===========================================================================
// 4. Classes (classList)
//
// APIs: classList.add, classList.remove, classList.toggle, classList.contains
//
// Botões (data-action):
//   classe-add | classe-remove | classe-toggle | classe-contains
//
// Elementos no HTML:
//   #caixa-classes, #output-classes
// ===========================================================================
const testButtonClasses = testButton?.classList;

console.log("testButtonClasses", testButtonClasses);

testButtonClasses?.add("test-class");

// ===========================================================================
// 5. Estilos inline
//
// API: element.style
//
// Botões (data-action):
//   estilo-cor | estilo-tamanho | estilo-reset
//
// Elemento no HTML:
//   #caixa-estilos
// ===========================================================================
const testButtonStyles = testButton?.style;

testButton?.addEventListener("click", () => {
  if (testButtonStyles) {
    testButtonStyles.backgroundColor = "red";
  }
});

// ===========================================================================
// 6. Criar e remover elementos
//
// APIs: createElement, appendChild, remove, insertAdjacentHTML
//
// Botões (data-action):
//   adicionar-item | inserir-html | remover-ultimo | resetar-lista
//
// Elemento no HTML:
//   #lista-itens
// ===========================================================================
const listaItens = document.getElementById("lista-itens");
const newItem = document.createElement("li");
console.log("listaItens", listaItens?.innerHTML);

newItem.textContent = "Novo item";
listaItens?.appendChild(newItem);
console.log("listaItens", listaItens?.innerHTML);

listaItens?.removeChild(newItem);
console.log("listaItens", listaItens?.innerHTML);

// ===========================================================================
// 7. Eventos

// APIs: addEventListener, objeto event

// Elementos no HTML:
//   #botao-evento, #caixa-evento, #output-eventos
// ===========================================================================

// ===========================================================================
// 8. Navegação no DOM

// APIs: parentElement, children, nextElementSibling, previousElementSibling

// Botões (data-action):
//   nav-parent | nav-children | nav-next | nav-prev

// Elementos no HTML:
//   #no-ativo, #no-pai, #output-navegacao
// ===========================================================================
const navegacao = document.getElementById("no-pai");
const childs = navegacao?.children;
let activeIndex = 0; // 1

for (let i = 0; i < childs!.length; i++) {
  const child = childs!.item(i);

  if (child?.classList.contains("ativo")) {
    activeIndex = i;
    break;
  }
}

const previousButton = document.getElementById("nav-previous");
const nextButton = document.getElementById("nav-next");

previousButton?.addEventListener("click", (event) => {
  event.preventDefault();

  let activeChild = childs!.item(activeIndex);
  activeChild?.classList.remove("ativo");

  activeIndex--;

  if (activeIndex < 0) {
    activeIndex = childs!.length - 1;
  }

  activeChild = childs!.item(activeIndex);
  childs!.item(activeIndex)?.classList.add("ativo");
});

nextButton?.addEventListener("click", (event) => {
  event.preventDefault();

  let activeChild = childs!.item(activeIndex);
  activeChild?.classList.remove("ativo");

  activeIndex++;

  if (activeIndex >= childs!.length) {
    activeIndex = 0;
  }

  activeChild = childs!.item(activeIndex);
  childs!.item(activeIndex)?.classList.add("ativo");
});

// ===========================================================================
// Delegação de eventos + inicialização
//
// Conecte os botões [data-action] às funções das seções acima.
// Chame a configuração de eventos da seção 7 ao final.
// ===========================================================================
