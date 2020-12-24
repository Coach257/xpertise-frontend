
// elastic-search 连接配置文件，禁止修改

import "regenerator-runtime/runtime";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

const mainpaperconnector = new AppSearchAPIConnector({
  searchKey: "search-i1mn5tfi52pkcce26rrizurg",
  engineName: "mainpaper",
  endpointBase:"https://d8ba07a128ce4a9ca573d1e60d5565fc.ent-search.asia-east1.gcp.elastic-cloud.com"
})

const mainauthorconnector = new AppSearchAPIConnector({
  searchKey: "search-i1mn5tfi52pkcce26rrizurg",
  engineName: "mainauthor",
  endpointBase:"https://d8ba07a128ce4a9ca573d1e60d5565fc.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const cspaperconnector = new AppSearchAPIConnector({
  searchKey: "search-i1mn5tfi52pkcce26rrizurg",
  engineName: "cspaper",
  endpointBase:"https://d8ba07a128ce4a9ca573d1e60d5565fc.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const csauthorconnector = new AppSearchAPIConnector({
    searchKey: "search-i1mn5tfi52pkcce26rrizurg",
    engineName: "csauthor",
    endpointBase:"https://d8ba07a128ce4a9ca573d1e60d5565fc.ent-search.asia-east1.gcp.elastic-cloud.com"
});

const csaffiliationconnector = new AppSearchAPIConnector({
    searchKey: "search-i1mn5tfi52pkcce26rrizurg",
    engineName: "csaffiliation",
    endpointBase:"https://d8ba07a128ce4a9ca573d1e60d5565fc.ent-search.asia-east1.gcp.elastic-cloud.com"
});


const mainpaperconfig = {
  debug: false,
  apiConnector: mainpaperconnector,
  searchQuery: {
    disjunctiveFacets: ["year", "lang","venue","authors"],
    facets: {
      year: {
        type: "value"
      },
      lang: {
        type: "value"
      },
      venue:{
        type:"value"
      },
      authors:{
        type:"value"
      }
    }
  }
};

const mainauthorconfig = {
  debug: false,
  apiConnector: mainauthorconnector,
  searchQuery: {
    disjunctiveFacets: [],
    facets: {
    }
  }
};

const cspaperconfig = {
  debug: false,
  apiConnector: cspaperconnector,
  searchQuery: {
    disjunctiveFacets: ["year", "venue","authors"],
    facets: {
      year: {
        type: "value"
      },
      venue: {
        type: "value"
      },
      authors:{
        type:"value"
      }
    }
  }
};

const csauthorconfig = {
  debug: false,
  apiConnector: csauthorconnector,
  searchQuery: {
    disjunctiveFacets: [],
    facets: {
    }
  }
};

const csaffiliationconfig = {
    debug: false,
    apiConnector: csaffiliationconnector,
    searchQuery: {
      disjunctiveFacets: [],
      facets: {
      }
    }
  };


export {mainpaperconfig,mainauthorconfig,cspaperconfig,csauthorconfig,csaffiliationconfig};
