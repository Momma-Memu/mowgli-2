import MoComponent from "../../index";
import styles from "./index.css?inline";
import template from "./index.html?raw";
import MowgliDateManager from "../../../managers/DateManager";
import MowgliChart from "../../../objects/internal/Chart";

// eslint-disable-next-line no-unused-vars
import MoModal from "../../modal/MoModal/index";

// eslint-disable-next-line no-unused-vars
import MoForm from "../../forms-fields/MoForm/index";

import Chart from 'chart.js/auto';
Chart.defaults.font.size = 16;
import enums from "./enums";

export default class MoChart extends MoComponent {
  #form = this.addState()
  #mobject = new MowgliChart();
  #isMobile = false;
  #dateManager = new MowgliDateManager();
  #chart = this.addState(null);
  #timeout;
  #interval;
  #chartEl;
  enums = JSON.parse(JSON.stringify(enums));

  constructor() {
    super(styles, template);
  }

  get editBtn() {
    return this.getElementById("edit");
  }

  get saveCSVBtn() {
    return this.getElementById("csv");
  }

  get saveImageBtn() {
    return this.getElementById("img");
  }

  get canvas() {
    return this.getElementById("mo-chart");
  }

  get chart() {
    return this.#chart.state;
  }

  set chart(chart) {
    this.#chart.state = chart;
  }

  get chartEl() {
    return this.#chartEl;
  }

  /** @type {MoModal} */
  get modal() {
    return this.getBySearch("mo-modal");
  }

  get modalBody() {
    return this.getElementById("modal-body");
  }

  /** @type {MoForm} */
  get form () {
    if (!this.#form.state) {
      this.#form.state = this.#mobject.buildForm();
    }

    return this.#form.state;
  }

  set form (form) {
    this.#form.state = form;
  }

  connectedCallback() {
    this.modalBody.appendChild(this.form);
    
    if (this.chart) {
      this.buildChart();
    }
    
    this.addListener("submit", (event) => this.#updateChart(event), this.getElementById("chart-modal"));
    this.addListener("click", () => this.#edit(), this.editBtn);
    this.addListener("click", () => this.#saveCSV(), this.saveCSVBtn);
    this.addListener("click", () => this.#saveImg(), this.saveImageBtn);
  }

  buildChart() {
    this.enums.line.options.onResize = (chart, size) => this.onResize(chart, size);
    this.enums.line.options.scales.x.title.text = this.chart.live ? "Real Time" : this.#getXtitle();
    this.enums.line.options.scales.y.title.text = this.chart.valueName;

    let colors = { 
      borderWidth: 1,
      borderColor: this.#borderColor(),
      backgroundColor: this.#backgroundColor()
    };

    if (this.chart.type.toLowerCase() === "line") {
      colors = { borderColor: this.enums.line.borderColor[0], backgroundColor: this.enums.line.backgroundColor[0]}
    } else if (this.chart.live && this.chart.type.toLowerCase() === "bar") {
      // this.enums.bar.options.scales.y.grace = "30%";
      colors = { 
        borderColor: this.enums.line.borderColor[0], 
        borderWidth: 1, 
        backgroundColor: this.enums.line.backgroundColor[0]
      }
    }
    
    // if (this.chart.type.toLowerCase() === "bar") {
    //   this.enums.line.options.scales.y.beginAtZero = true;
    // }

    if (this.chart.live) {
      // this.enums.line.options.scales.y.beginAtZero = true;

      this.#chartEl = new Chart(this.canvas, {
        type: this.chart.type.toLowerCase(),
        data: {
          labels: [],
          datasets: [{
            label: this.chart.name,
            data: [],
            fill: true,
            tension: 0.1,
            ...colors,
          }],
        },
        options: { ...this.enums.line.options, ...this.enums.bar.options },
        plugins: [{
          id: 'customCanvasBackgroundColor',
          beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#FFFFFF';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          }
        }],
      });

      this.#startLivePoll();
    } else {
      this.#chartEl = new Chart(this.canvas, {
        type: this.chart.type.toLowerCase(),
        data: {
          labels: this.#getLabels(),
          datasets: [{
            label: this.chart.name,
            data: this.#getDataPoints(),
            fill: true,
            tension: 0.1,
            ...colors,
          }],
        },
        options: this.enums.line.options,
        plugins: [{
          id: 'customCanvasBackgroundColor',
          beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#FFFFFF';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          }
        }],
      });
    }
  }

  async #startLivePoll() {
    let minHeight = null;
    let maxHeight = null;

    this.addInterval(5000, async () => {
      const [label, data] = await this.#getLiveRecord();

      if (minHeight === null || maxHeight === null) {
        minHeight = (Math.ceil(data / 5) * 5) - 5;
        maxHeight = (Math.floor(data / 5) * 5) + 5;
      } else if (data >= maxHeight) {
        maxHeight = (Math.floor(data / 5) * 5) + 5;
      }

      if (this.#chartEl.data.datasets[0].data.length >= 15) {
        this.#chartEl.data.labels.shift();
        this.#chartEl.data.datasets[0].data.shift();
        
        const nextMin = this.#chartEl.data.datasets[0].data[0];
  
        if (nextMin + 20 <= maxHeight) {
          minHeight = (Math.ceil(nextMin / 5) * 5) - 5;
        }
      }
  
      this.#chartEl.data.labels.push(label);
      this.#chartEl.data.datasets[0].data.push(data);

      this.#chartEl.config.options.scales.y.min = minHeight;
      this.#chartEl.config.options.scales.y.max = maxHeight;


      this.#chartEl.update();
    });
  }

  /** @returns {[string, number]} */
  async #getLiveRecord() {
    const [res, data] = await this.#mobject.get(`live?sourceId=${this.chart.source.sourceId}`);
    
    const label = new Date().toLocaleTimeString("en-US", { timeStyle: "medium" })
    const key = this.#getValueKey(data);

    return res.ok ? [label, data[key]] : [label, 0]
  }

  #getXtitle() {
    const from = new Date(this.chart.fromDate).toLocaleDateString();
    const to = new Date(this.chart.toDate).toLocaleDateString();
    return `Date Range: ${from} - ${to}`;
  }

  #getLabels() {
    return this.chart.data.map((point) => {
      const date = new Date((point.stamp_date))
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date.toLocaleDateString();
    });
  }

  #getDataPoints() {
    const valueKey = this.#getValueKey();

    return this.chart.data.map((point) => {
      return point[valueKey];
    });
  }

  /** @returns {string} */
  #getValueKey(point = null) {
    /*
      Sometimes, data is stored within the floatvalue key, other times it is in the intvalue. 
      Since we can't know which one it will be, we need to run this method to determine
      where the data is.
    */
    const dataPoint = point ? point : this.chart.data[0];
    return dataPoint.floatvalue ? "floatvalue" : "intvalue";
  }

  #backgroundColor() {
    return enums.backgroundColors;
  }

  #borderColor() {
    return enums.borderColors;
  }

  #edit() {
    this.form.patch(this.chart)
    this.modal.open();
  }

  #saveCSV() {
    const csvString = this.#getCSVHeaders() + "\n" + this.#getCSVRows();
    const blobUrl = URL.createObjectURL(new Blob([csvString], { type: "text/csv" }));
    
    this.#downloadFile(`${this.chart.name}.csv`, blobUrl);
  }

  #saveImg() {
    const fileName = `${this.chart.name}.jpg`;
    const image = this.#chartEl.toBase64Image('image/jpeg', 1);
    
    this.#downloadFile(fileName, image);
  }

  /** @returns {string} */
  #getCSVHeaders() {
    return `"Chart Name",Value,Date,"Data Source","Ignition Tag ID"`;
  }

  /** @returns {string} */
  #getCSVRows() {
    const key = this.#getValueKey();

    return this.chart.data.map(record => {
      const { tagid, stamp_date } = record;
      const { name, source } = this.chart;
      
      const date = this.#dateManager.toDateTimeString(stamp_date);
      
      return `"${name}","${record[key]}","${date}",${source.name},${tagid}`;
    }).join("\n");
  }

  #downloadFile(name, data) {
    const anchor = document.createElement("a");
    anchor.setAttribute("download", name);
    anchor.setAttribute("href", data);

    anchor.click();
  }

  async #updateChart() {
    const formData = this.form.values;
    await this.#mobject.put("", formData);

    if (!formData.pinned) {

      console.log(this.form.values)
      this.parentElement.remove();
    }
  }

  onResize(chart, size) {
    clearTimeout(this.#timeout);

    if (this.#isMobile !== size.width <= 500) {
      this.#timeout = setTimeout(() => {
        this.#isMobile = size.width <= 500;
        
        chart.options.scales.y.ticks.display = !this.#isMobile;
        chart.options.scales.y.title.display = !this.#isMobile;
        chart.options.scales.x.title.display = !this.#isMobile;
        
        chart.update();
      }, 500);
    }
  }
}

customElements.define("mo-chart", MoChart);
