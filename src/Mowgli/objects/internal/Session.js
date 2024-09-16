import MowgliObject from "../index";
import FieldDefinition from "@/Mowgli/builders/FieldDefinition";
import MoForm from "../../components/forms-fields/MoForm/index";

export default class MowgliSession extends MowgliObject {
  #form = new MoForm();

  constructor() {
    super("session", [
      new FieldDefinition("email", true, "Email", "email"),
      new FieldDefinition("password", true, "Password", "password")
    ]);
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
