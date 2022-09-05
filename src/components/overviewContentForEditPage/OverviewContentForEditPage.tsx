import React from "react";
import EditProductBox from "../editProductBox/EditProductBox";
import EditDescriptionBox from "../editDescriptionBox/EditDescriptionBox";

import "./overviewContentForEditPage.css";
import EditInventoryDetailsBox from "../editInventoryDetailsBox/EditInventoryDetailsBox";

type Props = {};

const OverviewContentForEditPage = (props: Props) => {
  return (
    <div className="overviewEdit">
      <div className="overviewEdit__primaryDetails">
        <EditProductBox />
      </div>
      <div className="overviewEdit__description">
        <EditDescriptionBox />
      </div>
      <div className="overviewEdit__InventoryDetails">
        <EditInventoryDetailsBox />
      </div>
    </div>
  );
};

export default OverviewContentForEditPage;
