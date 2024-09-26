import MowgliObject from "../../index";
import FieldDefinition from "../../../builders/FieldDefinition";
import MoForm from "../../../components/forms-fields/MoForm/index";

// eslint-disable-next-line no-unused-vars
import MoSelect from "@/Mowgli/components/forms-fields/MoSelect/index";

export default class MowgliSources extends MowgliObject {
  #form = new MoForm();
  #options;

  constructor() {
    super("source-options", [
      new FieldDefinition("name", true, "Name", "text"),
      new FieldDefinition("description", true, "Description", "text"),
      // new FieldDefinition("type", true, "Source Type", "select", "", null, false, "source-options/types"),
      new FieldDefinition("type", true, "Source Type", "select", "Search...", null, false),
      // new FieldDefinition("source", true, "Source Value", "select", "", null, false, "sources/subtypes"),
    ]);

    // this.#fetchSourceTypes();
  }

  get form() {
    return this.#form;
  }

  /** @returns {FieldDefinition} */
  get sourceTypeField() {
    return this.fields[2];
  }

  /** @returns {MoForm} */
  buildForm() {
    this.#form.build(this.fields);
    return this.#form;
  }

  async #fetchSourceTypes() {
    // const queryString = this.buildQueryString({
    //   page: 0, 
    //   search: "tot",
    // });

    const [res, data] = await this.get(`types`);
    this.#options = data;
    // this.sourceTypeField.options = data;

    /** @type {MoSelect} */
    const typeField = this.form.fields.find(field => {
      return field.name === "type";
    });

    typeField.buildOptions(this.#options);

    return [res, data];

    // const [res, data] = await this.get(`subtypes/${'milling_1_1500'}` + queryString);
    // console.log(res, data);
  }
}
