export default class MowgliError extends Error {
  constructor(name, description) {
      super(description.replace(/  +/g, ''));
      this.name = "Mowgli" + name + "Error";
  }
}