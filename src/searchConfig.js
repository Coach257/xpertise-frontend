
// elastic-search 连接配置文件，禁止修改

import "regenerator-runtime/runtime";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

const mainpaperconnector = new AppSearchAPIConnector({
  searchKey: "search-684zf3yeseg7dre8woc18f9d",
  engineName: "test",
  endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
})

const mainauthorconnector = new AppSearchAPIConnector({
  searchKey: "search-684zf3yeseg7dre8woc18f9d",
  engineName: "mainauthor",
  endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const cspaperconnector = new AppSearchAPIConnector({
  searchKey: "search-684zf3yeseg7dre8woc18f9d",
  engineName: "cspaper",
  endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const csauthorconnector = new AppSearchAPIConnector({
    searchKey: "search-684zf3yeseg7dre8woc18f9d",
    engineName: "csauthor",
    endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const csaffiliationconnector = new AppSearchAPIConnector({
    searchKey: "search-684zf3yeseg7dre8woc18f9d",
    engineName: "csaffiliation",
    endpointBase:"https://e633da92fd5c4462a16e73f4acb7e1b5.ent-search.asia-east1.gcp.elastic-cloud.com"
});


const mainpaperconfig = {
  debug: true,
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

const mainauthorconfig = {
  debug: true,
  apiConnector: mainauthorconnector,
  searchQuery: {
    disjunctiveFacets: [],
    facets: {
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

const csauthorconfig = {
  debug: true,
  apiConnector: csauthorconnector,
  searchQuery: {
    disjunctiveFacets: [],
    facets: {
    }
  }
};

const csaffiliationconfig = {
    debug: true,
    apiConnector: csaffiliationconnector,
    searchQuery: {
      disjunctiveFacets: [],
      facets: {
      }
    }
  };


export {mainpaperconfig,mainauthorconfig,cspaperconfig,csauthorconfig,csaffiliationconfig};
