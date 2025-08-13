export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";

export const reviewRequestStatus = {
  ACCEPT: "accepted",
  REJECT: "rejected",
};

export const sendRequestStatus = {
  INTERESTED: "interested",
  IGNORED: "ignored",
};
