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
    tooltip: {
      padding: 16,
      boxPadding: 8,
    }
  },

  scales: {
    y: {
      grid: {
        color: gridColor,
      },
      // beginAtZero: true,
    },
    x: {
      grid: {
        color: gridColor,
      },
    },
  }
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
      scales: {
        y: {
          grid: {
            color: gridColor
          },

        },
        x: {
          grid: {
            color: gridColor
          }
        }
      }
    }
  },
  line: {
    borderColor: lineColors,
    options: {
      elements: {
        point: { borderWidth: 5, hoverRadius: 8, hitRadius: 10 },
        line: { borderWidth: 1 }
      },
      ...options,
    }
  }
};
