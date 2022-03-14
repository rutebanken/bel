import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AsyncActions from "../actions/AsyncActions";

const MicroFrontendWrapper = ({ dispatch, match, supplierList, children }) => {
  console.log(match);

  useEffect(() => {
    if (match.params.codespace) {
      const supplier = supplierList.find(
        (supplier) =>
          supplier.chouetteInfo.referential === match.params.codespace
      );
      console.log(supplier);
      if (supplier) {
        console.log(supplier.id);
        dispatch(AsyncActions.getProviderStatus(supplier.id));
      }
    }
  }, [match, supplierList]);

  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  supplierList: state.asyncReducer.suppliers,
});

export default withRouter(connect(mapStateToProps)(MicroFrontendWrapper));
