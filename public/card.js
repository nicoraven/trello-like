class Card extends HTMLElement {
    constructor() {
        super();

        //create the shadow root
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        // create css
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./app.css">';

        // const app = document.getElementById('app');
        const template = document.getElementsByTagName("template")[1];
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.setCardContents();
    }

    setCardContents = () => {
        for (let i = 0; i < this.attributes.length; i++) {
            switch (this.attributes[i].name) {
                case "id":
                    this.shadowRoot.querySelector("div").id = this.attributes[i].value;
                    break
                case "title":
                    this.shadowRoot.getElementById("card-title").innerText = this.attributes[i].value;
                    break
                case "description":
                    this.shadowRoot.getElementById("card-description").innerText = this.attributes[i].value;
                    break
                case "columnId":
                    this.shadowRoot.querySelector("div").setAttribute("columnId", this.attributes[i].value);
                    break
                default:
                    break;
            }
        }
    }
}

customElements.define("trello-card", Card);