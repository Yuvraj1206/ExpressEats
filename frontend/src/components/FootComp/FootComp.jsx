import React from "react";
import "./FootComp.css";

const FootComp = () => {
  return (
    <div className="foot">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <div className="mb-3 mb-md-0 text-body-secondary pl-4 ">
            © 2024 Express Eats, Inc
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <div className="mb-3 mb-md-0 text-body-secondary pl-4 ">
            created by @yuvraj_saha
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FootComp;
