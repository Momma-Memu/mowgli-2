import MowgliObject from "../../index";
import FieldDefinition from "../../../builders/FieldDefinition";
import MowgliSourceType from "./SourceType";

export default class MowgliSources extends MowgliObject {
  options = new MowgliSourceType();

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text");
    const description = new FieldDefinition("description", true, "Description", "text");
    const type = new FieldDefinition("type", true, "Source Type", "select", "Select a type", null, false);
    const tag = new FieldDefinition("tag", true, "Source Value", "search-select", "Search...", null, false, "source-options/subtypes");
    const normalize = new FieldDefinition("normalize", true, "Normalize Data", "switch", "", null, false);

    super("sources", [name, description, type, tag, normalize]);

    type.options = this.options.state;
    this.buildDependency(type, tag, "apiParams");
    // type.addDependentField(tag);
    // tag.addControllingField(type);
    window.mowgliSource = this;
  }
}
