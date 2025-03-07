import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliForm extends MowgliObject {
  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    name.disableWhitespace = true;
    const type = new FieldDefinition("type", true, "Type", "select", "Select a Field Type", null, true, null, [ 
      { id: "text", name: "Text"}, 
      { id: "number", name: "Number"}, 
      { id: "select", name: "Select" }, 
      { id: "date", name: "Date" }, 
      { id: "switch", name: "Switch" }, 
      { id: "email", name: "Email" }
    ]);
    type.useValueID = true;

    const label = new FieldDefinition("label", true, "Label", "text", "", "", true);
    const placeholder = new FieldDefinition("placeholder", true, "Placeholder", "text", "", "");
    const defaultValue = new FieldDefinition("defaultValue", false, "Default Value", "text", "", "");
    const required = new FieldDefinition("required", true, "Required", "switch", null, null, true);
    const halfWidth = new FieldDefinition("halfWidth", true, "Half Width", "switch", null, null, true);

    super("fields", [
      name, type, label, placeholder, defaultValue, required, halfWidth
    ], [name, label, placeholder, type, required]);
  }
}
