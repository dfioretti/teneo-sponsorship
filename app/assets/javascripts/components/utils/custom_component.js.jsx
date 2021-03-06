var CustomComponent = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  componentWillMount: function() {
    this.setState({componentId: this.props.componentId, componentType: this.props.componentType});
    Dispatcher.componentDataGet(
      this.props.componentType,
      this.props.componentId,
      function(data) {
        this.setState({dataLoaded: true, componentData: data});
    }.bind(this));
  },
  componentWillUpdate: function() {
    console.log("will up");
  },
  getInitialState: function() {
    return { dataLoaded: false};
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({dataLoaded: false});
    this.setState({componentId: newProps.componentId, componentType: newProps.componentType});
    Dispatcher.componentDataGet(
      this.state.componentType,
      this.state.componentId,
      function(data) {
        this.setState({dataLoaded: true, componentData: data});
      }.bind(this));
  },
  renderBarChart: function() {
    return (
      <BarChart {...this.props} />
    );
  },
  renderLineChart: function() {
    return (
      <LineChart {...this.props} viewData={this.state.componentData}  />
    );
  },
  renderDoughnutChart: function() {
    return (
      <RoundChart {...this.props} type="doughnut" viewData={this.state.componentData}/>
    );
  },
  renderPieChart: function() {
    return (
      <RoundChart {...this.props} type="pie" viewData={this.state.componentData} />
    );
  },
  renderValueList: function() {
    return (
      <DataList {...this.props} type="value" viewData={this.state.componentData} />
    );
  },
  renderBarList: function() {
    return (
      <DataList {...this.props} type="bar" componentId="10"/>
    );
  },
  renderContent: function() {
    if (this.state.dataLoaded) {
      switch (this.state.componentType) {
        case 'barChart':
          return this.renderBarChart();
          break;
        case 'lineChart':
          return this.renderLineChart();
          break;
        case 'valueList':
          return this.renderValueList();
          break;
        case 'barList':
          return this.renderBarList();
          break;
        case 'doughnutChart':
          return this.renderDoughnutChart();
          break;
        case 'pieChart':
          return this.renderPieChart();
          break;
      }
    }
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var cssId = "top_global_issues";
    if (this.state.componentType == "lineChart")
      cssId = "teneo_rep_score";
    if (this.state.dataLoaded) {
      return (
        <div id={cssId} className="dashboard-module" style={hiddenStyle}>
            <div className="top">
              <div className="drag-handle"></div>
              <div className="top-title">{this.props.componentTitle}</div>
            </div>
            <div className="main">
              {this.renderContent()}
            </div>
        </div>
      );
    } else {
      return (
        <div className="dashboard-module"></div>
      );
    }
  }
});
