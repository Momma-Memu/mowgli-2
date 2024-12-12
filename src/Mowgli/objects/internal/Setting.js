import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliSetting extends MowgliObject {
  constructor() {
    super("session", [
      new FieldDefinition("autoLogout", true, "Logout When Closed", "switch"),
    ]);
  }
}

