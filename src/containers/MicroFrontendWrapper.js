import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AsyncActions, { sendData } from "../actions/AsyncActions";

const MicroFrontendWrapper = ({ dispatch, match, supplierList, children }) => {
  useEffect(() => {
    if (match.params.codespace) {
      const supplier = supplierList.find(
        (supplier) =>
          supplier.chouetteInfo.referential === match.params.codespace
      );
      if (supplier) {
        dispatch(sendData(supplier.id, "CHANGED_ACTIVE_PROVIDER"));
      }
    }
  }, [match, supplierList]);

  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  supplierList: state.asyncReducer.suppliers,
});

export default withRouter(connect(mapStateToProps)(MicroFrontendWrapper));
