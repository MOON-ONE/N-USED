angular.module('app', ['ui.bootstrap', 'ngAnimate'], function($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})


.factory('sortable', ['$filter', '$rootScope', function($filter, $rootScope) {
        return function(scope, data, itemsPerPage, initSortingOrder) {

            scope.sortingOrder = initSortingOrder;
            scope.reverse = false;
            scope.filteredItems = [];
            scope.groupedItems = [];
            scope.itemsPerPage = itemsPerPage;
            scope.pagedItems = [];
            scope.currentPage = 1;
            scope.items = data;
            scope.maxSize = 5;

            var searchMatch = function(haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };


            // init the filtered items
            scope.search = function() {

                scope.filteredItems = $filter('filter')(scope.items, $rootScope.query);

                // take care of the sorting order
                if (scope.sortingOrder !== '') {
                    scope.filteredItems = $filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
                }

                scope.currentPage = 1;

                // now group by pages
                scope.groupToPages();

                // reset the total items for the pagination buttons
                scope.totalItems = scope.filteredItems.length;
            };


            // calculate page in place
            scope.groupToPages = function() {
                scope.pagedItems = [];

                for (var i = 0; i < scope.filteredItems.length; i++) {
                    if (i % scope.itemsPerPage === 0) {
                        scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [scope.filteredItems[i]];
                    } else {
                        scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
                    }
                }
            };


            scope.range = function(start, end) {
                var ret = [];
                if (!end) {
                    end = start;
                    start = 0;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                return ret;
            };


            // functions have been described process the data for display
            scope.search();


            // change sorting order
            scope.sort_by = function(newSortingOrder) {
                if (scope.sortingOrder == newSortingOrder)
                    scope.reverse = !scope.reverse;

                scope.sortingOrder = newSortingOrder;

                // call search again to make sort affect whole query
                scope.search();
            };

            scope.sort_by(initSortingOrder);
            scope.totalItems = scope.filteredItems.length;
        }

    }])
    .directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }})

    .controller('main', ['$scope', '$rootScope', 'sortable', '$http', function($scope, $rootScope, sortable, $http) {

        $scope.orderList = "MODULE_CODE";
        $scope.authorName = "authors";

        $rootScope.query = '';
        $scope.gridToggle = true;

        $scope.onQueryChange = function(val) {
            $rootScope.query = val;
            $scope.search();
        };

        var items = [{
            'MODULE_CODE': 'CS3240',
            'TITLE': 'Modelling Techniques and Concepts for a Corporate Application Framework (IBM eSSAF)',
            'EDITION': '1',
            'AUTHORS': 'AUTHOR 1, 2, 3, 4',
            'CONDITION': {
                'RANK': 10,
                'CHECKLIST': [true, false, false, false, true, false]
            },
            'DESCRIPTION': "Description here",
            'PRICE': 20,
            'SELLER_ID': "Uskdhiu63f"
        }];

        sortable($scope, items, 6, 'updated_at');
    }]);
