var DynamicComponent = React.createClass({
  mixins: [
    FluxMixin,
    ChartTooltipHandler,
    StoreWatchMixin("EditorPreviewStore")
  ],

  getStateFromFlux: function() {
    return flux.store("EditorPreviewStore").getState();
  },
  renderContent: function() {
    switch(this.props.component.view) {
      case 'barChart':
      case 'lineChart':
        return <SeriesChart {...this.props}  />
        break;
      case 'doughnutChart':
      case 'pieChart':
        return <RoundChart {...this.props} />
        break;
      case 'dataList':
      case 'valueList':
      case 'barList':
        return <DataList {...this.props} />
        break;
    }
  },
  render: function() {
    var editLink = "/apt/editor_component/" + this.props.component.id;
    //          <Link to={editLink} className="expand-handle"></Link>

    var componentStyle = "top_global_issues";
    if (this.props.component.view === 'lineChart' ||
          this.props.component.view === 'barChart') {
      componentStyle="chart-view";
    }
    return (
      <div id={componentStyle} className="dashboard-module">
        <div className="top">
          <Link to={editLink} className="edit-handle"></Link>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.component.name}</div>
        </div>
        <div className="main">
          {this.renderContent()}
        </div>
      </div>
    );
  }
});
