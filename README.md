# 🎨 Figma-Style Design Editor (Vanilla JavaScript)

A **Figma-inspired visual design editor** built using **pure HTML, CSS, and Vanilla JavaScript**, focusing on **DOM manipulation, event handling, coordinate calculations, and state management** — without using Canvas, SVG, or any frameworks.

---

## 🚀 Live Demo
🔗 *[(click for redirect in live link)](https://softwaredeveloper111.github.io/INTERBATCH-SHOWDOWN-hackathon---Figma-tool-editor/)*

---

## 🎯 Project Objective

The objective of this project is to build a **basic visual design editor** similar in spirit to **Figma**, implemented entirely using **standard DOM elements**.

The focus is on:
* Strong frontend fundamentals
* Clean and correct logic
* Mouse & keyboard interactions
* Maintainable vanilla JavaScript code

> ❌ No frameworks  
> ❌ No Canvas  
> ❌ No SVG  
> ❌ No external JavaScript libraries  

---

## 🛠️ Tech Stack

* 🧱 **HTML5**
* 🎨 **CSS3**
* ⚙️ **Vanilla JavaScript (ES6)**
* 💾 **localStorage** (for persistence)

---

## ✨ Core Features

### 🟦 1. Element Creation
* Create **Rectangles** and **Text elements**
* Each element:
  * Is a simple `<div>`
  * Has a unique ID
  * Has default size and position
  * Stores metadata in a central state

---

### 🎯 2. Single Element Selection
* Only **one element can be selected at a time**
* Selected element shows:
  * Outline
  * Resize handles (corners only)
  * Rotation handle
* Clicking on the canvas deselects the element

---

### 🖱️ 3. Dragging
* Mouse-based dragging
* Movement restricted within canvas boundaries
* Real-time position updates

---

### 📐 4. Resizing
* Resizing allowed only from **four corner handles**
* Minimum size enforced
* Canvas boundaries respected
* DOM and internal state stay in sync

---

### 🔄 5. Rotation
* Rotation using a dedicated rotate handle
* Angle calculated using mouse position
* Rotation preserved on:
  * Save & Load
  * Export

---

### 🎛️ 6. Properties Panel
Editable properties for the selected element:

* Width
* Height
* Background color
* Text content (text elements only)
* 🎨 **Text color** *(extra enhancement)*

✔ Changes update the DOM instantly  
✔ Internal state updates immediately  

---

### 🧱 7. Layers Panel
* Vertical list of all elements
* Click layer → select element on canvas
* **Move Up / Move Down** controls
* Layer order synced using `z-index`
* Internal order preserved for save/load/export

---

### ⌨️ 8. Keyboard Interactions
* ⬅️ ➡️ ⬆️ ⬇️ **Arrow keys** → move selected element by **5px**
* ❌ **Delete key** → remove selected element
* Keyboard actions:
  * Work only when an element is selected
  * Respect canvas boundaries

---

### 💾 9. Save & Load (Persistence)
* Layout automatically saved to **localStorage**
* Page refresh restores:
  * Elements
  * Position
  * Size
  * Rotation
  * Layer order
  * Text content
  * Text color

---

### 📤 10. Export Functionality

#### 📄 Export as JSON
* Downloads internal layout data
* Includes:
  * Position
  * Size
  * Rotation
  * Background color
  * Text content
  * Text color
  * Layer order

#### 🌐 Export as HTML
* Generates a standalone HTML file
* Uses **inline styles**
* Visually reproduces the canvas layout
* No dependencies required

---

## 🧠 Architecture & State Management

* Central state stored in:
  ```js
  elements[]



* Runtime element structure:
  > {
  id,
  type,
  x,
  y,
  width,
  height,
  bgColor,
  rotation
}


* Persistence & export extend this with:
  > text,
textColor


* This separation ensures:
  
  * Clean runtime logic
  * Safe persistence
  * Accurate export output


#### ⭐ Enhancements (Beyond Requirements)

* 🎨 Text color control
* ⌨️ Keyboard shortcuts
* 🔄 Stable save/load behavior
* 🧩 Clean state synchronization
* 🧼 UI consistency improvements



#### 🧪 How to Run Locally
> `<!--  # Clone the repository -->`
> `git clone <your-repository-url>`
> `# Open index.html directly in the browser`

No build step required.



#### 🧑‍⚖️ Evaluation Focus
This project was evaluated on:
 * Correctness
 * Code clarity
 * DOM fundamentals
 * Event handling
 * State synchronization
 * Maintainability


#### 📄 License
This project is created for educational and evaluation purposes only.




### 🙌 Final Note
* This project demonstrates a strong understanding of:
* Vanilla JavaScript fundamentals
* DOM-based UI architecture
* Event-driven programming
* Real-world editor behavior




#### ⭐ If you found this project interesting, feel free to explore or build upon it!

> 
`---`

### ✅ You can now:
* Paste this directly into `README.md`
* Commit
* Push
* Submit confidently

If you want, I can also:
* shorten this for a **hackathon submission**
* write a **1-paragraph project description**
* or make a **portfolio-optimized README**

Just tell me.
