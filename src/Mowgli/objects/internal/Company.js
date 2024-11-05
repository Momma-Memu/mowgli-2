import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliCompany extends MowgliObject {
  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const description = new FieldDefinition("description", true, "Description", "text", null, null, false);
    const address = new FieldDefinition("address", true, "text", "Enter an address", null);
    // const logo = new FieldDefinition("logo", true, "logo", "file", "", null, true);

    super("company", [
      name, description, address, 
    ]);
  }
}
