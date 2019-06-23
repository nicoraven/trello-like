console.log("loading app.js");

class App extends HTMLElement {
    constructor() {
        super();
        this.columns =[];
        this.cards = [];

        //create the shadow root
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        // create css
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./app.css">';

        // const app = document.getElementById('app');
        const template = document.getElementsByTagName("template")[0];
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("connected!");
        this.addListeners();
    };

    addListeners = () => {
        let ele = this.shadowRoot.getElementById("testing");
        ele.addEventListener("click", this.callDb );
    };

    callDb = () => {
        // let res = db.all();
        fetch('http://localhost:3000/cards')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(JSON.stringify(myJson));
            });
    }

};

customElements.define("trello-app", App);

const trelloApp = document.createElement("trello-app");

window.onload = () => {
    document.body.appendChild(trelloApp);
};