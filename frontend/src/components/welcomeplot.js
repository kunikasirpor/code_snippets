import React, { useEffect, useRef } from 'react';
import Plot from 'plotly.js-dist-min';
import './styles/welcomechart.css';

const WelcomeChart = ({ snippets = [] }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    // Store the current ref value in a variable
    const currentContainer = chartContainer.current;
    if (!currentContainer) return;

    // Process data to count snippets by language
    const languageCounts = snippets.reduce((acc, snippet) => {
      if (!snippet.language) return acc;
      acc[snippet.language] = (acc[snippet.language] || 0) + 1;
      return acc;
    }, {});

    const hasData = Object.keys(languageCounts).length > 0;

    const data = hasData
      ? [{
          values: Object.values(languageCounts),
          labels: Object.keys(languageCounts),
          type: 'pie',
          hole: 0.4,
          marker: {
            colors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']
          },
          textinfo: 'percent',
          hoverinfo: 'label+value+percent'
        }]
      : [{
          values: [1],
          labels: ['No snippets yet'],
          type: 'pie',
          hole: 0.4,
          marker: { colors: ['#e0e0e0'] },
          textinfo: 'label'
        }];

    const layout = {
      margin: { t: 20, b: 20, l: 20, r: 20 },
      height: 250,
      showlegend: true,
      legend: {
        orientation: 'h',
        y: -0.2
      }
    };

    Plot.newPlot(currentContainer, data, layout, { 
      displayModeBar: false,
      responsive: true
    });

    // Cleanup function using the stored ref value
    return () => {
      if (currentContainer) {
        Plot.purge(currentContainer);
      }
    };
  }, [snippets]); // Only re-run when snippets change

  return <div ref={chartContainer} className="welcome-chart"></div>;
};

export default WelcomeChart;