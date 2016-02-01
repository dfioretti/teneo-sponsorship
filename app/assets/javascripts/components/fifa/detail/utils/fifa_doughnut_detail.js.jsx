var FifaDoughnutDetail = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    this.chartId = uuid.v4();
  },
  componentDidUpdate: function () {
    this.renderChart(this.props);
  },
  backgroundColor: [
    '#cddc39',
    '#ff9801',
    '#2096f3',
    '#f44336',
    '#673ab7',
    '#124c93',
    '#50e3c2',
    '#26a162',
    '#e76959',
    '#218451',
    '#2d64a5'
  ],
  renderChart: function (props) {
    if (!props.data) return;

    var self = this;
    var data = this.props.data;

    data = _.map(data, function (dataset, i) {
      dataset.color = self.backgroundColor[i];
      return dataset;
    });

    // props.data.datasets[0].backgroundColor = _.clone(this.backgroundColor);

    var ctx = $("#" + this.chartId).get(0).getContext("2d");

    var doughnutChart = new Chart(ctx).Doughnut(data, {
      tooltipFontSize: 9,
      tooltipFillColor: 'rgba(255,255,255,0.6)',
      tooltipFontStyle: 'Avenir-Book',
      tooltipFontColor: '#333',
      animationEasing : "easeOutQuart",
      animateRotate: false,
      animateScale: true,
      animationSteps: 30
    });

  },
  renderLegend: function () {
    var data = this.props.data;
    var self = this;

    return _.map(data, function (pt, i) {
      var backgroundColor = self.backgroundColor[i];

      return(
        <li key={backgroundColor}>
          <span className="legend-droplet" style={{ borderColor: backgroundColor}}></span>
          <span>{pt.label}</span>
        </li>
      );
    });
  },
  render: function () {
    return(
      <div className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main">
          <div className="doughnut-main-container">
            <div className="doughnut-chart-container">
              <canvas id={this.chartId} width="201" height="201" style={{width: "201px", height: "201px"}}></canvas>
            </div>
            <ul className="doughnut-chart-legend">
              {this.renderLegend()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});