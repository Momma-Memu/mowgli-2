import MowgliObject from "../index";
import FieldDefinition from "@/Mowgli/builders/FieldDefinition";

export default class MowgliSession extends MowgliObject {
  constructor() {
    super("session", [
      new FieldDefinition("email", true, "Email", "email"),
      new FieldDefinition("password", true, "Password", "password")
    ]);
  }
}
