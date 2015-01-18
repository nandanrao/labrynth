(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("labrynth.html",
    "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 5000 3000\">\n" +
    "	 <rect stroke=\"#000000\" stroke-miterlimit=\"10\" width=\"5000\" height=\"3000\"/>\n" +
    "	 <room ng-repeat=\"room in logBook\"></room>\n" +
    " </svg>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("components/door.html",
    "<rect ng-attr-x=\"{{ x }}\" ng-attr-y=\"{{ y }}\" fill=\"#FFFFFF\" ng-attr-width=\"{{ w }}\" ng-attr-height=\"{{ h }}\"/>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplates"); }
catch(err) { module = angular.module("ngTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("components/room.html",
    "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" ng-attr-x=\"{{ x }}\" ng-attr-y=\"{{ y }}\" width=\"107\" height=\"107\" viewBox=\"0 0 107 107\" xml:space=\"preserve\">\n" +
    "	<rect x=\"3.5\" y=\"3.5\" fill=\"{{ RoomCtrl.getColor() }}\" stroke=\"#8E8E8E\" stroke-width=\"7\" stroke-miterlimit=\"10\" width=\"100\" height=\"100\"/>\n" +
    "	<door ng-repeat=\"door in room.doors\" direction=\"{{ door.dir }}\">\n" +
    "	</door>\n" +
    "</svg>");
}]);
})();
