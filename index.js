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

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "delete", "enter", "shifrtRight"].indexOf(key) !== -1;

            // Attributes/clases
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("key");

            keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add("active");
              });
            
            keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove("active");
                });

            //  Switch key
            
            switch (key) {
                case "backspace":
                    keyElement.classList.add("backspace");
                    keyElement.innerHTML = "backspace";

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "delete":
                    keyElement.classList.add("delete");
                    keyElement.innerHTML = "del";

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(this.properties.value.length, 1);
                        this._triggerEvent("oninput");
                    });

                    break;    
                
                case "tab":
                    keyElement.classList.add("tab");
                    keyElement.innerHTML = "tab";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "    ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "capsLock":
                    keyElement.classList.add("capsLock");
                    keyElement.innerHTML = "capsLock";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                break;

                case "shiftLeft":
                    keyElement.classList.add("shiftLeft");
                    keyElement.innerHTML = "shift";
                    
                    break;
                
                case "arrowUp":
                    keyElement.classList.add("arrowUp");
                    keyElement.innerHTML = "▲";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▲";
                        this._triggerEvent("oninput");
                    });

                    break;
                
                case "shiftRight":
                    keyElement.classList.add("shiftRight");
                    keyElement.innerHTML = "shift";

                    break;

                case "enter":
                    keyElement.classList.add("enter");
                    keyElement.innerHTML = "enter";
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
    
                    break;
                
                case "controlLeft":
                    keyElement.classList.add("controlLeft");
                    keyElement.innerHTML = "ctrl";

                    break;

                case "metaLeft":
                    keyElement.classList.add("metaLeft");
                    keyElement.innerHTML = "win";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    break;

                case "altLeft":
                    keyElement.classList.add("altLeft");
                    keyElement.innerHTML = "alt";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    break;

                case "space":
                    keyElement.classList.add("space");
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
    
                    break;

                case "altRight":
                    keyElement.classList.add("altRight");
                    keyElement.innerHTML = "alt";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("active", this.properties.capsLock);
                    });

                    break;

                case "arrowLeft":
                    keyElement.classList.add("arrowLeft");
                    keyElement.innerHTML = "◄";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "◄";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "arrowDown":
                    keyElement.classList.add("arrowDown");
                    keyElement.innerHTML = "▼";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▼";
                        this._triggerEvent("oninput");
                    });

                    break;
                
                case "arrowRight":
                    keyElement.classList.add("arrowRight");
                    keyElement.innerHTML = "►";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "►";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "controlRight":
                    keyElement.classList.add("controlRight");
                    keyElement.innerHTML = "ctrl";

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
    
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        } 
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (!key.classList.contains("backspace") && !key.classList.contains("tab") && !key.classList.contains("delete") &&
                !key.classList.contains("capsLock") && !key.classList.contains("enter") && !key.classList.contains("shiftLeft") && 
                !key.classList.contains("shiftRight") && !key.classList.contains("controlLeft") && !key.classList.contains("metaLeft") &&
                !key.classList.contains("altLeft") && !key.classList.contains("altRight") && !key.classList.contains("controlRight")) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard__hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard__hidden");
    }
};

// Display on the page

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    Keyboard.open("dcode ", function (currentValue) {
        console.log("value changed! here it is: " + currentValue);
    }, function (currentValue) {
        console.log("keyboard closed! Finishing value: " + currentValue);
    })

    document.onkeypress = function (e) {
        console.log(e.code);
    }

    let keys = document.querySelectorAll('.key');
    let spaceKey = document.querySelector('.space');
    let shift_left = document.querySelector('.shiftLeft');
    let shift_right = document.querySelector('.shiftRight');
    let caps_lock_key = document.querySelector('.capsLock');

    for (let i = 0; i < keys.length; i++) {
        keys[i].setAttribute('keyname', keys[i].innerText);
        keys[i].setAttribute('lowerCaseName', keys[i].innerText.toLowerCase());
    }

    console.log(keys);

    window.addEventListener('keydown', function(e) {
        for(let i = 0; i < keys.length; i++) {
            if(e.key == keys[i].getAttribute('keyname' ) || e.key == keys[i].getAttribute('lowerCaseName' )) {
                keys[i].classList.add('active');
            }
            if (e.code == 'space') {
                spaceKey.classList.add('active'); 
            }
            if (e.code == 'shiftLeft') {
                shift_right.classList.remove('active');
            }
            if (e.code == 'shiftRight') {
                shift_left.classList.remove('active');
            }
            if (e.code == 'capsLock') {
                caps_lock_key.classList.toggle('active');
                console.log(e.code)
            }
        }    
    });

    window.addEventListener('keyup', function(e) {
        for(let i = 0; i < keys.length; i++) {
            if(e.key == keys[i].getAttribute('keyname' ) || e.key == keys[i].getAttribute('lowerCaseName' )) {
                keys[i].classList.remove('active');
            }  
            if (e.code == 'space') {
                spaceKey.classList.remove('active'); 
            }
            if (e.code == 'shiftLeft') {
                shift_right.classList.remove('active'); 
            }
            if (e.code == 'shiftRight') {
                shift_left.classList.remove('active'); 
            }
        }
    });
});