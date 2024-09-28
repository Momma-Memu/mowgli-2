// // @ts-check

// export default class MoState extends MutationObserver {
//   #attributes = [];

//   /** @param {string[]} attributes  */
//   constructor(attributes) {
//     super((records) => {
//       this.#stateChanged(records);
//     });

//     this.#attributes = attributes || [];
//   }

//   /** @param {MutationRecord[]} state  */
//   #stateChanged(state) {
//     console.log(state);
//   }

//   // /** @param {HTMLElement} element  */
//   // addState (element, attributes=[], ) {
//   //   this.observe(element, { attributeFilter: this.#attributes });
//   // }
// }

export default class MoState {
  #state = null;

  constructor(data = null) {
    this.#state = data;
  }

  /** @returns {any} */
  get state() {
    return this.#state;
  }
  
  set state(state) {
    this.#state = state;
  }

  clean() {
    this.state = null;
  }
}