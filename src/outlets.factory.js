export default /*@ngInject*/ function ($http) {
  let factory = {};

  factory.fetch = function () {
    return $http.get('http://api.love.sl/v2/outlets/').then(function (response) {
      factory.all = response.data;
      return response.data;
    });
  };

  factory.byRegion = function (id) {
    if (!factory._byRegion) {
      factory._byRegion = {};
    }

    if (!factory._byRegion[id]) {
      factory._byRegion[id] = factory.all.filter((outlet) => outlet.region_id.indexOf(id) !== -1);
    }

    return factory._byRegion[id];
  };

  return factory;
}
