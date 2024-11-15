import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";
import Source from "./sources/Source";

export default class MowgliChart extends MowgliObject {
  #source = new Source();

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    
    const valueName = new FieldDefinition("valueName", true, "Value Name", "text", "", null);
    const type = new FieldDefinition("type", true, "Type", "select", null, null, true);

    const plotBy = new FieldDefinition("plotBy", true, "Plot By", "select", "", null, true);
    
    const prefix = new FieldDefinition("source", true, "Source", "select", "Select a Source", null, true, "sources");
    const role = new FieldDefinition("roles", true, "Role", "select", "Select a Role", null, true, "roles");
    
    const live = new FieldDefinition("live", true, "Live Data", "switch", "", null, true);
    const pinned = new FieldDefinition("pinned", true, "Pin to Dashboard", "switch", "", null, true);


    const from = new FieldDefinition("fromDate", true, "From Date", "date", "", null, true);
    const to = new FieldDefinition("toDate", true, "To Date", "date", "", null, true);


    super("charts", 
      [ name, type, plotBy, prefix, role, live, pinned, valueName, from, to ], 
    );

    type.options = [
      { id: "Line", displayName: "Line" },
      { id: "Bar", displayName: "Bar" }
    ];

    plotBy.options = [
      { id: "month", displayName: "Month" },
      { id: "day", displayName: "Day" },
      { id: "hour", displayName: "Hour" }
    ];

    // if (this.#source.state) {
    //   this.#getAsyncData();
    // }
    
    // prefix.options = this.#source.stateArray;
    prefix.useValueID = true;
    role.useValueID = true;
  }

  // async #getAsyncData(prefix) {

  //   if (!this.#source.state) {
      
  //   }

  //   prefix.options = this.#source.stateArray;
  //   prefix.useValueID = true;
  // }
}
