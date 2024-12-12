import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliChart extends MowgliObject {
  /** @type {FieldDefinition} */
  #live;

  /** @type {FieldDefinition} */
  #type;
  
  /** @type {FieldDefinition} */
  #plotBy;
  
  /** @type {FieldDefinition} */
  #from;

  /** @type {FieldDefinition} */
  #to;

  constructor() {
    const name = new FieldDefinition("name", true, "Name", "text", "", "");
    
    const valueName = new FieldDefinition("valueName", true, "Value Name", "text", "", null);
    const type = new FieldDefinition("type", true, "Type", "select", null, null, true);

    const plotBy = new FieldDefinition("plotBy", true, "Plot By", "select", "", null, true, "plots");
    
    const prefix = new FieldDefinition("source", true, "Source", "select", "Select a Source", null, true, "sources");
    const role = new FieldDefinition("roles", true, "Role", "select", "Select a Role", null, true, "roles");
    
    const live = new FieldDefinition("live", true, "Live Data", "switch", "", null, true);
    const pinned = new FieldDefinition("pinned", true, "Pin to Dashboard", "switch", "", null, true);


    const from = new FieldDefinition("fromDate", true, "From Date", "date", "", null, true);
    const to = new FieldDefinition("toDate", true, "To Date", "date", "", null, true);

    type.options = [
      { id: "Line", label: "Line" },
      { id: "Bar", label: "Bar" }
    ];

    plotBy.options = [
      { id: "month", label: "Month" },
      { id: "day", label: "Day" },
      { id: "hour", label: "Hour" }
    ];

    prefix.useValueID = true;
    role.useValueID = true;
    plotBy.useValueID = true;

    super("charts", 
      [ name, type, plotBy, prefix, role, live, pinned, valueName, from, to ], 
    );

    this.#live = live;
    this.#type = type;
    this.#plotBy = plotBy;
    this.#from = from;
    this.#to = to;

    this.buildDependency(live, from, "value", "value", () => this.liveCB());
    this.buildDependency(live, to, "value", "value",  () => this.liveCB());
    this.buildDependency(live, type, "value", "value",  () => this.liveCB());
    this.buildDependency(live, plotBy, "value", "value",  () => this.liveCB());

    window.charts = this;
  }

  liveCB() {
    // const dateStr = new Date().toISOString().split("T")[0];
    const state = this.#live.field.value;

    this.#type.field.fieldEl.required = !state;
    this.#plotBy.field.fieldEl.required = !state;
    this.#from.field.fieldEl.required = !state;
    this.#to.field.fieldEl.required = !state;


    this.#type.field.required = !state;
    this.#plotBy.field.required = !state;
    this.#from.field.required = !state;
    this.#to.field.required = !state;

    this.#type.field.disabled = state;
    this.#plotBy.field.disabled = state;
    this.#from.field.disabled = state;
    this.#to.field.disabled = state;

    this.#plotBy.field.value = state ? "Instant" : "";
    this.#plotBy.field.valueId = state ? "Instant" : "";
    this.#type.field.value = state ? "Bar" : "";
    this.#type.field.valueId = state ? "Bar" : "";


    this.#from.field.value = state ? "" : "";
    this.#to.field.value = state ? "" : "";
  }

  #getPlots() {
    const staticOptions = [
      { id: "month", label: "Month" },
      { id: "day", label: "Day" },
      { id: "hour", label: "Hour" }
    ];

    // this.#
    this.#plotBy.options = staticOptions.concat();
  }
}
