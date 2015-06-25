
function immutable(StoreModel) {
  StoreModel.config = {
    stateKey: 'state',

    setState: function setState(currentState, nextState) {
      this.state = nextState;
      return this.state;
    },

    getState: function getState(currentState) {
      return currentState;
    }

  };

  return StoreModel;
}

module.exports = immutable;
