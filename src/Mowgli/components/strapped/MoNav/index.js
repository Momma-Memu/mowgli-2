import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MowgliSession from "../../../objects/internal/Session";
import MowgliCompany from "../../../objects/internal/Company";

// eslint-disable-next-line no-unused-vars
import MoNavLink from "../../navigation/MoNavLink/index";

export default class MoNav extends MoComponent {
  constructor() {
    super(styles, template);
    this.session = new MowgliSession();
    this.company = new MowgliCompany();
    this.authenticated = this.addInternal("authenticated");

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

  get userName() {
    return this.getByClass("user-info-name");
  }

  get userRole() {
    return this.getByClass("user-info-role");
  }

  get companyName() {
    return this.getByClass("company-name")
  }

  get modals() {
    return this.getElementsByName("mo-modal");
  }

  connectedCallback() {
    this.form = this.session.buildForm();
    this.modalBody.appendChild(this.form);
    this.addListener("click", (event) => this.#logoClick(event), this.getByClass("logo"));
    this.addListener("click", (event) => this.#logout(event), this.getByClass("logout"));
    this.#checkSession();
  }

  /** @param {Event} event  */
  #logoClick(event) {
    event.preventDefault();

    if (window.location.pathname !== "/dashboard") {
      this.redirect("/dashboard");
    }
  }

  /** @param {Event} event  */
  async #logout(event) {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const [res, _] = await this.session.delete();
    
    if (res.ok) {
      sessionStorage.clear();
      this.authenticated.state = false;
      this.redirect("/");
    }
  }

  #setChildren({ detail }) {
    this.navItems.forEach((nav) => {
      nav.active = detail === nav.href;
    });
  }

  async #submitForm() {
    const formData = this.form.values;
    await this.session.post("", formData);
    await this.#checkSession();
  }

  async #checkSession() {
    if (!this.session.state) {
      await this.session.get();
    }

    if (!this.company.state) {
      await this.company.get();
    }

    this.authenticated.state = Boolean(this.session.state);

    if (this.session.state) {
      this.userName.innerHTML = this.session.state.user.name;
      this.userRole.innerHTML = this.session.state.user.roles[0].name;
    }

    if (this.company.state) {
      this.companyName.innerHTML = this.company.state.name;
    }

    this.#handleRedirects();
  }

  #handleRedirects() {
    if (this.session.state && window.location.pathname === "/") {
      this.redirect("/dashboard");
    } else if (!this.session.state && window.location.pathname !== "/") {
      this.redirect("/");
    }
  }
}

customElements.define("mo-nav", MoNav);
