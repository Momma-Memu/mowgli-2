import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliUser extends MowgliObject {

  constructor() {
    const firstName = new FieldDefinition("firstName", true, "First Name", "text", null, null, true);
    const lastName = new FieldDefinition("lastName", true, "Last Name", "text", null, null, true);
    const email = new FieldDefinition("email", true, "Email", "email");
    const password = new FieldDefinition("password", true, "Password", "password");
    const confirmPassword = new FieldDefinition("confirmPassword", true, "Confirm Password", "password");
    const roles = new FieldDefinition("roles", true, "Role", "select", "Select a User Role", null, false, "roles");
    roles.useValueID = true;
    // const companyId = new FieldDefinition("companyId", false, "Company ID", "text");

    super("user", [firstName, lastName, email, password, confirmPassword, roles], [firstName, lastName, email, roles]);
  }
}
