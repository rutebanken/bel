export const getEnvironment = () => {
  if (window.location.hostname === "operator.entur.org") {
    return "prod";
  } else if (window.location.hostname === "operator.staging.entur.org") {
    return "test";
  } else {
    return "dev";
  }
};
