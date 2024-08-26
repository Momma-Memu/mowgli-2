import MowgliObject from "../index";
import FieldDefinition from "@/Mowgli/builders/FieldDefinition";
import MoForm from "../../components/forms-fields/MoForm/index";

export default class MowgliSession extends MowgliObject {
  constructor() {
    super("session", [
      new FieldDefinition("email", true, "Email", "email"),
      new FieldDefinition("password", true, "Password", "password")
    ]);
  }

  buildForm() {
    const form = new MoForm();
    form.build(this.fields);
    return form;
  }
}
