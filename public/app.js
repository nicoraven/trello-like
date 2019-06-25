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
        this.callDb();
        this.addListeners();
    };

    // supposed to listen to input
    addListeners = () => {
        let create = this.shadowRoot.getElementById("new-list");
        create.addEventListener("keydown", this.createCard );
        create.addEventListener("blur", this.clearInput );
    };

    // retrieve data for initial render
    callDb = () => {
        let here = this;
        fetch('http://localhost:3000/cards')
            .then((cards) => {
                return cards.json();
            })
            .then(function(cards) {
                console.log(cards);
                // render each card
                cards.map(card => here.renderCard(card));
            });
    }

    // render card
    renderCard = (card) => {
        const newCard = document.createElement("trello-card");

        // pass card content from db to card
        newCard.setAttribute("id", card.id);
        newCard.setAttribute("title", card.title);
        newCard.setAttribute("description", card.description);
        newCard.setAttribute("columnId", card.columnId);

        // append card to app (bypass column for now)
        this.shadowRoot.getElementById("list-wrapper").appendChild(newCard);
    }

    // create new cards from user input
    createCard = (event) => {
        console.log(event.target.value);
        if (event.keyCode === 13) {
            // console.log("hello!");
            if (event.target.value.trim().length === 0) {
                return;
            }
            else {
                console.log("saving!", event.target.value);
                let cardTitle = event.target.value;
                // post then append child to dom?
            }

            // blur input to remove saved input
            this.shadowRoot.getElementById("new-list").blur();
        }

    }

    clearInput = () => {
        this.shadowRoot.getElementById("new-list").value = "";
    }

};

customElements.define("trello-app", App);

const trelloApp = document.createElement("trello-app");

window.onload = () => {
    document.body.appendChild(trelloApp);
};