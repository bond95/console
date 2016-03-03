/**
 * @fileoverview
 * Displays a formatted timestamp.
 */

angular.module('bridge.ui')
.directive('coTimestamp', function(moment) {
  'use strict';

  return {
    templateUrl: '/static/module/ui/timestamps/co-timestamp.html',
    restrict: 'E',
    replace: true,
    scope: {
      timestamp: '@',
    },
    link: function(scope, el, attrs) {
      attrs.$observe('timestamp', function(timestamp) {
        scope.invalidDate = false;
        // Ensure we're converting to local TZ first.
        var date = new Date(timestamp),
            mdate = moment(date);
        if (!mdate.isValid()) {
          scope.invalidDate = true;
          return;
        }
        scope.timestamp = date;
        scope.timestampUTC = mdate.utc().format('MMM DD, H:mm A z');
      });
    },
  };

});
