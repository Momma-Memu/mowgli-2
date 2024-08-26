// @ts-check
"use strict";

import MoInternal from "./utils/MoInternal.js";
import MoListener from "./utils/MoListener.js";
import MoAttribute from "./utils/MoAttribute.js";
// eslint-disable-next-line no-unused-vars
import { KeyboardCode } from "./enums/KeyCodes.js";

export default class MoComponent extends HTMLElement {
  /** @type {ShadowRoot} */
  #shadow;

  /** @type {Object.<string, MoInternal>} */
  #moInternals = {};

  /** @type {ElementInternals} */
  #internals;

  /** @type {MoListener[]} */
  #listeners = [];

  /** @type {function} */
  #onCreate;

  /**
   * @param {string | null} [styles=""]
   * @param {string | null} [template=""]
   * @param {ShadowRootMode} [mode="open"]
   */
  constructor(styles = "", template = "", mode = "open") {
    super();

    this.#internals = this.attachInternals();
    this.#shadow = this.attachShadow({ mode: mode });
    // this.#getFiles(styles, template);
    this.render(styles, template);
  }

  // ================== Getter / Setter Methods ==================

  /** @returns {ShadowRoot} */
  get shadow() {
    return this.#shadow;
  }

  get onCreate() {
    return this.#onCreate;
  }

  /** @param {function} callback */
  set onCreate(callback) {
    if (typeof callback === "function") {
      this.#onCreate = callback;
    } else {
      throw new Error("On Create LifeCycle requires that the given param be a function.");
    }
  }

  // ============== MoComponent's Lifecycle Methods ==============

  disconnectedCallback() {
    this.#listeners.forEach((listener) => listener.clean());
    this.#listeners = [];
  }

  // ====================== Public Methods ======================

  /**
   * @param {string} id
   * @returns {Element | null} */
  getElementById(id) {
    return this.shadow.querySelector(`#${id}`);
  }

  /**
   * @param {string} className
   * @returns {Element | null} */
  getByClass(className) {
    return this.shadow.querySelector(`.${className}`);
  }

  /**
   * @param {string} name
   * @returns {Element | null} */
  getSlotByName(name) {
    return this.shadow.querySelector(`slot[name='${name}']`);
  }

  /**6
   * @param {string | null} styles
   * @param {string | null} template
   */
  render(styles = "", template = "") {
    this.shadow.innerHTML = `<style>
      *, *:before, *:after, :host { 
        box-sizing: border-box !important; 
        }
      ${styles || ""}
    </style>
    ${template || ""}`;
  }

  /**
   * @param {string} name
   * @param {HTMLElement} element
   * @returns {MoAttribute}
   */
  addAttribute(name, element = this) {
    return new MoAttribute(element, name);
  }

  /**
   * @param {string} name
   * @returns {MoInternal}
   */
  addInternal(name) {
    this.#moInternals[name] = new MoInternal(name, this.#internals);
    return this.#moInternals[name];
  }

  /**
   * This method will add an EventListener onto a specified element,
   * and will return a class instance to interface with that event.
   *
   * - The EventListener will automatically be cleanup up on your behalf.
   * - TIP: Callbacks that are not bound may lose context, use an anonymous arrow
   * function instead.
   * @param {keyof HTMLElementEventMap} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {HTMLElement} element
   */
  addListener(type, listener, element = this) {
    // const listener = () => callback();
    this.#listeners.push(new MoListener(element, type, listener));
    element.addEventListener(type, listener);
  }

  /**
   * Listens for a keyboard event, and if it matches code the specified
   * code, such as "Enter", it will prevent propogation and perform
   * one of two actions. Any Events with a non-matching code are
   * ignored and are allowed to propogate up the DOM.
   *
   * - When a callback method is supplied, it will be invoked.
   * - When a callback method is NOT suppplied, the Event's "target" element
   * will be programmatically clicked.
   * - TIP: Callbacks that are not bound may lose context, use an anonymous arrow
   * function instead.
   *
   * @param {KeyboardEvent} event
   * @param {keyof KeyboardCode} code
   * @param {function | undefined} callback
   */
  keyUpHandler(event, code, callback = undefined) {
    if (event.code === code) {
      event.stopPropagation();
      if (event.target && event.target instanceof HTMLElement) {
        if (callback) {
          callback();
        } else {
          event.target.click();
        }
      }
    }
  }

  // ====================== Private Methods ======================

  #callOnLoadCallback() {
    if (typeof this.#onCreate === "function") {
      this.#onCreate();
    }
  }
}
