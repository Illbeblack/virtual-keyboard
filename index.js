const Keyboard = {

    elements: {
        centralizer: null,
        title: null,
        textarea: null,
        main: null,
        keysContainer: null,
        keys: [],
        description: null,
        language: null
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Frame main elements
        this.elements.centralizer = document.createElement("div");
        this.elements.title = document.createElement("p");
        this.elements.textarea = document.createElement("textarea");

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.description = document.createElement("p");
        this.elements.language = document.createElement("p");

        // Add main elements
        this.elements.centralizer.classList.add("centralizer");
        this.elements.title.classList.add("title");
        this.elements.title.innerHTML = "Virtual Keyboard";
        this.elements.textarea.classList.add("textarea");
        this.elements.textarea.autofocus = true;
        this.elements.textarea.rows = "5";
        this.elements.textarea.cols = "50";
        this.elements.textarea.spellcheck = "false";
 
        this.elements.main.classList.add("keyboard", "keyboard__hidden"); //!keyboard--hidden
        this.elements.keysContainer.classList.add("keyboard__row", "row");//!keyboard--row
        this.elements.keysContainer.appendChild(this._createKeys());
 
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");
 
        // DOM
        this.elements.centralizer.appendChild(this.elements.title);
        this.elements.centralizer.appendChild(this.elements.textarea);
         
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.centralizer.appendChild(this.elements.main);
        this.elements.centralizer.appendChild(this.elements.description);
        this.elements.centralizer.appendChild(this.elements.language);
    }
}