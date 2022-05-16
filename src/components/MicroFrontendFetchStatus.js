import React from 'react';
import { BannerAlertBox } from "@entur/alert";

export const MicroFrontendFetchStatus = props => {
  if (props.status !== 'SUCCESS' && props.status !== 'LOADING') {
    return (
      <BannerAlertBox
        title="Oops!!"
        variant="error"
      >
        {props.label || 'Error loading micro frontend'}
      </BannerAlertBox>
    );
  } else {
    return null;
  }
};
