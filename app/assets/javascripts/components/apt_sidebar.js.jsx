var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AptSidebar = React.createClass({
  renderTop: function() {
    return (
      <div className="top">
          <div className="top-title">{this.props.title}</div>
      </div>
    );
  },
  createComponent: function() {

  },
  renderContent: function() {
    return (
      <div className="menu-toggle-container">
      </div>
    )
  },
  toggleMenu: function() {
    $('#collapse-menu').slideToggle(250);
  },
  renderMenu: function() {
    var createLink = '/apt/dashboard_detail';
    var scoresLink = '/apt/scores/score_index';
    var assetSetLink = "/apt/scores/asset_set_index";
    var createScore = '/apt/scores/score_editor/1';
    var createAssetSets = '/apt/scores/asset_set_editor/1'
    //<button  style={{width: "100%"}} className="btn btn-primary">Create Component</button>

    return (
      <div className="hack-top">
      <div style={{margin: "10px"}}>
        <button onClick={this.toggleMenu}type="button" className="invisible-button"  aria-label="Menu Hamburger">
          <span style={{color: "white", fontSize: "22px", textAlign: "center"}}className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
        </button>
        <span style={{color: "white", lineHeight: "14px", letterSpacing: "1.5px", verticalAlign: "text-top", paddingLeft: "10px", fontSize: "14px"}}>MENU</span>
      </div>

      <div style={{width: "100%", backgroundColor: "#111316", display: "none"}}className="collapse" id="collapse-menu">
        <div style={{paddingLeft: "10px"}}className="sidebar-content">
          <br />
          <Link to={createLink}>
            Create Component
          </Link><br /><br />
        <Link to={createScore}>
          Create New Score
          </Link><br /><br />
          <Link to={scoresLink}>
            View Scores
          </Link><br /><br />
          <Link to={createAssetSets}>
            Create Asset Set
          </Link><br /><br />
          <Link to={assetSetLink}>
            View Asset Sets
          </Link><br /><br />
        </div>
      </div>
    </div>
    );
  },
  renderToggles: function() {
    var toggles = AssetModuleToggles;

    var toggles = $.map(toggles, function(name){
      var cn = "icon " + name,
      title = name.replace(/_/g, ' '),
      state = this.props.dashboardState,
      toggleValue;

      if (state[name])
        toggleValue = state[name]["toggle"];

      return (
        <li key={name}>
          <Toggle toggleValue={toggleValue} module={name} handleToggle={this.props.handleToggle}/>
          <div className={cn}>{title}</div>
        </li>
      );
    }.bind(this));
    return (
      <ul className="toggle-list">
        {toggles}
      </ul>
    );
  },
  render: function() {
    //{this.renderTop()}
    //{this.renderToggles()}

      return (
        <div className="sidebar">
          {this.renderMenu()}
          {this.renderContent()}
          <div className="module-toggle-container">
          </div>
          <div className="print-report">
            <ul>
              <li>
                <div className="gear"></div>
                <div className="icon print-report">Print Report</div>
              </li>
            </ul>
          </div>
        </div>
      );
  }

});
