export default /*@ngInject*/ function ($http) {
  let factory = {};

  factory.fetch = function () {
    return $http.get('http://api.love.sl/v2/outlets/').then(function (response) {
      return response.data;
    });
  };

  return factory;
}
