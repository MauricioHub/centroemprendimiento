export class ChartDB {
  public static support1HACC = {
    chart: {
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#7759de'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    series: [{
      name: 'series1',
      data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
    }],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName) => ''
        }
      },
      marker: {
        show: false
      }
    }
  };
  public static support2HACC = {
    chart: {
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4680ff'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    series: [{
      name: 'series1',
      data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
    }],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName) => ''
        }
      },
      marker: {
        show: false
      }
    }
  };
  public static support3HACC = {
    chart: {
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#11c15b'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    series: [{
      name: 'series1',
      data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
    }],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName) => ''
        }
      },
      marker: {
        show: false
      }
    }
  };
  public static satisfactionHACC = {
    chart: {
      height: 260,
      type: 'pie',
    },
    dataLabels: {
      enabled: false
    },
    series: [66, 50, 40, 30],
    labels: ['Very Poor', 'Satisfied', 'Very Satisfied', 'Poor'],
    legend: {
      show: true,
      offsetY: 50,
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#4680ff',
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 320,

        },
        legend: {
          position: 'bottom',
          offsetY: 0,
        }
      }
    }]
  };
}
