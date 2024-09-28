import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MowgliSession from "../../../objects/internal/Session";

// eslint-disable-next-line no-unused-vars
import MoNavLink from "../../navigation/MoNavLink/index";

export default class MoNav extends MoComponent {
  constructor() {
    super(styles, template);
    this.sessionObject = new MowgliSession();
    this.authenticated = this.addInternal("authenticated");
    this.authenticated.state = this.sessionObject.state || false;

    this.addListener("closed", this.#resetForm);
    this.addListener("submit", this.#submitForm);
    this.addListener("mo-route-event-notify-siblings", this.#setChildren);
  }

  get modalBody() {
    return this.getElementById("sign-in");
  }

  /** @returns {MoNavLink[]} */
  get navItems() {
    return this.getElementsByName("mo-nav-link");
  }

  connectedCallback() {
    this.form = this.sessionObject.buildForm();
    this.modalBody.appendChild(this.form);
  }

  #setChildren({ detail }) {
    this.navItems.forEach(nav => {
      nav.active = detail === nav.href;
    });
  }

  #resetForm() {
    // console.log(event.target);
  }

  async #submitForm() {
    const formData = this.form.values;
    const [res, data] = await this.sessionObject.post("", formData);

    if (res.ok && data) {
      this.authenticated.state = true;
      this.emitEvent(this.createEvent("mo-route-event", "/dashboard"));
    }

    console.log(res.ok, data);
  }
}

customElements.define("mo-nav", MoNav);
