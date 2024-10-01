import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliChart extends MowgliObject {

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const type = new FieldDefinition("type", true, "Type", "select");
    const prefix = new FieldDefinition("prefix", true, "Source", "select", "Select a Source", null, true);

    const live = new FieldDefinition("live", true, "Live Data", "switch", "", null, true);
    const pinned = new FieldDefinition("pinned", true, "Pin to Dashboard", "switch", "", null, true);

    const plotBy = new FieldDefinition("plotBy", true, "Plot By", "switch", "", null, true);
    const valueNames = new FieldDefinition("valueNames", true, "Value Name", "text", "", null, true);

    const from = new FieldDefinition("fromDate", true, "From Date", "date", "", null, true);
    const to = new FieldDefinition("toDate", true, "To Date", "date", "", null, true);


    super("charts", [
      name, type, prefix, live, pinned, plotBy, valueNames, from, to,
    ]);

    window.mowgliCharts = this;
  }
}
