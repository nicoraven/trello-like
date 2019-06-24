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
        // console.log("connected!");
        // this.addListeners();
        this.callDb();
    };

    // supposed to listen to input
    addListeners = () => {
        let ele = this.shadowRoot.getElementById("testing");
        ele.addEventListener("click", this.callDb );
    };

    // retrieve data for initial render
    callDb = () => {
        let here = this;
        fetch('http://localhost:3000/cards')
            .then(function(response) {
                return response.json();
            })
            .then(function(cards) {
                // render each card
                cards.map(card => here.createCard(card));
            });
    }

    // render card
    createCard = (card) => {
        const newCard = document.createElement("trello-card");

        // pass card content from db to card
        newCard.setAttribute("id", card.id);
        newCard.setAttribute("title", card.title);
        newCard.setAttribute("description", card.description);
        newCard.setAttribute("columnId", card.columnId);

        // append card to app (bypass column for now)
        this.shadowRoot.getElementById("list-wrapper").appendChild(newCard);
    }

};

customElements.define("trello-app", App);

const trelloApp = document.createElement("trello-app");

window.onload = () => {
    document.body.appendChild(trelloApp);
};