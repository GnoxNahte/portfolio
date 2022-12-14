import 'package:flutter/cupertino.dart';

class UrlRouteInformationParser extends RouteInformationParser<List<RouteSettings>> {
  @override
  Future<List<RouteSettings>> parseRouteInformation(
    RouteInformation routeInformation) {
    final uri = Uri.parse(routeInformation.location!);

    if (uri.pathSegments.isEmpty) {
      return Future.value(([const RouteSettings(name: '/')]));
    }

    final routeSettings = uri.pathSegments
        .map((pathSegment) => RouteSettings(
              name: '/$pathSegment',
              arguments: pathSegment == uri.pathSegments.last
                  ? uri.queryParameters
                  : null,
            ))
        .toList();

    return Future.value(routeSettings);
  }

  @override
  RouteInformation restoreRouteInformation(List<RouteSettings> configuration) {
    final location = configuration.last.name;
    //final arguments = _restoreArguments(configuration.last);

    //return RouteInformation(location: '$location$arguments');
    return RouteInformation(location: location);
  }

  //String _restoreArguments(RouteSettings routeSettings) {
  //  if (routeSettings.name != '/projects') return '';
  //
  //  return '?id=${(routeSettings.arguments as Map)['id'].toString()}';
  //}
  

}