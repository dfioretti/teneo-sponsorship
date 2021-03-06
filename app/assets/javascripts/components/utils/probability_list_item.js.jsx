var ProbabilityListItem = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillReceiveProps: function(newProps) {
    var bar = ReactDOM.findDOMNode(this.refs.bar);
    $(bar).animate({width: newProps.probability * 100}, 1000, function() {
      this.setState({loaded: true});
    }.bind(this));
  },
  showTooltip: function(e) {
    var tooltip = $('.li-tooltip');
    var top = $(e.target).offset().top - 50,
    left = $(e.target).offset().left - 45;

    if (tooltip.length < 1) {
      $('.dashboard').append(
        '<div class="li-tooltip" style="top:'+top+'px;left:'+left+'px;">' +
          'Click to see chart<div class="li-tooltip-arrow"></div>' +
        '</div>'
      );
    }
    tooltip.css({top: top, left: left});
    tooltip.show();
  },
  hideTooltip: function(e) {
    $('.li-tooltip').hide();
  },
  renderTooltip: function() {
    var tooltip;
    if (this.props.tooltip) {
      var link = '/ews/dashboard/' + this.props.companyId + '/detail';
      tooltip = (
        <Link to={link} className="li-tooltip-button" onMouseOver={this.showTooltip} onMouseLeave={this.hideTooltip}>
        </Link>
      );
    }
    return tooltip;
  },
  renderRightText: function() {
    var text;
    if (this.props.rightText) {
      text = (
        <div className="li-right-text">{this.props.rightText}</div>
      );
    }
    return text;
  },
  renderProbability: function() {
    var probabilityBar;
    if (this.props.probability) {
      var probabilityStyle = {backgroundColor: riskColor(this.props.probability)};
      if (this.state.loaded) {
        probabilityStyle.width = this.props.probability * 100;
      }
      probabilityBar = (
        <div className="li-probability-bkg">
          <div className="li-probability-bar" ref="bar" style={probabilityStyle}></div>
        </div>
      );
    }
    return probabilityBar;
  },
  render: function() {
    var link = '/ews/dashboard/' + this.props.companyId + '/detail',
    main;

    if (this.props.link) {
      main = (
        <Link to={link}>
          {this.renderProbability()}
          {this.renderRightText()}
          <div className="li-title">{this.props.title}</div>
        </Link>
      )
    } else {
      main = (
        <div>
          {this.renderProbability()}
          {this.renderRightText()}
          <div className="li-title">{this.props.title}</div>
        </div>
      );
    }
    return (
      <li className="probability-list-item">
        {main}
      </li>
    );
  }
});
