
const rectBtn = document.querySelector("#rectangleIcon");
const textBtn = document.querySelector("#textIcon")
const canvasAreaSection = document.querySelector("#canvas")


const randomId = (length = 6) => {
  return Math.random().toString(36).substring(2, length + 2);
};
 
const elements = [];
let selectedElementId = null;
const base = 40;


// functionality add on click on rectangle button

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

  selectedElementId = div.id;
  canvasAreaSection.append(div)
  elements.push({id,type:"rect",x,y,width:100,height:80,bgColor:"#4f8cff"})
  
})



// functionality add on click on text  button

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

  selectedElementId = div.id;
  canvasAreaSection.append(div)
  elements.push({id,type:"text",x,y,width:190,height:30,bgColor:"transparent"})

})