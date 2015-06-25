import Logistics from "../services/Logistics";

let logistics = new Logistics();

class ShopActions {
  setConfig(config) {
    this.dispatch(config);
  }

  getDeliveryPoint(account, deliverypointId) {
    this.dispatch();

    return logistics.getDeliveryPoint(account, deliverypointId)
      .done((deliveryPointData) =>
        this.actions.getDeliveryPointSuccess(deliveryPointData)
      )
      .fail((error) =>
        this.actions.getDeliveryPointFail(error)
      );
  }

  listDeliveryPoints(account) {
    this.dispatch();

    return logistics.listDeliveryPoints(account)
      .done((deliveryPointsList) =>
        this.actions.listDeliveryPointsSuccess(deliveryPointsList)
      )
      .fail((error) =>
        this.actions.listDeliveryPointsFail(error)
      );
  }

  getDeliveryPointSuccess(deliveryPointData) {
    this.dispatch(deliveryPointData);
  }

  getDeliveryPointFail(error) {
    this.dispatch(error);
  }

  listDeliveryPointsSuccess(deliveryPointsList) {
    this.dispatch(deliveryPointsList);
  }

  listDeliveryPointsFail(error) {
    this.dispatch(error);
  }

}

export default ShopActions;
