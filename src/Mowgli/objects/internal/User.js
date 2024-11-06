import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliChart extends MowgliObject {

  constructor() {
    const firstName = new FieldDefinition("firstName", true, "First Name", "text");
    const lastName = new FieldDefinition("lastName", true, "Last Name", "text");
    const email = new FieldDefinition("email", true, "Email", "email");
    const password = new FieldDefinition("password", true, "Password", "password");
    const confirmPassword = new FieldDefinition("confirmPassword", true, "Confirm Password", "password");
    const companyId = new FieldDefinition("companyId", false, "Company ID", "text");

    super("user", [
      firstName, lastName, email, password,  confirmPassword, companyId
    ]);
  }
}
