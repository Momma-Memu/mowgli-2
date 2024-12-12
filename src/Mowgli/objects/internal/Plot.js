import MowgliObject from "../index";
import FieldDefinition from "../../builders/FieldDefinition";

export default class MowgliPlot extends MowgliObject {
  constructor() {
    // const start = new FieldDefinition("start", true, "Starts At", "select");
    // start.options = [
    //   { id: "0", label: "12:00" },
    //   { id: "1", label: "1:00" },
    //   { id: "1", label: "1:00" },
    //   { id: "1", label: "1:00" },
    //   { id: "1", label: "1:00" },
    //   { id: "1", label: "1:00" },
    // ];


    super("plots", [
      new FieldDefinition("name", true, "Name", "text"),
      new FieldDefinition("start", true, "Starts At", "time", null, null, true),
      new FieldDefinition("duration", true, "Duration", "number", "Number of Hours", null, true),
    ]);
  
  }
}
