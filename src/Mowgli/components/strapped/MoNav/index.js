import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MowgliSession from "../../../objects/internal/Session";

export default class MoNav extends MoComponent {
  constructor() {
    super(styles, template);
    this.sessionObject = new MowgliSession();
    this.authenticated = this.addInternal("authenticated");
    this.addEventListener("closed", this.#resetForm);
    this.addEventListener("submit", this.#submitForm);
  }

  get signInForm() {
    return this.getElementById("sign-in");
  }

  connectedCallback() {
    this.signInForm.appendChild(this.sessionObject.buildForm());
  }

  #resetForm() {
    // console.log(event.target);
  }

  #submitForm() {
    const values = this.sessionObject.form.values;
    console.log(values)
    this.sessionObject.post("", values);
  }
}

customElements.define("mo-nav", MoNav);
