import React from "react";
const FailuarCard = () => {
  return (
    <div className="directory-failuar-card">
      <div className="failuar-card-main-div">
        <div className="failuar-Card-Imgplaceholder">
          <img
            className="image-failuar"
            src={
              "https://cdn-de1.staffbase.com/eyo-live-de/image/upload/v1709202637/Q5YilTDGmqmCdX90ORxxbLxW3HW5JUauCM7K3cwvuPEMPHbjQKCEIEQ9F9vdcnWM8QV8XUPilvyum42R5Ng01kvmBgFGssHbtCf086yA1VjNRX8CiVGyYhjzsaplWto93kdra0Wb5PQPwjJrGSa3jp6DJuSCTdEhFZNf56xQ87NJIxMZNrZh2q4Pxs8hdelG/no-found-icon.png"
            }
          />
        </div>
        <div className="failuar-InfoboxContent">
          <div className="failuar-card-title">No Results Found</div>
          <div className="failuar-card-para">
            Please reset a filter and try again
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailuarCard;
