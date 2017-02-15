<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>Popup</title>
    <!--
    <link rel="stylesheet" href="https://openlayers.org/en/v3.20.1/css/ol.css" type="text/css">
    -->
    <link rel="stylesheet" href="src/v4_dist/ol.css" />
    <link rel="stylesheet" href="src/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" href="src/font-awesome/css/font-awesome.css" />
    <link rel="stylesheet" href="css/popup.css" type="text/css"/>
    <link rel="stylesheet" href="css/map.css" type="text/css"/>
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>

    <!--
        <script src="https://openlayers.org/en/v3.20.1/build/ol.js"></script>
    -->

    <script src="src/v4_dist/ol.js"></script>
    <script src="src/jquery/jquery.js"></script>
    <script src="src/bootstrap/js/bootstrap.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Farmers Maps</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-globe" style="color: white"></i>&nbsp;&nbsp;Tools <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="map.getView().setCenter(center); map.getView().setZoom(zoom); return false;"><i class="fa fa-arrows-alt"></i>&nbsp;&nbsp;Zoom To Full Extent</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--/.navbar-collapse -->
        </div>
        <div id="map" class="map">
            <div id="popup" class="ol-popup">
                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
        </div>
    </form>
    <script src="js/map.js"></script>
    <script src="js/interactions.js"></script>
    <script src="js/popup.js"></script>
</body>
</html>
