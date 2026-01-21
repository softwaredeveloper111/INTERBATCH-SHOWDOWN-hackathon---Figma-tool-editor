
const rectBtn = document.querySelector("#rectangleIcon");
const textBtn = document.querySelector("#textIcon")
const canvasAreaSection = document.querySelector("#canvas")


const randomId = (length = 6) => {
  return Math.random().toString(36).substring(2, length + 2);
};


function selectElementById(id) {

  canvasAreaSection.querySelectorAll(".selected")
    .forEach(el => el.classList.remove("selected"));

  const el = document.getElementById(id);
  if (!el) return;

  el.classList.add("selected");
  selectedElementId = id;
}
 
const elements = [];
let selectedElementId = null;
const base = 40;




let isDragging = false;

let dragStartX = 0;
let dragStartY = 0;

let elementStartX = 0;
let elementStartY = 0;


function getElementDataById(id) {
  return elements.find(el => el.id === id);
}




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
  selectElementById(div.id);
  elements.push({id,type:"rect",x,y,width:100,height:80,bgColor:"#4f8cff"})


 
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
  div.style.height = "30px";
  div.style.width = "190px";
  div.style.backgroundColor = "transparent";
  div.style.color=  'white'
  div.style.position = "absolute";
  div.style.top = `${y}px`;
  div.style.left = `${x}px`;
  div.style.cursor = 'text';
  div.contentEditable = true;


  div.id = id;
  div.dataset.type = "text"

  canvasAreaSection.append(div)
  selectElementById(div.id);
  elements.push({id,type:"text",x,y,width:190,height:30,bgColor:"transparent"})


    // add selection functionality here.
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



// deselect everying click on canvas
canvasAreaSection.addEventListener('click',(e)=>{
  canvasAreaSection.querySelectorAll(".selected")
  .forEach(el=>el.classList.remove("selected"))

  selectedElementId = null;
})


document.addEventListener("mousemove", (e) => {
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
});