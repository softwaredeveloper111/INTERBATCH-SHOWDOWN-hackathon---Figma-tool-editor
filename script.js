
const rectBtn = document.querySelector("#rectangleIcon");
const textBtn = document.querySelector("#textIcon")
const canvasAreaSection = document.querySelector("#canvas")







// dom reference 
const propWidth = document.querySelector("#prop-width");
const propHeight = document.querySelector("#prop-height");
const propBg = document.querySelector("#prop-bg");
const propText = document.querySelector("#prop-text");
const textProps = document.querySelector("#text-props");







const randomId = (length = 6) => {
  return Math.random().toString(36).substring(2, length + 2);
};


function selectElementById(id) {
  canvasAreaSection.querySelectorAll(".selected").forEach(el => {
    el.classList.remove("selected");
    removeResizeHandles(el);
    el.querySelector(".rotate-handle")?.remove(); 
  });

  const el = document.getElementById(id);
  if (!el) return;

  el.classList.add("selected");
  selectedElementId = id;

  addResizeHandles(el);
  addRotateHandle(el); 
  renderLayers();


    const elData = getElementDataById(id);
    if (!elData) return;

    // populate inputs
    propWidth.value = elData.width;
    propHeight.value = elData.height;
    propBg.value = elData.bgColor || "#000000";

    // text-specific
    if (elData.type === "text") {
      textProps.style.display = "block";
      propText.value = document.getElementById(id).textContent;
    } else {
      textProps.style.display = "none";
    }

}






const elements = [];
let selectedElementId = null;
const base = 40;



// dragging the element
let isDragging = false;

let dragStartX = 0;
let dragStartY = 0;

let elementStartX = 0;
let elementStartY = 0;


function getElementDataById(id) {
  return elements.find(el => el.id === id);
}



// resize the element


let isResizing = false;
let resizeDirection = null;

let resizeStartX = 0;
let resizeStartY = 0;

let startWidth = 0;
let startHeight = 0;
let startX = 0;
let startY = 0;


// rotation the element
let isRotating = false;
let rotateCenterX = 0;
let rotateCenterY = 0;



// rectangle functionality all add here
rectBtn.addEventListener("click",(e)=>{
  
  const id = randomId(10);
  const offset = elements.length * 20;
  const x = offset+base;
  const y = offset+base


  const div = document.createElement("div");
  div.style.height = "80px";
  div.style.width = "100px";
  div.style.backgroundColor = "#4f8cff";
  div.style.position = "absolute";
  div.style.top = `${y}px`;
  div.style.left = `${x}px`;
  div.style.fontSize = "16px";

  div.id = id;
  div.dataset.type = "rect"


  canvasAreaSection.append(div)
  elements.push({id,type:"rect",x,y,width:100,height:80,bgColor:"#4f8cff", rotation: 0})
  syncZIndex();
  renderLayers();
  selectElementById(div.id);


 
  // add selection functionality here
  div.addEventListener("click",(e)=>{
    e.stopPropagation();
    selectElementById(div.id);
  })


  //  Add dragging functionality here.
  div.addEventListener("mousedown",(e)=>{
      e.preventDefault();
      if (e.target !== div) return; 
      if (div.id !== selectedElementId) return;

      isDragging = true;

      dragStartX = e.clientX;
      dragStartY = e.clientY;


        const elData = getElementDataById(div.id);
        if (!elData) return;

        elementStartX = elData.x;
        elementStartY = elData.y; 

  })

  
})




// textbutton functionality all add here 
textBtn.addEventListener("click",(e)=>{

  const id = randomId(10);
  const offset = elements.length * 20;
  const x = offset+base;
  const y = offset+base

  const div = document.createElement("div");
  div.textContent = "default text generation"
  div.style.height = "auto";
  div.style.minHeight = "30px";
  div.style.width = "190px";
  div.style.backgroundColor = "transparent";
  div.style.color=  'white'
  div.style.position = "absolute";
  div.style.top = `${y}px`;
  div.style.left = `${x}px`;
  div.style.cursor = 'text';
  div.contentEditable = true;
  div.style.wordBreak = "break-word";
  div.style.whiteSpace = "pre-wrap";
  

  div.id = id;
  div.dataset.type = "text"


  canvasAreaSection.append(div)
  elements.push({id,type:"text",x,y,width:190,height:30,bgColor:"transparent",  rotation: 0})
  syncZIndex();
  renderLayers();
  selectElementById(div.id);


 
  div.addEventListener("input", () => {
  const elData = getElementDataById(div.id);
  if (!elData) return;
   
  div.style.height = "auto";
  const actualHeight = div.scrollHeight;

  div.style.height = `${actualHeight}px`;
  elData.height = actualHeight;
});


    // add selection functionality here.
   div.addEventListener("click",(e)=>{
    e.stopPropagation();
    selectElementById(div.id);
  })


    //  Add dragging functionality here.
  div.addEventListener("mousedown", (e) => {
  if (e.target !== div) return;
  if (div.id !== selectedElementId) return;

  if (isDragging) e.preventDefault();

  isDragging = true;

  dragStartX = e.clientX;
  dragStartY = e.clientY;

  const elData = getElementDataById(div.id);
  if (!elData) return;

  elementStartX = elData.x;
  elementStartY = elData.y;
});


})



// deselect everying click on canvas
canvasAreaSection.addEventListener('click', () => {
  canvasAreaSection.querySelectorAll(".selected").forEach(el => {
    el.classList.remove("selected");
    removeResizeHandles(el);
    el.querySelector(".rotate-handle")?.remove(); 
  });

  selectedElementId = null;
    propWidth.value = "";
  propHeight.value = "";
  propBg.value = "";
  propText.value = "";
  textProps.style.display = "none";
  renderLayers();


});





document.addEventListener("mousemove", (e) => {
  
  if (isResizing &&  selectedElementId) {
  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || !elData) return;

  const dx = e.clientX - resizeStartX;
  const dy = e.clientY - resizeStartY;

  let newWidth = startWidth;
  let newHeight = startHeight;
  let newX = startX;
  let newY = startY;

  if (resizeDirection.includes("r")) newWidth = startWidth + dx;
  if (resizeDirection.includes("l")) {
    newWidth = startWidth - dx;
    newX = startX + dx;
  }
  if (resizeDirection.includes("b")) newHeight = startHeight + dy;
  if (resizeDirection.includes("t")) {
    newHeight = startHeight - dy;
    newY = startY + dy;
  }

  // minimum size
  newWidth = Math.max(30, newWidth);
  newHeight = Math.max(30, newHeight);

  // canvas bounds
  const canvasRect = canvasAreaSection.getBoundingClientRect();
  newX = Math.max(0, newX);
  newY = Math.max(0, newY);

  if (newX + newWidth > canvasRect.width)
    newWidth = canvasRect.width - newX;

  if (newY + newHeight > canvasRect.height)
    newHeight = canvasRect.height - newY;

  // apply
  el.style.width = `${newWidth}px`;
  el.style.height = `${newHeight}px`;
  el.style.left = `${newX}px`;
  el.style.top = `${newY}px`;

  elData.width = newWidth;
  elData.height = newHeight;
  elData.x = newX;
  elData.y = newY;

  return; // prevent drag logic
}


   
if (isRotating && selectedElementId) {
  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || !elData) return;

  const dx = e.clientX - rotateCenterX;
  const dy = e.clientY - rotateCenterY;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  el.style.transform = `rotate(${angle}deg)`;
  elData.rotation = angle;

  return;
}




  if (!isDragging || !selectedElementId) return;

  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || !elData) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  let newX = elementStartX + dx;
  let newY = elementStartY + dy;

  
  const canvasRect = canvasAreaSection.getBoundingClientRect();

  const maxX = canvasRect.width - elData.width;
  const maxY = canvasRect.height - elData.height;

  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));


  el.style.left = `${newX}px`;
  el.style.top = `${newY}px`;


  elData.x = newX;
  elData.y = newY;
});




// stop everyting
document.addEventListener("mouseup", () => {
   isDragging = false;
  isResizing = false;
  isRotating = false;
  resizeDirection = null;
});




function addResizeHandles(el) {
  removeResizeHandles(el);

  const directions = ["tl", "tr", "bl", "br"];

  directions.forEach(dir => {
    const handle = document.createElement("div");
    handle.className = `resize-handle ${dir}`;
    handle.dataset.dir = dir;

    handle.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();

      isResizing = true;
      resizeDirection = dir;

      resizeStartX = e.clientX;
      resizeStartY = e.clientY;

      const elData = getElementDataById(selectedElementId);
      startWidth = elData.width;
      startHeight = elData.height;
      startX = elData.x;
      startY = elData.y;
    });

    el.appendChild(handle);
  });
}


function removeResizeHandles(el) {
  el.querySelectorAll(".resize-handle").forEach(h => h.remove());
}







// rotation helper function


function addRotateHandle(el) {
  const handle = document.createElement("div");
  handle.className = "rotate-handle";

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    e.preventDefault();

    isRotating = true;

    const rect = el.getBoundingClientRect();
    rotateCenterX = rect.left + rect.width / 2;
    rotateCenterY = rect.top + rect.height / 2;
  });

  el.appendChild(handle);
}





// layer panel helper function

const layersPanel = document.querySelector("#layers-panel");

function renderLayers() {
  layersPanel.innerHTML = "";

  // Topmost should appear at top of list (Figma-like)
  [...elements].reverse().forEach(elData => {
    const item = document.createElement("div");
    item.className = "layer-item";
    item.textContent = `${elData.type} (${elData.id})`;

    if (elData.id === selectedElementId) {
      item.classList.add("active");
    }

    item.addEventListener("click", () => {
      selectElementById(elData.id);
      renderLayers();
    });

    layersPanel.appendChild(item);
  });
}






function syncZIndex() {
  elements.forEach((elData, index) => {
    const el = document.getElementById(elData.id);
    if (el) {
      el.style.zIndex = index + 1;
    }
  });
}







// Move up & Move down logic


const layerUpBtn = document.querySelector("#layer-up");
const layerDownBtn = document.querySelector("#layer-down");

layerUpBtn.addEventListener("click", () => {
  if (!selectedElementId) return;

  const index = elements.findIndex(e => e.id === selectedElementId);
  if (index === -1 || index === elements.length - 1) return;

  [elements[index], elements[index + 1]] =
    [elements[index + 1], elements[index]];

  syncZIndex();
  renderLayers();
});

layerDownBtn.addEventListener("click", () => {
  if (!selectedElementId) return;

  const index = elements.findIndex(e => e.id === selectedElementId);
  if (index <= 0) return;

  [elements[index], elements[index - 1]] =
    [elements[index - 1], elements[index]];

  syncZIndex();
  renderLayers();
});






// properties panel handling for width

propWidth.addEventListener("input", () => {
  if (!selectedElementId) return;

  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || !elData) return;

  const value = Math.max(30, Number(propWidth.value));
  el.style.width = value + "px";
  elData.width = value;
});




// properties panel handling for height

propHeight.addEventListener("input", () => {
  if (!selectedElementId) return;

  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || !elData) return;

  const value = Math.max(30, Number(propHeight.value));
  el.style.height = value + "px";
  elData.height = value;
});



// properties panel handling for Background Color

propBg.addEventListener("input", () => {
  if (!selectedElementId) return;

  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || !elData) return;

  el.style.backgroundColor = propBg.value;
  elData.bgColor = propBg.value;
});





// properties panel handling for text-content

propText.addEventListener("input", () => {
  if (!selectedElementId) return;

  const el = document.getElementById(selectedElementId);
  const elData = getElementDataById(selectedElementId);
  if (!el || elData.type !== "text") return;

  el.textContent = propText.value;
});
