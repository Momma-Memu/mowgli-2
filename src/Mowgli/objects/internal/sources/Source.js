import MowgliObject from "../../index";
import FieldDefinition from "../../../builders/FieldDefinition";
import MoForm from "../../../components/forms-fields/MoForm/index";

// eslint-disable-next-line no-unused-vars
// import MoSelect from "@/Mowgli/components/forms-fields/MoSelect/index";
import MowgliSourceType from "./SourceType";

export default class MowgliSources extends MowgliObject {
  #form = new MoForm();
  options = new MowgliSourceType();

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text");
    const description = new FieldDefinition("description", true, "Description", "text");
    const type = new FieldDefinition("type", true, "Source Type", "select", "Search...", null, false);

    super("sources");
    // new FieldDefinition("name", true, "Name", "text"),
    // new FieldDefinition("description", true, "Description", "text"),
    // new FieldDefinition("type", true, "Source Type", "select", "", null, false, "source-options/types"),
    // new FieldDefinition("type", true, "Source Type", "select", "Search...", null, false),
    // new FieldDefinition("source", true, "Source Value", "select", "", null, false, "sources/subtypes"),
    // ]);

    this.fields = [name, description, type];
    type.options = this.options.state;
  }

  get form() {
    return this.#form;
  }

  /** @returns {MoForm} */
  buildForm() {
    this.#form.build(this.fields);
    return this.#form;
  }
}
