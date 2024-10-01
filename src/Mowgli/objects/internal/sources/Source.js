import MowgliObject from "../../index";
import FieldDefinition from "../../../builders/FieldDefinition";
import MowgliSourceType from "./SourceType";

export default class MowgliSources extends MowgliObject {
  options = new MowgliSourceType();

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const description = new FieldDefinition("description", true, "Description", "text");
    const sourceName = new FieldDefinition("sourceName", true, "Source Type", "select", "Select a type", null, true);
    const sourceValue = new FieldDefinition("sourceValue", true, "Source Value", "search-select", "Search...", null, true, "source-options/subtypes");
    const normalize = new FieldDefinition("normalized", true, "Normalize Data", "switch", "", null, false);
    const sourceId = new FieldDefinition("sourceId", true, "Source ID", "switch", "", null, false, null, null, true);

    super("sources", [
      name,
      description,
      sourceName,
      sourceValue,
      normalize,
    ]);

    sourceValue.hiddenIdField = sourceId;
    sourceName.options = this.options.state;

    this.buildDependency(sourceName, sourceValue, "value", "apiParams");
    this.buildDependency(sourceValue, sourceId, "valueId", "value");

    window.mowgliSource = this;
  }
}
