import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";
import Source from "./sources/Source";

export default class MowgliChart extends MowgliObject {
  #source = new Source();

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    const type = new FieldDefinition("type", true, "Type", "select", null, null, true);
    const plotBy = new FieldDefinition("plotBy", true, "Plot By", "select", "", null, true);
    
    const prefix = new FieldDefinition("prefix", true, "Source", "select", "Select a Source", null);
    
    const live = new FieldDefinition("live", true, "Live Data", "switch", "", null, true);
    const pinned = new FieldDefinition("pinned", true, "Pin to Dashboard", "switch", "", null, true);

    const valueName = new FieldDefinition("valueName", true, "Value Name", "text", "", null);

    const from = new FieldDefinition("fromDate", true, "From Date", "date", "", null, true);
    const to = new FieldDefinition("toDate", true, "To Date", "date", "", null, true);

    super("charts", [
      name, type, plotBy, prefix, live, pinned, valueName, from, to,
    ]);

    type.options = [
      { id: "Line", displayName: "Line" },
      { id: "Bar", displayName: "Bar" }
    ];

    plotBy.options = [
      { id: "month", displayName: "Month" },
      { id: "day", displayName: "Day" },
      { id: "hour", displayName: "Hour" }
    ];

    prefix.options = this.#source.state;
    prefix.useValueID = true;

    window.mowgliCharts = this;
  }
}
