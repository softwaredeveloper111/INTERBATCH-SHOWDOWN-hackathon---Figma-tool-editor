
const rectBtn = document.querySelector("#rectangleIcon");
const textBtn = document.querySelector("#textIcon")
const canvasAreaSection = document.querySelector("#canvas")


const randomId = (length = 6) => {
  return Math.random().toString(36).substring(2, length + 2);
};


function selectElementById(id) {
  canvasAreaSection.querySelectorAll(".selected").forEach(el => {
    el.classList.remove("selected");
    removeResizeHandles(el);
  });

  const el = document.getElementById(id);
  if (!el) return;

  el.classList.add("selected");
  selectedElementId = id;

  addResizeHandles(el);
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
  elements.push({id,type:"rect",x,y,width:100,height:80,bgColor:"#4f8cff"})
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
  elements.push({id,type:"text",x,y,width:190,height:30,bgColor:"transparent"})
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
  });

  selectedElementId = null;
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


document.addEventListener("mouseup", () => {
  isDragging = false;
  isResizing = false;
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




