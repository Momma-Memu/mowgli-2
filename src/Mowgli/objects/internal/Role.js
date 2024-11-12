import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliRole extends MowgliObject {
  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const description = new FieldDefinition("description", true, "Description", "text", null, null, false);
    const admin = new FieldDefinition("admin", true, "Administrator", "switch", null, null, false);

    super("roles", [
      name, description, admin,
    ]);
  }
}
