import React from "react";

const Toast = ({ open = false, info, successMessage, errorMessage }) => {
  if (!open) return null;
  const Message = () => {
    if (successMessage) {
      return (
        <div className="alert alert-success">
          <span>{successMessage}</span>
        </div>
      );
    } else if (errorMessage) {
      return (
        <div className="alert alert-error">
          <span>{errorMessage}</span>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="toast toast-top toast-end">
        {info && (
          <div className="alert alert-info">
            <span>{info}</span>
          </div>
        )}
        <Message />
      </div>
    </>
  );
};

export default Toast;
