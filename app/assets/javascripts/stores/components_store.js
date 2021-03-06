/**
 * ComponentsStore holds all of the component definitions
 * with their cached data state.
 */
var ComponentsStore = Fluxxor.createStore({
  /**
   * @constructor
   */
  initialize: function() {
    this.components = {};
    this.loaded = false;
    this.bindActions(
      constants.SAVE_SUCCESS, this.loadComponents,
      constants.UPDATE_SUCCESS, this.loadComponents
    ),
    this.loadComponents();
  },
  /**
   * Loads all custom components, triggered on
   * init and by component save / update.
   */
  loadComponents: function() {
    this.loaded = false;
    ComponentClient.getComponents(function(data) {
      data.forEach(function(d) {
        this.components[d.id] = d;
      }.bind(this));
      this.loaded = true;
      this.emit("change");
    }.bind(this));
  },
  /**
   * Get a specific component.
   * @params {integer} cid - the component id
   * @return {Object} - the component
   */
  getComponent: function(cid) {
    return this.components[cid];
  },
  /**
   * Get all components
   * @return [] - all components
   */
  getComponents: function() {
    return this.components;
  }
});
window.ComponentsStore = new ComponentsStore();
