const Keyboard = {

    elements: {
        container: null,
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
        this.elements.container = document.createElement("div");
        this.elements.title = document.createElement("p");
        this.elements.textarea = document.createElement("textarea");

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.description = document.createElement("p");
        this.elements.language = document.createElement("p");

        // Add main elements
        this.elements.container.classList.add("container");
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
        this.elements.container.appendChild(this.elements.title);
        this.elements.container.appendChild(this.elements.textarea);
         
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.container.appendChild(this.elements.main);
        this.elements.container.appendChild(this.elements.description);
        this.elements.container.appendChild(this.elements.language);

        document.body.appendChild(this.elements.container);
        
        // Automatically use keyboard for elements
        document.querySelectorAll(".textarea").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "delete",
            "capsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shiftLeft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "arrowUp", "shiftRight",
            "controlLeft", "metaLeft", "altLeft", "space", "altRight", "arrowLeft", "arrowDown", "arrowRight", "controlRight",
        ];
    }
};