import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

export default class MoSearchSelect extends MoComponent {
  

  constructor() {
    super(styles, template);
  }
  
}

customElements.define("mo-search-select", MoSearchSelect);
