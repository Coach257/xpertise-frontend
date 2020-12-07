import "regenerator-runtime/runtime";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

const connector = new AppSearchAPIConnector({
  searchKey: "search-rdojotjtma9h575b3urc8da8",
  engineName: "scholar",
  hostIdentifier: "host-w5ssjt"
});

const config = {
  debug: true,
  apiConnector: connector,
  searchQuery: {
    disjunctiveFacets: ["year", "doc_type"],
    facets: {
      year: {
        type: "value"
      },
      doc_type: {
        type: "value"
      },
    }
  }
};

export default config;
