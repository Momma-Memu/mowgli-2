import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MowgliSession from "@/Mowgli/objects/internal/Session";

export default class MoNav extends MoComponent {
  constructor() {
    super(styles, template);
    this.authenticated = this.addInternal("authenticated");
  }

  connectedCallback() {
    const sessionObject = new MowgliSession();
    console.log(this.shadow.getElementById("body"));
    this.shadow.getElementById("session-body").appendChild(sessionObject.buildForm());
  }
}

customElements.define("mo-nav", MoNav);
