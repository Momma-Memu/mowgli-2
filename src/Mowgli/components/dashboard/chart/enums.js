const commarize = (value) => {
  const min = 1e3;
  const units = ["k", "M", "B", "T"];

  if (value >= min) {
    const order = Math.floor(Math.log(value) / Math.log(1000));
    const unitName = units[(order - 1)];
    const num = (value / 1000 ** order);

    return num + unitName;
  }

  return value.toLocaleString();
}

const backgroundPlugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

const gridColor = "#c6c6c6";

const blue = {
  light: "hsla(200, 15%, 50%, 0.4)",
  dark: "hsl(200, 40%, 20%)",
  line: "hsl(200, 25%, 40%)"
};

const purple = {
  light: "hsla(240, 15%, 70%, 0.4)",
  dark: "hsl(240, 20%, 25%)",
  line: "hsl(240, 15%, 40%)"
};

const red = {
  light: "hsla(360, 30%, 60%, 0.4)",
  dark: "hsl(360, 60%, 30%)",
  line: ""
};

const brown = {
  light: "hsla(31, 20%, 50%, 0.4)",
  dark: "hsl(30, 30%, 30%)",
  line: "hsl(360, 40%, 50%)"
};

const green = {
  light: "hsla(155, 20%, 55%, 0.4)",
  dark: "hsl(155, 55%, 20%)",
  line: "hsl(155, 40%, 35%)"
};

const borderColors = [blue.dark, red.dark, purple.dark, brown.dark, green.dark];

const backgroundColors = [blue.light, red.light, purple.light, brown.light, green.light];

const lineColors = [blue.line, red.line, purple.line, brown.line, green.line];

const options = {
  responsive: true,
  resizeDelay: 500,
  
  plugins: {
    customCanvasBackgroundColor: { color: "#FFFFFF" },
    tooltip: {
      padding: 16,
      boxPadding: 8,
    },
    legend: { 
      labels: {
         boxWidth: 0, 
         boxHeight: 0 
        } 
    },
  },
  scales: {
    y: {
      grid: { color: gridColor }, 
      title: { display: true, padding: { top: 0, bottom: 0 }  }, 
      // title: { display: () => size.width <= 500, padding: { top: 0, bottom: 0 }  }, 

      ticks: { display: true, callback: (value) => commarize(value) }
    },
    x: {
      grid: { color: gridColor }, 
      title: { display: true, padding: { top: 0, bottom: 0 } }, 
      ticks: { display: false} },
      // ticks: { maxRotation: 0, minRotation: 0 } },
  },
  layout: { padding: { left: -2, right: 0, top: 0, bottom: 0 }}
}

export default {
  backgroundColors: backgroundColors,
  borderColors: borderColors,
  borderWidth: 1,
  defaults: {
    font: {
      size: 16,
      family: '"Noto Sans", sans-serif'
    }
  },
  bar: {
    options: {
      responsive: true,
      resizeDelay: 500,
      ...options,
    }
  },
  line: {
    borderColor: lineColors,
    backgroundColor: backgroundColors,
    plugins: [backgroundPlugin],
    options: {
      elements: {
        point: { borderWidth: 5, hoverRadius: 8, hitRadius: 10 },
        line: { borderWidth: 1 }
      },
      ...options,
    }
  }
};
