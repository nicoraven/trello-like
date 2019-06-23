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
}

customElements.define('trello-app', App);

const trelloApp = document.createElement('trello-app');

window.onload = () => {
    document.body.appendChild(trelloApp);
};