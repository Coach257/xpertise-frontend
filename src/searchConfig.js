import "regenerator-runtime/runtime";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

const mainpaperconnector = new AppSearchAPIConnector({
  searchKey: "search-684zf3yeseg7dre8woc18f9d",
  engineName: "test",
  endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
})

const cspaperconnector = new AppSearchAPIConnector({
  searchKey: "search-684zf3yeseg7dre8woc18f9d",
  engineName: "cspaper",
  endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const mainpaperconfig = {
  debug: false,
  apiConnector: mainpaperconnector,
  searchQuery: {
    disjunctiveFacets: ["year", "lang"],
    facets: {
      year: {
        type: "value"
      },
      lang: {
        type: "value"
      },
    }
  }
};

const cspaperconfig = {
  debug: true,
  apiConnector: cspaperconnector,
  searchQuery: {
    disjunctiveFacets: ["year", "venue"],
    facets: {
      year: {
        type: "value"
      },
      venue: {
        type: "value"
      },
    }
  }
};

const mainauthorconfig = {
  debug: true,
  apiConnector: mainauthorconfig,
  searchQuery: {
    disjunctiveFacets: [],
    facets: {
    }
  }
};

const csauthorconfig = {
  debug: true,
  apiConnector: csauthorconfig,
  searchQuery: {
    disjunctiveFacets: [],
    facets: {
    }
  }
};

export {mainpaperconfig,cspaperconfig};
