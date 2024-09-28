import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";

import Chart from 'chart.js/auto';
Chart.defaults.font.size = 16;
import enums from "./enums";

export default class MoChart extends MoComponent {
  chart = null;

  constructor() {
    super(styles, template);
  }

  get canvas() {
    return this.getElementById("mo-chart");
  }

  connectedCallback() {
    if (this.chart) {
      this.buildChart();
    }
  }

  buildChart() {
    this.chartEl = new Chart(this.canvas, {
      type: this.chart.type,
      data: {
        labels: this.#getLabels(),
        datasets: [{
          label: this.chart.name,
          data: this.#getDataPoints(),
          fill: true,
          borderColor: enums.line.borderColor[0],
          // backgroundColor: this.#backgroundColor(),
          tension: 0.1
        }],
      },
      options: enums.line.options,
    });
  }

  #getLabels() {
    return this.chart.data.map((point) => {
      return new Date(Number(point.t_stamp)).toLocaleDateString();
    });
  }

  #getDataPoints() {
    const valueKey = this.#getValueKey();

    return this.chart.data.map((point) => {
      return point[valueKey];
    });
  }

  /** @returns {string} */
  #getValueKey() {
    /*
      Sometimes, data is stored within the floatvalue key, other times it is in the intvalue. 
      Since we can't know which one it will be, we need to run this method to determine
      where the data is.
    */
    const dataPoint = this.chart.data[0];
    return dataPoint.floatvalue ? "floatvalue" : "intvalue";
  }

  // #backgroundColor() {
  //   if (this.chart.type === "line") {
  //     return enums.backgroundColors[2];
  //   }
    
  //   return enums.backgroundColors;
  // }

  // #borderColor() {
  //   if (this.chart.type === "line") {
  //     return enums.borderColors[2];
  //   }
    
  //   return enums.borderColors;
  // }
}

customElements.define("mo-chart", MoChart);
