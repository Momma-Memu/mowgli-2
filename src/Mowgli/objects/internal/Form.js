import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliForm extends MowgliObject {
  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const description = new FieldDefinition("description", true, "Description", "text", null, null, false);
    const roles = new FieldDefinition("roles", true, "Role", "select", "Select a User Role", null, false, "roles");
    roles.useValueID = true;

    const fields = new FieldDefinition("fields", true, "Fields", "multi-select", "Select at least one field(s)", null, false, "fields");
    fields.useValueID = true;

    super("forms", [
      name, description, roles, fields
    ]);
  }
}
