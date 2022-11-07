export const getEnvironment = () => {
  if (
    window.location.hostname === "operator.entur.org" ||
    window.location.hostname === "ent-bel-prd.web.app"
  ) {
    return "prod";
  } else if (
    window.location.hostname === "operator.staging.entur.org" ||
    window.location.hostname === "ent-bel-tst.web.app"
  ) {
    return "test";
  } else {
    return "dev";
  }
};
