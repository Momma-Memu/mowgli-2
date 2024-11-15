import MowgliObject from "../../index";
import FieldDefinition from "../../../builders/FieldDefinition";
import MowgliSourceType from "./SourceType";

export default class MowgliSources extends MowgliObject {
  options = new MowgliSourceType();

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const description = new FieldDefinition("description", true, "Description", "text");
    const sourceName = new FieldDefinition("sourceName", true, "Source Type", "select", "Select a type", null, true, "source-options/types");
    const sourceValue = new FieldDefinition("sourceValue", true, "Source Value", "select", "Search...", null, true, "source-options/subtypes");
    const normalize = new FieldDefinition("normalized", true, "Normalize", "switch", "", null, false);
    const sourceId = new FieldDefinition("sourceId", true, "Source ID", "hidden", "", null, false, null, null, true);
    const fields = [
      name,
      description,
      sourceName,
      sourceValue,
      normalize,
    ];

    super("sources", fields, [...fields, sourceId]);

    sourceValue.hiddenIdField = sourceId;
    sourceName.options = this.options.stateArray;

    this.buildDependency(sourceName, sourceValue, "value", "apiParams");
    this.buildDependency(sourceValue, sourceId, "valueId", "value");

    window.mowgliSource = this;
  }
}
