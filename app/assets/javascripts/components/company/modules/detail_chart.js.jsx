var DetailChart = React.createClass({
  getInitialState: function() {
    return {graphId: uuid.v4(), compsShown: ['avg']}
  },
  componentWillMount: function() {

  },
  componentWillReceiveProps: function(newProps) {
    if (!newProps.companyData || !newProps.compData) {
      return;
    }

    var dataType = newProps.data.data_type;

    var companyData = $.map(newProps.companyData.reverse(), function(point) {
      if (typeof(point[dataType]) != "undefined") {
        return {x: new Date(point.date), y: point[dataType].toFixed(2)};
      }
    });

    var compData;
    var avg = {};

    compData = $.map(newProps.compData, function(v, k) {
      var data = $.map(v.reverse(), function(point) {
        if (typeof(point[dataType]) != "undefined") {
          var date = new Date(point.date),
          value = point[dataType];

          if (typeof(avg[date.getTime()]) != "undefined") {
            avg[date.getTime()][k] = value;
          } else {
            avg[date.getTime()] = {[k]: value};
          }

          return {x: date, y: value};
        }
      });

      return {name: k, data: data};
    });

    sortedKeys = [];
    for (var key in avg) {
      sortedKeys.push(key);
    }
    sortedKeys.sort(function(a1, a2) {
      return parseInt(a1) < parseInt(a2) ? -1 : 1
    });

    avgData = $.map(sortedKeys, function(v, i) {
      var sum = 0;
      var length = 0;
      $.each(avg[v], function(key, val) {
        sum += val;
        length++;
      });
      return {x: v, y: (sum / length).toFixed(2)}
    });

    var data = {
      series: [{
        name: newProps.company.name,
        data: companyData
      }, {
        name: "Industry Average",
        data: avgData
      }]
    }

    var options = {
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 8,
        labelInterpolationFnc: function(value) {
          return moment(value).format('MMM YYYY');
        }
      },
      axisY: {
      },
      showPoint: true,
      lineSmooth: false,
      fullWidth: true,
      chartPadding: 0,
    }

    var chart;

    this.setState({avg: avg, compData: compData, currentData: data});

    if (typeof(this.state.chart) == "undefined") {
      chart = new Chartist.Line('.ct-chart-'+this.state.graphId, data, options);
      this.setState({chart: chart}, function(){
        this.setupTooltip();
      }.bind(this));
    } else {
      this.state.chart.update(data);
    }

    chart.on('draw', function(data) {
      if(data.type === 'line') {
        data.element.animate({
          'stroke-dashoffset': {
            dur: 7000,
            from: 30000,
            to: 0
          }
        });
      }
    });
  },
  setupTooltip: function() {
    var $chart = $(this.state.chart.container);
    $chart.on("mouseleave", function(e) {
      $chart.find('.chart-tooltip').hide();
      $chart.find('.mouse-follow').hide();
    });

    $chart.on("mousemove", function(e) {
      var points = $chart.find('.ct-point');
      var closest = [points[0]];

      $.each(points, function(){
        if (closest == [] || Math.abs(this.x1.baseVal.value - e.offsetX) < Math.abs(closest[0].x1.baseVal.value - e.offsetX)) {
          closest = [this];
        } else if (Math.abs(this.x1.baseVal.value - e.offsetX) == Math.abs(closest[0].x1.baseVal.value - e.offsetX)) {
          closest.push(this);
        }
      });

      var $tooltip = $chart.find('.chart-tooltip'),
      date = new Date(parseInt(closest[0].getAttribute('ct:value').split(',')[0])),
      xOffset = $(closest[0]).position().left;

      if ($tooltip.length == 0) {
        $tooltip = $("<div class='chart-tooltip'>" +
          "<div class='tooltip-title'></div>" +
          "<div class='tooltip-body'></div>" +
          "</div>");
        $chart.append($tooltip);
      } else {
        $tooltip.show();
      }

      var $followLine = $chart.find('.mouse-follow');
      if ($followLine.length == 0) {
        $followLine = $("<div class='mouse-follow'></div>");
        $chart.append($followLine);
      } else {
        $followLine.show();
      }

      var body = $.map($.unique(closest), function(point) {
        var color = $(point).siblings('.ct-line').css('stroke');
        return (
          "<div class='point-value' style='color:"+color+";'>" +
            $(point).parent().attr('ct:series-name') + " : " + point.getAttribute('ct:value').split(',')[1]+
          "</div>"
        );
      });

      $followLine.css('left', xOffset);
      $tooltip.find('.tooltip-title').html(moment(date).format('M-D-YYYY'));
      $tooltip.find('.tooltip-body').html(body);

      var tooltipHeight = $tooltip.outerHeight(),
      tooltipWidth = $tooltip.outerWidth(),
      tooltipLeft,
      tooltipTop;

      if (xOffset + tooltipHeight >= $chart.outerWidth() - 50) {
        tooltipLeft = xOffset - tooltipWidth - 10;
      } else {
        tooltipLeft = xOffset + 10;
      }

      if (e.offsetY - tooltipHeight < -20) {
        tooltipTop = 0;
      } else {
        tooltipTop = e.offsetY - tooltipHeight;
      }

      $tooltip.css({left: tooltipLeft, top: tooltipTop});
    }.bind(this));
  },
  handleCheck: function(e) {
    var compsShown = this.state.compsShown,
    index = compsShown.indexOf(e.target.value),
    currentData = this.state.currentData;

    var data = $.map(this.state.compData, function(set) {
      if (set.name == e.target.value)
        return set;
    });

    if (e.target.checked) {
      compsShown.push(e.target.value);
      currentData['series'] = currentData['series'].concat(data);
    } else {
      compsShown.splice(index, 1);
      currentData['series'] = $.map(currentData['series'], function(s) {
        if (s.name != e.target.value) {
          return s;
        }
      });
    }

    this.state.chart.update(currentData);

    this.setState({compsShown: compsShown, currentData: currentData});
  },
  renderCompSelect: function() {
    var compIds = [],
    comps;

    if (typeof(this.props.fullCompany) != "undefined") {
      compIds = this.props.fullCompany.comps
    }

    if (typeof(this.state.compData) != "undefined") {
      comps = $.map(compIds, function(comp) {
        return (
          <li key={comp}><input type="checkbox" name={comp} value={comp} onChange={this.handleCheck} />{comp}</li>
        );
      }.bind(this));
    }

    return (
      <ul className="dropdown-menu" aria-labelledby="comp-dropdown">
        {comps}
      </ul>
    );
  },
  renderLegend: function() {
    var legendItems = $.map(this.state.compsShown, function(name) {
      if (name == 'avg') {
        return (<div className="other-legend"><span className="legend-color"></span>Industry Average</div>);
      }

      var colorStyle = {};
      $.each($(this.state.chart.container).find('.ct-series'), function(i, s) {
        if (s.getAttribute('ct:series-name') == name) {
          colorStyle['backgroundColor'] = $(s).find('.ct-line').css('stroke')
        }
      });
      return (
        <div className="other-legend"><span className="legend-color" style={colorStyle}></span>{name}</div>
      );
    }.bind(this));
    return (
      <div className="chart-legend">
        <div className="company-legend"><span className="legend-color"></span>{this.props.company.name}</div>
        {legendItems}
      </div>
    );
  },
  render: function() {
    var cn = "graph ct-chart-" + this.state.graphId;
    return (
      <div id="" className="detail-module detail-chart">
        <div className="top">
          <div className="filters">
            <div className="filter average-filter">Comps Average <span className="caret"></span></div>
            <div className="filter comp-filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Comps <span className="caret"></span></div>
            {this.renderCompSelect()}
          </div>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.data.data_type_display_name}</div>
        </div>
        <div className="main">
          {this.renderLegend()}
          <div id={this.state.graphId} className={cn}></div>
        </div>
      </div>
    );
  }
});
