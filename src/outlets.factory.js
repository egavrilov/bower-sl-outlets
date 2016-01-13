export default /*@ngInject*/ function ($http, $q, $timeout) {
  let factory = {};
  let fetchInProgress;

  factory.fetch = () => fetchInProgress ? factory.fetching : fetch();

  factory.getOutlets = () =>
    $q.when(factory.all || $http.get('http://api.love.sl/v2/outlets/').then(function (response) {
      factory.all = response.data;
      return response.data;
    }));

  factory.byRegion = (id) => {
    if (!factory._byRegion) {
      factory._byRegion = {};
    }

    if (!factory._byRegion[id]) {
      factory._byRegion[id] = factory.all.filter((outlet) => outlet.region_id.indexOf(id) !== -1);
    }

    return factory._byRegion[id];
  };

  function fetch() {
    fetchInProgress = true;
    factory.fetching = factory.getOutlets();

    $timeout(() => {
      factory.fetching.finally(() => {
        factory.fetching = null;
        fetchInProgress = false;
      });
    });

    return factory.fetching;
  }

  return factory;
}
