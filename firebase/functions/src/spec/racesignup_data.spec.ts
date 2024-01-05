
export const realRacesignupFile = `
<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
<title>Racesignup - flexible, feature-rich, great value online entry system</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="keywords" content="Online entries, Sports Event Online Entry System, Online Entry, online entries for orienteering, online entries for running, online entries for triathlon">
<meta name="author" content="Racesignup Ltd">
<meta name="description" content="Racesignup is a UK based online entry system for running, swimming, triathlon, orienteering and other sports. Event organizers enjoy its ease of use and great value. Competitors can quickly and easily enter their chosen event." />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@racesignupUK" />
<meta name="twitter:creator" content="@racesignupUK" />
<meta property="og:url" content="https://racesignup.co.uk" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Your gateway to great races" />
<meta property="og:description" content="Racesignup is a UK based online entry system for running, swimming, triathlon, orienteering and other sports. Event organizers enjoy its ease of use and great value. Competitors can quickly and easily enter their chosen event." />
<meta property="og:image" content="https://racesignup.co.uk/site/lib/images/racesignupsquare.jpg" />
<link rel="icon" type="image/png" href="/favicon.png" />

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-730780-5"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-730780-5');
  </script>

<link href="https://racesignup.co.uk/site/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">


<link href="https://racesignup.co.uk/site/vendor/fontawesome6/css/fontawesome.css" rel="stylesheet">
<link href="https://racesignup.co.uk/site/vendor/fontawesome6/css/brands.css" rel="stylesheet">
<link href="https://racesignup.co.uk/site/vendor/fontawesome6/css/solid.css" rel="stylesheet">

<link href="https://racesignup.co.uk/site/css/modern-business.css" rel="stylesheet">
<style>
  .container_rif {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  .responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  .button-container form,
  .button-container form div {
      display: inline;
  }
  .button-container button {
      display: inline;
      vertical-align: middle;
  }
  </style>
</head><body>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
<div class="container">
<a class="navbar-brand" href="/"><img src="https://racesignup.co.uk/site/lib/images/rsufornavbar.png" height="40" alt="sign up to your next race"></a>
<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarResponsive">
<ul class="navbar-nav ml-auto">
<li class="nav-item active">
<a class="nav-link" href="/" title="Enter your next event">Events</a>
</li>
<li class="nav-item ">
<a class="nav-link" href="/site/faq.php" title="Racesignup - your questions answered">FAQ</a>
</li>
<li class="nav-item ">
<a class="nav-link" href="/site/about.php" title="Racesignup - feature rich event entry system">About</a>
</li>
<li class="nav-item ">
<a class="nav-link" href="/site/organiser.php" title="Info for Event organisers and Race Directors">Add Event</a>
</li>
<li class="nav-item">
<a class="nav-link" href="/entry" title="Create or manage your Racesignup account, your entries and any credit balances">Your Account</a>
</li>
</ul>
</div>
</div>
</nav>
<div class="container-fluid">
<div class="row">
<img class="img-fluid w-100 mb-2" src="//racesignup.co.uk/lib/images/mainbanner.jpg" alt="Racesignup is a UK based online entry system for running, swimming, triathlon, orienteering and other sports. Event organizers enjoy its ease of use and great value. Competitors can quickly and easily enter their chosen event.">
</div>
</div>
<div class="container">
<form method="POST" role="form" action>
<div class="form-group row">
<div class="col-sm-5 mt-1 input-group">
<div class="input-group-prepend">
<span class="input-group-text">Search</span>
</div>
<input type="text" class="form-control" id="searchtext" name="searchtext" placeholder="Event name or organiser name" value />
</div>
<div class="col-sm-5 mt-1">
<button type="submit" class="btn btn-primary btn-sm ml-1" id="searchtn">Search</button>
<a class="btn btn-secondary btn-sm" href="/" role="button">Clear</a>
</div>
</div>
<div class="progress rounded-0 mb-3" style="height: 4px;"><div class="progress-bar bg-dark" role="progressbar" style="width: 100%"></div></div>
<div class="form-group row">
<div class="col-sm-3 mt-1">
<select id="discipline" name="discipline" class="form-control">
<option value>All event types</option>
<option value="Athletics">Athletics</option>
<option value="Orienteering">Orienteering</option>
<option value="Running">Running</option>
<option value="Skiing">Skiing</option>
<option value="Swimming">Swimming</option>
<option value="Triathlon">Triathlon</option>
<option value="Virtual">Virtual</option>
</select>
</div>
<div class="col-sm-3 mt-1">
<select id="distance" name="distance" class="form-control" data-toggle="tooltip" data-placement="top" data-original-title="Distance as the crow flies!">
<option value="0">Any distance</option>
<option value="30">Up to 30 miles</option>
<option value="50">Up to 50 miles</option>
<option value="100">Up to 100 miles</option>
<option value="150">Up to 150 miles</option>
</select>
</div>
<div class="col-sm-3 mt-1 input-group">
<div class="input-group-prepend">
<span class="input-group-text">From</span>
</div>
<input type="text" class="form-control" id="postcode" name="postcode" placeholder="1st part of postcode" value />
</div>
<div class="col-sm-2 mt-1 ml-4">
<input type="hidden" name="pcsave" id="pcsave" value="0" />
<input type="checkbox" class="form-check-input" name="pcsave" id="pcsave" value="1" data-toggle="tooltip" data-placement="top" data-original-title="Remember these settings for your next visit (uses cookies)" />
<label for="pcsave">Save&nbsp;&nbsp;</label>
<button type="submit" class="btn btn-primary btn-sm ml-1" id="gobtn">Filter</button>
</div>
</div>
</form>
<div class="progress rounded-0 mb-3" style="height: 4px;"><div class="progress-bar bg-dark" role="progressbar" style="width: 100%"></div></div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3919" href="/site/event.php?eventid=3919" title="Entries close 26th Dec">North Ashdown Christmas Score</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 27 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/southdowns.png" alt="Entries close 26th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3919" href="/site/event.php?eventid=3919" title="Entries close 26th Dec">Wed 27 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/southdowns.png" alt="Entries close 26th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">North Ashdown Christmas Score</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3989" href="/site/event.php?eventid=3989" title="Entries close 27th Dec">Christmas Novelty - Taunton West and Longrun Meadows</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Thu 28 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 27th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3989" href="/site/event.php?eventid=3989" title="Entries close 27th Dec">Thu 28 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 27th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Christmas Novelty - Taunton West and Longrun Meadows</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3820" href="/site/event.php?eventid=3820" title="Entries are open! (Car Sharing available)">York University East Campus [R]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Thu 28 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/eborienteers.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3820" href="/site/event.php?eventid=3820" title="Entries are open! (Car Sharing available)">Thu 28 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/eborienteers.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">York University East Campus [R]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3778" href="/site/event.php?eventid=3778" title="Entries are open! (Car Sharing available)">SN Regional Event and SCOL #4: Hogmoor at Christmas [R]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Fri 29 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/sn.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3778" href="/site/event.php?eventid=3778" title="Entries are open! (Car Sharing available)">Fri 29 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/sn.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">SN Regional Event and SCOL #4: Hogmoor at Christmas [R]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3633" href="/site/event.php?eventid=3633" title="Entries close 28th Dec (Car Sharing available)">Brutal - Bagshot Extra!<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 30 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/brutalbanner.png" alt="Entries close 28th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3633" href="/site/event.php?eventid=3633" title="Entries close 28th Dec (Car Sharing available)">Sat 30 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/brutalbanner.png" alt="Entries close 28th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Brutal - Bagshot Extra!<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3972" href="/site/event.php?eventid=3972" title="Entries close 29th Dec">Festive Frolic - Levenhall Links</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 30 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/elo.jpg" alt="Entries close 29th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3972" href="/site/event.php?eventid=3972" title="Entries close 29th Dec">Sat 30 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/elo.jpg" alt="Entries close 29th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Festive Frolic - Levenhall Links</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3901" href="/site/event.php?eventid=3901" title="Entries close 28th Dec">Haldon Christmas Score Event Dec 2023</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 30 Dec</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/devon_banner.png" alt="Entries close 28th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3901" href="/site/event.php?eventid=3901" title="Entries close 28th Dec">Sat 30 Dec</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/devon_banner.png" alt="Entries close 28th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Haldon Christmas Score Event Dec 2023</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #1C6595;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3706" href="/site/event.php?eventid=3706" title="Entries close 30th Dec">Christmas Canter 2023 - Virtual Challenge</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">1 - 31 Dec 2023</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/runningbug.png" alt="Entries close 30th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3706" href="/site/event.php?eventid=3706" title="Entries close 30th Dec">1 - 31 Dec 2023</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/runningbug.png" alt="Entries close 30th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #1C6595;">
<p class="my-auto">Christmas Canter 2023 - Virtual Challenge</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #1C6595;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3705" href="/site/event.php?eventid=3705" title="Entries close 30th Dec">Snowman Surprise - Christmas Run - Virtual Challenge</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">1 - 31 Dec 2023</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/runningbug.png" alt="Entries close 30th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3705" href="/site/event.php?eventid=3705" title="Entries close 30th Dec">1 - 31 Dec 2023</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/runningbug.png" alt="Entries close 30th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #1C6595;">
<p class="my-auto">Snowman Surprise - Christmas Run - Virtual Challenge</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3997" href="/site/event.php?eventid=3997" title="Entries close 30th Dec">Mawbray Dunes New Years Day orienteering</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Mon 1 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wcoc_banner.jpg" alt="Entries close 30th Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3997" href="/site/event.php?eventid=3997" title="Entries close 30th Dec">Mon 1 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wcoc_banner.jpg" alt="Entries close 30th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Mawbray Dunes New Years Day orienteering</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3962" href="/site/event.php?eventid=3962" title="Entries are open!">Mote Park New Year Score 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Mon 1 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3962" href="/site/event.php?eventid=3962" title="Entries are open!">Mon 1 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Mote Park New Year Score 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3933" href="/site/event.php?eventid=3933" title="Entries close 31st Dec">New Year's Day Novelty</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Mon 1 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries close 31st Dec" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3933" href="/site/event.php?eventid=3933" title="Entries close 31st Dec">Mon 1 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries close 31st Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">New Year's Day Novelty</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3983" href="/site/event.php?eventid=3983" title="Entries close 2nd Jan (Car Sharing available)">MLS Long Valley North<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 3 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mls.jpg" alt="Entries close 2nd Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3983" href="/site/event.php?eventid=3983" title="Entries close 2nd Jan (Car Sharing available)">Wed 3 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mls.jpg" alt="Entries close 2nd Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">MLS Long Valley North<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3988" href="/site/event.php?eventid=3988" title="Entries close 3rd Jan">KNC Tunbridge Wells Common</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Thu 4 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries close 3rd Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3988" href="/site/event.php?eventid=3988" title="Entries close 3rd Jan">Thu 4 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries close 3rd Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">KNC Tunbridge Wells Common</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3985" href="/site/event.php?eventid=3985" title="Entries close 5th Jan (Car Sharing available)">Washington Common<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 6 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/southdowns.png" alt="Entries close 5th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3985" href="/site/event.php?eventid=3985" title="Entries close 5th Jan (Car Sharing available)">Sat 6 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/southdowns.png" alt="Entries close 5th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Washington Common<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3986" href="/site/event.php?eventid=3986" title="Entries close 4th Jan">CLOK New Year Team Score Relays </a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 7 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/clok.jpg" alt="Entries close 4th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3986" href="/site/event.php?eventid=3986" title="Entries close 4th Jan">Sun 7 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/clok.jpg" alt="Entries close 4th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">CLOK New Year Team Score Relays </p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3890" href="/site/event.php?eventid=3890" title="Entries are open!">Dorset Delight [R]</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 7 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wsx.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3890" href="/site/event.php?eventid=3890" title="Entries are open!">Sun 7 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wsx.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">Dorset Delight [R]</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3944" href="/site/event.php?eventid=3944" title="Entries are open! (Car Sharing available)">Kings Wood Regional [R]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 7 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3944" href="/site/event.php?eventid=3944" title="Entries are open! (Car Sharing available)">Sun 7 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">Kings Wood Regional [R]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3928" href="/site/event.php?eventid=3928" title="Entries close 1st Jan">MacTuff New Year 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 7 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 1st Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3928" href="/site/event.php?eventid=3928" title="Entries close 1st Jan">Sun 7 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 1st Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff New Year 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3956" href="/site/event.php?eventid=3956" title="Event is cancelled!">QOFL4 - Aisholt Common</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 7 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Event is cancelled!" />
</div>
<div class="col-4 bg-danger text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">CANCELLED</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3956" href="/site/event.php?eventid=3956" title="Event is cancelled!">Sun 7 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Event is cancelled!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">QOFL4 - Aisholt Common</p>
</div>
<div class="col-md-2 col-lg-2 bg-danger text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">CANCELLED</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3618" href="/site/event.php?eventid=3618" title="Entries close 3rd Jan (Event is full) (Car Sharing available)">Stubbington 10K 2024<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 7 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/stubbington.png" alt="Entries close 3rd Jan (Event is full)" />
</div>
<div class="col-4 bg-danger text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">FULL</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3618" href="/site/event.php?eventid=3618" title="Entries close 3rd Jan (Event is full) (Car Sharing available)">Sun 7 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/stubbington.png" alt="Entries close 3rd Jan (Event is full)" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Stubbington 10K 2024<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-danger text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">FULL</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3996" href="/site/event.php?eventid=3996" title="Entries are open! (Car Sharing available)">AIRE Bingley St Ives<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 10 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/airienteers2.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3996" href="/site/event.php?eventid=3996" title="Entries are open! (Car Sharing available)">Wed 10 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/airienteers2.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">AIRE Bingley St Ives<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3737" href="/site/event.php?eventid=3737" title="Entries are open!">HAVOC-SOS 2023/24 Winter Series No.6 - Pilgrim's Hatch</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 10 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3737" href="/site/event.php?eventid=3737" title="Entries are open!">Wed 10 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">HAVOC-SOS 2023/24 Winter Series No.6 - Pilgrim's Hatch</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3862" href="/site/event.php?eventid=3862" title="Entries close 10th Jan">Street Series 3 - Wellington</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Thu 11 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 10th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3862" href="/site/event.php?eventid=3862" title="Entries close 10th Jan">Thu 11 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 10th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Street Series 3 - Wellington</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3931" href="/site/event.php?eventid=3931" title="Entries open 1st Jan">ESOC Local event at Cammo Estate</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 13 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/esoc.png" alt="Entries open 1st Jan" />
</div>
<div class="col-4 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3931" href="/site/event.php?eventid=3931" title="Entries open 1st Jan">Sat 13 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/esoc.png" alt="Entries open 1st Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">ESOC Local event at Cammo Estate</p>
</div>
<div class="col-md-2 col-lg-2 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3904" href="/site/event.php?eventid=3904" title="Entries close 7th Jan (Car Sharing available)">West Woods - Southwest Orienteering League [R]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 14 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/nwo.jpg" alt="Entries close 7th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3904" href="/site/event.php?eventid=3904" title="Entries close 7th Jan (Car Sharing available)">Sun 14 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/nwo.jpg" alt="Entries close 7th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">West Woods - Southwest Orienteering League [R]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #A00000;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3951" href="/site/event.php?eventid=3951" title="Entries close 13th Jan (Car Sharing available)">Westerham: SE League [N]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 14 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/dfoklong.png" alt="Entries close 13th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3951" href="/site/event.php?eventid=3951" title="Entries close 13th Jan (Car Sharing available)">Sun 14 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/dfoklong.png" alt="Entries close 13th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #A00000;">
<p class="my-auto">Westerham: SE League [N]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3879" href="/site/event.php?eventid=3879" title="Entries are open!">WRNL 8 – Boscombe</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Mon 15 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wsx.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3879" href="/site/event.php?eventid=3879" title="Entries are open!">Mon 15 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wsx.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">WRNL 8 – Boscombe</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3981" href="/site/event.php?eventid=3981" title="Entries are open!">Old Malden Street O</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Tue 16 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mvoc_banner.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3981" href="/site/event.php?eventid=3981" title="Entries are open!">Tue 16 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mvoc_banner.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Old Malden Street O</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3872" href="/site/event.php?eventid=3872" title="Entries close 15th Jan">Royal Artillery Inter-Unit Cross Country Championship</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 17 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://i.imgur.com/VsTGfB8.jpg" alt="Entries close 15th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3872" href="/site/event.php?eventid=3872" title="Entries close 15th Jan">Wed 17 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://i.imgur.com/VsTGfB8.jpg" alt="Entries close 15th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Royal Artillery Inter-Unit Cross Country Championship</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3959" href="/site/event.php?eventid=3959" title="Entries are open! (Car Sharing available)">Hargate KOL5 20 Jan 2024<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 20 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3959" href="/site/event.php?eventid=3959" title="Entries are open! (Car Sharing available)">Sat 20 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/saxons.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Hargate KOL5 20 Jan 2024<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3897" href="/site/event.php?eventid=3897" title="Entries close 17th Jan (Car Sharing available)">Rhinefield<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 20 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/SOCfull.png" alt="Entries close 17th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3897" href="/site/event.php?eventid=3897" title="Entries close 17th Jan (Car Sharing available)">Sat 20 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/SOCfull.png" alt="Entries close 17th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Rhinefield<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3947" href="/site/event.php?eventid=3947" title="Entries are open! (Car Sharing available)">SN Saturday Series 2023#4: Horsell Common<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 20 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/sn.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3947" href="/site/event.php?eventid=3947" title="Entries are open! (Car Sharing available)">Sat 20 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/sn.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">SN Saturday Series 2023#4: Horsell Common<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3975" href="/site/event.php?eventid=3975" title="Entries close 19th Jan">HAVOC Regional & SWELL event - Langdon Hills [R]</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 21 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries close 19th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3975" href="/site/event.php?eventid=3975" title="Entries close 19th Jan">Sun 21 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries close 19th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">HAVOC Regional & SWELL event - Langdon Hills [R]</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3734" href="/site/event.php?eventid=3734" title="Entries close 19th Jan"> Welsh FIS Alpine Championships 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">22/23 January</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/skiwales.jpg" alt="Entries close 19th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3734" href="/site/event.php?eventid=3734" title="Entries close 19th Jan">22/23 January</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/skiwales.jpg" alt="Entries close 19th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto"> Welsh FIS Alpine Championships 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel4002" href="/site/event.php?eventid=4002" title="Entries open 29th Dec">WRNL Ringwood Town</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Mon 22 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wimlong.jpg" alt="Entries open 29th Dec" />
</div>
<div class="col-4 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel4002" href="/site/event.php?eventid=4002" title="Entries open 29th Dec">Mon 22 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/wimlong.jpg" alt="Entries open 29th Dec" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">WRNL Ringwood Town</p>
</div>
<div class="col-md-2 col-lg-2 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3908" href="/site/event.php?eventid=3908" title="Entries close 23rd Jan">Army Cross Country Championships 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 24 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" alt="Entries close 23rd Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3908" href="/site/event.php?eventid=3908" title="Entries close 23rd Jan">Wed 24 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" alt="Entries close 23rd Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Army Cross Country Championships 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3925" href="/site/event.php?eventid=3925" title="Entries close 23rd Jan">Army Cross Country Championships 2024 - Individual Entries</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 24 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" alt="Entries close 23rd Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3925" href="/site/event.php?eventid=3925" title="Entries close 23rd Jan">Wed 24 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" alt="Entries close 23rd Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Army Cross Country Championships 2024 - Individual Entries</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3898" href="/site/event.php?eventid=3898" title="Entries close 17th Jan (Car Sharing available)">EUOC Big Weekend: Knockout sprint training day<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 24 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/euoc.png" alt="Entries close 17th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3898" href="/site/event.php?eventid=3898" title="Entries close 17th Jan (Car Sharing available)">Wed 24 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/euoc.png" alt="Entries close 17th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">EUOC Big Weekend: Knockout sprint training day<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3814" href="/site/event.php?eventid=3814" title="Entries close 23rd Jan">HAVOC-SOS Mid-week Winter Series No7 Colchester</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 24 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries close 23rd Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3814" href="/site/event.php?eventid=3814" title="Entries close 23rd Jan">Wed 24 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries close 23rd Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">HAVOC-SOS Mid-week Winter Series No7 Colchester</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3730" href="/site/event.php?eventid=3730" title="Entries close 19th Jan">Welsh BASS Alpine Championships 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">24 - 26 January</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/skiwales.jpg" alt="Entries close 19th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3730" href="/site/event.php?eventid=3730" title="Entries close 19th Jan">24 - 26 January</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/skiwales.jpg" alt="Entries close 19th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Welsh BASS Alpine Championships 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3935" href="/site/event.php?eventid=3935" title="Entries close 27th Jan">Highwoods Country Park [R]</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 28 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries close 27th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3935" href="/site/event.php?eventid=3935" title="Entries close 27th Jan">Sun 28 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries close 27th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">Highwoods Country Park [R]</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3987" href="/site/event.php?eventid=3987" title="Entries close 21st Jan">Mutters Moor [R]</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 28 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/devon_banner.png" alt="Entries close 21st Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3987" href="/site/event.php?eventid=3987" title="Entries close 21st Jan">Sun 28 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/devon_banner.png" alt="Entries close 21st Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">Mutters Moor [R]</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #A00000;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3923" href="/site/event.php?eventid=3923" title="Entries close 24th Jan (Car Sharing available)">The Concorde Chase Weekend [N]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">27 - 28 Jan 2024</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/bkolong.png" alt="Entries close 24th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3923" href="/site/event.php?eventid=3923" title="Entries close 24th Jan (Car Sharing available)">27 - 28 Jan 2024</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/bkolong.png" alt="Entries close 24th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #A00000;">
<p class="my-auto">The Concorde Chase Weekend [N]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3926" href="/site/event.php?eventid=3926" title="Entries close 30th Jan">Inter-Corps Cross Country Championships 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 31 Jan</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" alt="Entries close 30th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3926" href="/site/event.php?eventid=3926" title="Entries close 30th Jan">Wed 31 Jan</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" alt="Entries close 30th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Inter-Corps Cross Country Championships 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3738" href="/site/event.php?eventid=3738" title="Entries close 10th Jan">HAVOC-SOS 2023/24 Winter Series No.8 - Hornchurch East</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 7 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries close 10th Jan" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3738" href="/site/event.php?eventid=3738" title="Entries close 10th Jan">Wed 7 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries close 10th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">HAVOC-SOS 2023/24 Winter Series No.8 - Hornchurch East</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #BF0B0B;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel4000" href="/site/event.php?eventid=4000" title="Entries open 1st Jan (Car Sharing available)">Micheldever Wood - SCOA League [R]<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 11 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/SOCfull.png" alt="Entries open 1st Jan" />
</div>
<div class="col-4 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel4000" href="/site/event.php?eventid=4000" title="Entries open 1st Jan (Car Sharing available)">Sun 11 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/SOCfull.png" alt="Entries open 1st Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #BF0B0B;">
<p class="my-auto">Micheldever Wood - SCOA League [R]<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3863" href="/site/event.php?eventid=3863" title="Entries close 14th Feb">Street Series 4 - Dunster</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Thu 15 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 14th Feb" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3863" href="/site/event.php?eventid=3863" title="Entries close 14th Feb">Thu 15 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 14th Feb" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Street Series 4 - Dunster</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3693" href="/site/event.php?eventid=3693" title="Entries close 13th Feb (Car Sharing available)">Caerphilly Trail 5K and 10K<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 18 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/ridgerunners.jpg" alt="Entries close 13th Feb" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3693" href="/site/event.php?eventid=3693" title="Entries close 13th Feb (Car Sharing available)">Sun 18 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/ridgerunners.jpg" alt="Entries close 13th Feb" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Caerphilly Trail 5K and 10K<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3815" href="/site/event.php?eventid=3815" title="Entries are open!">HAVOC-SOS Mid-week Winter Series No9 Hatfield Peverel</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 21 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3815" href="/site/event.php?eventid=3815" title="Entries are open!">Wed 21 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">HAVOC-SOS Mid-week Winter Series No9 Hatfield Peverel</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3948" href="/site/event.php?eventid=3948" title="Entries open 14th Jan (Car Sharing available)">SN Saturday Series 2023#5: Hindhead<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 24 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/sn.png" alt="Entries open 14th Jan" />
</div>
<div class="col-4 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3948" href="/site/event.php?eventid=3948" title="Entries open 14th Jan (Car Sharing available)">Sat 24 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/sn.png" alt="Entries open 14th Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">SN Saturday Series 2023#5: Hindhead<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3881" href="/site/event.php?eventid=3881" title="Entries close 22nd Feb">Welly Trail Race 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 25 Feb</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/welly2024banner2.jpg" alt="Entries close 22nd Feb" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3881" href="/site/event.php?eventid=3881" title="Entries close 22nd Feb">Sun 25 Feb</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/welly2024banner2.jpg" alt="Entries close 22nd Feb" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Welly Trail Race 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3739" href="/site/event.php?eventid=3739" title="Entries are open!">HAVOC-SOS 2023/24 Winter Series No.10 - TBC</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 6 Mar</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3739" href="/site/event.php?eventid=3739" title="Entries are open!">Wed 6 Mar</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/havoc.jpg" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">HAVOC-SOS 2023/24 Winter Series No.10 - TBC</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3974" href="/site/event.php?eventid=3974" title="Entries close 7th Mar (Car Sharing available)">Brutal - Chawton<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 9 Mar</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/brutalbanner.png" alt="Entries close 7th Mar" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3974" href="/site/event.php?eventid=3974" title="Entries close 7th Mar (Car Sharing available)">Sat 9 Mar</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/brutalbanner.png" alt="Entries close 7th Mar" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Brutal - Chawton<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E62222;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3864" href="/site/event.php?eventid=3864" title="Entries close 13th Mar">Street Series 5 - Galmington</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Thu 14 Mar</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 13th Mar" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3864" href="/site/event.php?eventid=3864" title="Entries close 13th Mar">Thu 14 Mar</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/quantock.jpg" alt="Entries close 13th Mar" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E62222;">
<p class="my-auto">Street Series 5 - Galmington</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3767" href="/site/event.php?eventid=3767" title="Entries close 28th Feb (Car Sharing available)">Hendy Eastleigh 10K 2024<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 24 Mar</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/hendy.jpg" alt="Entries close 28th Feb" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3767" href="/site/event.php?eventid=3767" title="Entries close 28th Feb (Car Sharing available)">Sun 24 Mar</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/hendy.jpg" alt="Entries close 28th Feb" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Hendy Eastleigh 10K 2024<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3878" href="/site/event.php?eventid=3878" title="Entries close 20th Mar">Hendy Eastleigh Fun Run 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 24 Mar</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/hendy.jpg" alt="Entries close 20th Mar" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3878" href="/site/event.php?eventid=3878" title="Entries close 20th Mar">Sun 24 Mar</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/hendy.jpg" alt="Entries close 20th Mar" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Hendy Eastleigh Fun Run 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3930" href="/site/event.php?eventid=3930" title="Entries close 27th Apr">Barry Buddon FAST Half Marathon</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 28 Apr</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 27th Apr" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3930" href="/site/event.php?eventid=3930" title="Entries close 27th Apr">Sun 28 Apr</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 27th Apr" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Barry Buddon FAST Half Marathon</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3977" href="/site/event.php?eventid=3977" title="Entries close 2nd May (Car Sharing available)">Brutal - Ower Challenge!<i class="fa-solid fa-car" style="float:right;"></i></a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 4 May</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/brutalbanner.png" alt="Entries close 2nd May" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3977" href="/site/event.php?eventid=3977" title="Entries close 2nd May (Car Sharing available)">Sat 4 May</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/brutalbanner.png" alt="Entries close 2nd May" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Brutal - Ower Challenge!<i class="fa-solid fa-car" style="float:right;"></i></p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3973" href="/site/event.php?eventid=3973" title="Entries close 2nd May">HBT Fun Run</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sat 4 May</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/hurstbourne5.png" alt="Entries close 2nd May" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3973" href="/site/event.php?eventid=3973" title="Entries close 2nd May">Sat 4 May</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/hurstbourne5.png" alt="Entries close 2nd May" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">HBT Fun Run</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3953" href="/site/event.php?eventid=3953" title="Entries close 11th May">MacTuff 5k & 10k Obstacle Course Challenge FIFE, Scotland. May 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 12 May</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 11th May" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3953" href="/site/event.php?eventid=3953" title="Entries close 11th May">Sun 12 May</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 11th May" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff 5k & 10k Obstacle Course Challenge FIFE, Scotland. May 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3938" href="/site/event.php?eventid=3938" title="Entries close 11th May">MacTuff Kids Obstacle Course Challenge. FIFE Scotland May 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 12 May</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 11th May" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3938" href="/site/event.php?eventid=3938" title="Entries close 11th May">Sun 12 May</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 11th May" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff Kids Obstacle Course Challenge. FIFE Scotland May 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3991" href="/site/event.php?eventid=3991" title="Entries close 18th May">MacTuff Really Muddy 5k & 10k ABERDEEN May 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 19 May</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 18th May" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3991" href="/site/event.php?eventid=3991" title="Entries close 18th May">Sun 19 May</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 18th May" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff Really Muddy 5k & 10k ABERDEEN May 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3990" href="/site/event.php?eventid=3990" title="Entries close 11th May">MacTuff Really Muddy Kids ABERDEEN May 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 19 May</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 11th May" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3990" href="/site/event.php?eventid=3990" title="Entries close 11th May">Sun 19 May</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 11th May" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff Really Muddy Kids ABERDEEN May 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3994" href="/site/event.php?eventid=3994" title="Entries close 8th Jun">MacTuff Really Muddy 5k & 10k LONDON SOUTH EAST June 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 9 Jun</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 8th Jun" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3994" href="/site/event.php?eventid=3994" title="Entries close 8th Jun">Sun 9 Jun</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 8th Jun" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff Really Muddy 5k & 10k LONDON SOUTH EAST June 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3993" href="/site/event.php?eventid=3993" title="Entries close 1st Jun">MacTuff Really Muddy Kids LONDON SOUTH EAST June 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 9 Jun</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 1st Jun" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3993" href="/site/event.php?eventid=3993" title="Entries close 1st Jun">Sun 9 Jun</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/mactuff.jpg" alt="Entries close 1st Jun" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">MacTuff Really Muddy Kids LONDON SOUTH EAST June 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3924" href="/site/event.php?eventid=3924" title="Entries close 16th Jun">Exbury Gardens 10K 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Sun 23 Jun</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/runningmania.jpg" alt="Entries close 16th Jun" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3924" href="/site/event.php?eventid=3924" title="Entries close 16th Jun">Sun 23 Jun</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/runningmania.jpg" alt="Entries close 16th Jun" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Exbury Gardens 10K 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3980" href="/site/event.php?eventid=3980" title="Entries are open!">PJC Summer Cross Country 2024</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Wed 17 Jul</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/portsmouthjoggers.png" alt="Entries are open!" />
</div>
<div class="col-4 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3980" href="/site/event.php?eventid=3980" title="Entries are open!">Wed 17 Jul</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/portsmouthjoggers.png" alt="Entries are open!" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">PJC Summer Cross Country 2024</p>
</div>
<div class="col-md-2 col-lg-2 bg-dark text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPEN</p>
</div>
</div>
<div class="row position-relative no-gutters my-3 d-block d-md-none d-flex d-flex-row">
<div class="col-12 text-white mb-0 py-2 px-0 d-flex flex-column position-static text-center" style="background-color: #E95420;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3806" href="/site/event.php?eventid=3806" title="Entries open 1st Jan">Cilcain Mountain Race</a></p>
</div>
<div class="col-4 text-white mb-1 py-0 px-0 d-flex flex-column text-center" style="background-color: #41393C;">
<p class="my-auto">Mon 26 Aug</p>
</div>
<div class="col-4 d-flex flex-column mb-1 px-0">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/clywdian.jpg" alt="Entries open 1st Jan" />
</div>
<div class="col-4 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="row position-relative no-gutters d-none d-md-flex d-flex-row">
<div class="col-md-2 col-lg-2 col-xl-1 text-white mb-1 py-0 px-0 d-flex flex-column position-static text-center" style="background-color: #41393C;">
<p class="my-auto"><a style="text-decoration: none;" class="text-white stretched-link" data-toggle="modal" data-target="#panel3806" href="/site/event.php?eventid=3806" title="Entries open 1st Jan">Mon 26 Aug</a></p>
</div>
<div class="col-md-3 col-lg-2 d-flex flex-column mb-1 px-1">
<img class="img-fluid my-auto" src="https://racesignup.co.uk/lib/logos/clywdian.jpg" alt="Entries open 1st Jan" />
</div>
<div class="col-md-5 col-lg-6 col-xl-7  text-white mb-1 py-0 px-2 d-flex flex-column" style="background-color: #E95420;">
<p class="my-auto">Cilcain Mountain Race</p>
</div>
<div class="col-md-2 col-lg-2 bg-secondary text-white mb-1 py-0 px-0 d-flex flex-column text-center">
<p class="my-auto">OPENS SOON</p>
</div>
</div>
<div class="modal fade" id="panel3919" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/southdowns.png" class="img-fluid" style="width: 100%;" alt="North Ashdown Christmas Score" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 27th December</h5>
<h4 class="text-primary text-center">North Ashdown Christmas Score</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 26th Dec</span></h5>
<p class="text-center"></p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3919" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3989" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/quantock.jpg" class="img-fluid" style="width: 100%;" alt="Christmas Novelty - Taunton West and Longrun Meadows" />
</div>
<div class="modal-body">
<h5 class="text-center">Thursday 28th December</h5>
<h4 class="text-primary text-center">Christmas Novelty - Taunton West and Longrun Meadows</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 27th Dec</span></h5>
<p class="text-center">Our annual festive novelty event, followed by a Christmas social gathering at Staplegrove Village Hall. Santa hats optional. All are welcome :-)</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3989" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3820" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/eborienteers.jpg" class="img-fluid" style="width: 100%;" alt="York University East Campus" />
</div>
<div class="modal-body">
<h5 class="text-center">Thursday 28th December</h5>
<h4 class="text-primary text-center">York University East Campus</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Around the complex campus buildings and the surrounding woodland and grasslands.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3820" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3778" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/sn.png" class="img-fluid" style="width: 100%;" alt="SN Regional Event and SCOL #4: Hogmoor at Christmas" />
</div>
<div class="modal-body">
<h5 class="text-center">Friday 29th December</h5>
<h4 class="text-primary text-center">SN Regional Event and SCOL #4: Hogmoor at Christmas</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">South Central Orienteering League Event #4</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3778" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3633" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/brutalbanner.png" class="img-fluid" style="width: 100%;" alt="Brutal - Bagshot Extra!" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 30th December</h5>
<h4 class="text-primary text-center">Brutal - Bagshot Extra!</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 28th Dec</span></h5>
<p class="text-center">We have moved to Bagshot due to our usual December location at Longmoor now being used to train Ukrainian troops.<br/><br/>Bagshot has always been a classic Brutal area with the water, mud and tough hills. This is a brand new route making the most of all the best sections and extending the length of the course. It is a military training area that is used for Alpine driver training on a ...</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3633" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3972" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/elo.jpg" class="img-fluid" style="width: 100%;" alt="Festive Frolic - Levenhall Links" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 30th December</h5>
<h4 class="text-primary text-center">Festive Frolic - Levenhall Links</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 29th Dec</span></h5>
<p class="text-center">For longer than most of us can remember ELO have put on a fun orienteering event between Christmas and New Year. As well as finding the controls there has been a puzzle to add to the challenge. A mass start, a social gathering and a lively prize giving have made up for a great way to work off some of the Christmas excesses.<br/><br/>This year&rsquo;s Festive Frolic at Levenhall Links on Sa ...</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3972" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3901" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/devon_banner.png" class="img-fluid" style="width: 100%;" alt="Haldon Christmas Score Event Dec 2023" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 30th December</h5>
<h4 class="text-primary text-center">Haldon Christmas Score Event Dec 2023</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 28th Dec</span></h5>
<p class="text-center">60 minute odds and evens score event and club social</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3901" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3706" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/runningbug.png" class="img-fluid" style="width: 100%;" alt="Christmas Canter 2023" />
</div>
<div class="modal-body">
<h5 class="text-center">1 - 31 Dec 2023</h5>
<h4 class="text-primary text-center">Christmas Canter 2023</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 30th Dec</span></h5>
<p class="text-center">Date of Challenge: From 1st to 31st December 2023<br/><br/>Join Santa, Snowman and friends for our very first Christmas Canter virtual race in December 2023. This is your chance to do a Christmas run and keep the motivation in the wintry weather.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3706" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3705" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/runningbug.png" class="img-fluid" style="width: 100%;" alt="Snowman Surprise - Christmas Run" />
</div>
<div class="modal-body">
<h5 class="text-center">1 - 31 Dec 2023</h5>
<h4 class="text-primary text-center">Snowman Surprise - Christmas Run</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 30th Dec</span></h5>
<p class="text-center">Date of Challenge: From 1st to 31st December 2023<br/><br/>Back by popular demand, the Snowman Surprise virtual Christmas race. Complete this challenge anytime in December, and receive a beautiful medal for your achievement.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3705" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3997" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/wcoc_banner.jpg" class="img-fluid" style="width: 100%;" alt="Mawbray Dunes New Years Day orienteering" />
</div>
<div class="modal-body">
<h5 class="text-center">Monday 1st January</h5>
<h4 class="text-primary text-center">Mawbray Dunes New Years Day orienteering</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 30th Dec</span></h5>
<p class="text-center">Festive Fundraiser New Years Day event - mass start 11am<br/>Cake and soup stall raising funds for the WCOC junior funds.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3997" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3962" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/saxons.png" class="img-fluid" style="width: 100%;" alt="Mote Park New Year Score 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Monday 1st January</h5>
<h4 class="text-primary text-center">Mote Park New Year Score 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">New Year Score event at Mote Park.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3962" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3933" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" class="img-fluid" style="width: 100%;" alt="New Year's Day Novelty" />
</div>
<div class="modal-body">
<h5 class="text-center">Monday 1st January</h5>
<h4 class="text-primary text-center">New Year's Day Novelty</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 31st Dec</span></h5>
<p class="text-center">Hilly Fields, Colchester<br/>Odds and evens score event. Time limit 45 minutes.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3933" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3983" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mls.jpg" class="img-fluid" style="width: 100%;" alt="MLS Long Valley North" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 3rd January</h5>
<h4 class="text-primary text-center">MLS Long Valley North</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 2nd Jan</span></h5>
<p class="text-center">Military League (South)</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3983" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3988" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/saxons.png" class="img-fluid" style="width: 100%;" alt="KNC Tunbridge Wells Common" />
</div>
<div class="modal-body">
<h5 class="text-center">Thursday 4th January</h5>
<h4 class="text-primary text-center">KNC Tunbridge Wells Common</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 3rd Jan</span></h5>
<p class="text-center">KNC 11. The Kent Night Cup returns to Tunbridge Wells Common for the first time since before the start of the pandemic. Our familiar 19:30 mass start score format will have flavour added by a bonus points system that will require careful planning and the unusual challenges characteristic of a forest so close to a town centre.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3988" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3985" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/southdowns.png" class="img-fluid" style="width: 100%;" alt="Washington Common" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 6th January</h5>
<h4 class="text-primary text-center">Washington Common</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 5th Jan</span></h5>
<p class="text-center"></p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3985" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3986" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/clok.jpg" class="img-fluid" style="width: 100%;" alt="CLOK New Year Team Score Relays  " />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 7th January</h5>
<h4 class="text-primary text-center">CLOK New Year Team Score Relays </h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 4th Jan</span></h5>
<p class="text-center">CLOK invites you to a New Year Team Score at Hardwick Park Sedgefield</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3986" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3890" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/wsx.jpg" class="img-fluid" style="width: 100%;" alt="Dorset Delight" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 7th January</h5>
<h4 class="text-primary text-center">Dorset Delight</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Wessex Orienteers invite you to this regional event, which is the 32nd Dorset Delight at Coldharbour on wareham Forest, just North of Wareham on the Isle of Purbeck.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3890" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3944" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/saxons.png" class="img-fluid" style="width: 100%;" alt="Kings Wood Regional" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 7th January</h5>
<h4 class="text-primary text-center">Kings Wood Regional</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Start the new year with cracker of an event in Kings Wood. Open runnable woodland, a mixture of deciduous and coniferous forest blocks with plenty of contour detail and ancient earth features.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3944" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3928" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff New Year 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 7th January</h5>
<h4 class="text-primary text-center">MacTuff New Year 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 1st Jan</span></h5>
<p class="text-center">The Full Winter MacTuff in Scotland<br/>Bucket List Obstacle Challenge<br/>Knockhill Racing Circuit</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3928" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3956" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/quantock.jpg" class="img-fluid" style="width: 100%;" alt="QOFL4 - Aisholt Common" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 7th January</h5>
<h4 class="text-primary text-center">QOFL4 - Aisholt Common</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Event is cancelled!</span></h5>
<p class="text-center">To be guaranteed a map, enter by Sunday 31 December.<br/><br/>Open moorland with patches of runnable woodland on Quantocks with some lovely views. <br/><br/>All courses explore the hilltop around Will's Neck, and the longer courses head into the steeper slopes of Aisholt Common.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3956" onclick="this.innerHTML = 'Connecting . . .';return true;">Event Information</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3618" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/stubbington.png" class="img-fluid" style="width: 100%;" alt="Stubbington 10K 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 7th January</h5>
<h4 class="text-primary text-center">Stubbington 10K 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 3rd Jan (Event is full)</span></h5>
<p class="text-center">The Stubbington 10K is known for its picturesque landscape, fast course and being one of the biggest and best races of its kind that the south coast has to offer.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3618" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Start List</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3996" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/airienteers2.jpg" class="img-fluid" style="width: 100%;" alt="AIRE Bingley St Ives" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 10th January</h5>
<h4 class="text-primary text-center">AIRE Bingley St Ives</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Night Score event - chose between 45 or 60 minutes on the night. Mass start at 19:00</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3996" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3737" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/havoc.jpg" class="img-fluid" style="width: 100%;" alt="HAVOC-SOS 2023/24 Winter Series No.6 - Pilgrim's Hatch" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 10th January</h5>
<h4 class="text-primary text-center">HAVOC-SOS 2023/24 Winter Series No.6 - Pilgrim's Hatch</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Mid week street event</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3737" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3862" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/quantock.jpg" class="img-fluid" style="width: 100%;" alt="Street Series 3 - Wellington" />
</div>
<div class="modal-body">
<h5 class="text-center">Thursday 11th January</h5>
<h4 class="text-primary text-center">Street Series 3 - Wellington</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 10th Jan</span></h5>
<p class="text-center">A market town south west of Taunton. A mixture of old and new estates and the town centre.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3862" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3931" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/esoc.png" class="img-fluid" style="width: 100%;" alt="ESOC Local event at Cammo Estate" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 13th January</h5>
<h4 class="text-primary text-center">ESOC Local event at Cammo Estate</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries open 1st Jan</span></h5>
<p class="text-center">The closing date for online entries is Friday 12th January at 8pm however as we will need to order the maps in good time the following conditions apply<br/>- online entries received by Tuesday 9th January@ 2pm will be guaranteed a map for your chosen course.<br/>- online entries will be accepted up to 8pm on Friday 12th January assuming maps are still available<br/>- Entry on the day (EOD) ...</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3931" onclick="this.innerHTML = 'Connecting . . .';return true;">More Information</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3904" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/nwo.jpg" class="img-fluid" style="width: 100%;" alt="West Woods - Southwest Orienteering League" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 14th January</h5>
<h4 class="text-primary text-center">West Woods - Southwest Orienteering League</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 7th Jan</span></h5>
<p class="text-center">West Woods Nr. Marlborough</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3904" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3951" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/dfoklong.png" class="img-fluid" style="width: 100%;" alt="Westerham: SE League" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 14th January</h5>
<h4 class="text-primary text-center">Westerham: SE League</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 13th Jan</span></h5>
<p class="text-center">Come and enjoy running in a beautiful forest with a rich mixture of runnable forest, open areas, streams and plenty of earth features. <br/><br/>Early entry closes at midnight on 24 December<br/><br/>Final details will be available on the DFOK website</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3951" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3879" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/wsx.jpg" class="img-fluid" style="width: 100%;" alt="WRNL 8 – Boscombe" />
</div>
<div class="modal-body">
<h5 class="text-center">Monday 15th January</h5>
<h4 class="text-primary text-center">WRNL 8 – Boscombe</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">60 minute straight score</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3879" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3981" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mvoc_banner.png" class="img-fluid" style="width: 100%;" alt="Old Malden Street O" />
</div>
<div class="modal-body">
<h5 class="text-center">Tuesday 16th January</h5>
<h4 class="text-primary text-center">Old Malden Street O</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">This is the 5th event in a series of 8 Street O Events that MVOC are organising. <br/><br/>These events are a great introduction to orienteering for runners of all abilities and a good opportunity to get out and about midweek for a bit of training.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3981" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3872" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://i.imgur.com/VsTGfB8.jpg" class="img-fluid" style="width: 100%;" alt="Royal Artillery Inter-Unit Cross Country Championship" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 17th January</h5>
<h4 class="text-primary text-center">Royal Artillery Inter-Unit Cross Country Championship</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 15th Jan</span></h5>
<p class="text-center">This is a closed competition. Unit team captains will be invited to nominate their teams and will be given a passcode to get access.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3872" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3959" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/saxons.png" class="img-fluid" style="width: 100%;" alt="Hargate KOL5 20 Jan 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 20th January</h5>
<h4 class="text-primary text-center">Hargate KOL5 20 Jan 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Kent Orienteering League event 5 - KOL5. AONB Woodland area to south of Tunbridge Wells with some rough open and a stream across the southern end of the area.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3959" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3897" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/SOCfull.png" class="img-fluid" style="width: 100%;" alt="Rhinefield" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 20th January</h5>
<h4 class="text-primary text-center">Rhinefield</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 17th Jan</span></h5>
<p class="text-center">Orienteering in the New Forest.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3897" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3947" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/sn.png" class="img-fluid" style="width: 100%;" alt="SN Saturday Series 2023#4: Horsell Common" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 20th January</h5>
<h4 class="text-primary text-center">SN Saturday Series 2023#4: Horsell Common</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">A range of courses increasing in length and complexity for all the family.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3947" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3975" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/havoc.jpg" class="img-fluid" style="width: 100%;" alt="HAVOC Regional & SWELL event - Langdon Hills" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 21st January</h5>
<h4 class="text-primary text-center">HAVOC Regional & SWELL event - Langdon Hills</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 19th Jan</span></h5>
<p class="text-center">Regional &amp; SWELL Event</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3975" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3734" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/skiwales.jpg" class="img-fluid" style="width: 100%;" alt=" Welsh FIS Alpine Championships 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">22/23 January</h5>
<h4 class="text-primary text-center"> Welsh FIS Alpine Championships 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 19th Jan</span></h5>
<p class="text-center"><b style="color:#FD3004">Early Bird prices (&pound;55) until 12th January then late entry fee (&pound;75)</b><br/><br/>WELSH ALPINE CHAMPIONSHIPS 2024 &ndash; CHAMPERY, SWITZERLAND&rsquo;S GATEWAY TO THE PORTES DU SOLEIL SKI REGION</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3734" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel4002" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/wimlong.jpg" class="img-fluid" style="width: 100%;" alt="WRNL Ringwood Town" />
</div>
<div class="modal-body">
<h5 class="text-center">Monday 22nd January</h5>
<h4 class="text-primary text-center">WRNL Ringwood Town</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries open 29th Dec</span></h5>
<p class="text-center"></p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=4002" onclick="this.innerHTML = 'Connecting . . .';return true;">More Information</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3908" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" class="img-fluid" style="width: 100%;" alt="Army Cross Country Championships 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 24th January</h5>
<h4 class="text-primary text-center">Army Cross Country Championships 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 23rd Jan</span></h5>
<p class="text-center">This is a closed competition. Corps team managers will be invited to nominate their teams and will be given a passcode to get access.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3908" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3925" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" class="img-fluid" style="width: 100%;" alt="Army Cross Country Championships 2024 - Individual Entries" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 24th January</h5>
<h4 class="text-primary text-center">Army Cross Country Championships 2024 - Individual Entries</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 23rd Jan</span></h5>
<p class="text-center">This is a closed competition. Corps team managers will be invited to nominate their teams and will be given a passcode to get access.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3925" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3898" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/euoc.png" class="img-fluid" style="width: 100%;" alt="EUOC Big Weekend: Knockout sprint training day" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 24th January</h5>
<h4 class="text-primary text-center">EUOC Big Weekend: Knockout sprint training day</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 17th Jan</span></h5>
<p class="text-center">An elite knockout sprint training day on a newly mapped part of Livingston, hosted in connection with the EUOC Big Weekend.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3898" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3814" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" class="img-fluid" style="width: 100%;" alt="HAVOC-SOS Mid-week Winter Series No7 Colchester" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 24th January</h5>
<h4 class="text-primary text-center">HAVOC-SOS Mid-week Winter Series No7 Colchester</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 23rd Jan</span></h5>
<p class="text-center">Mid week street event</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3814" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3730" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/skiwales.jpg" class="img-fluid" style="width: 100%;" alt="Welsh BASS Alpine Championships 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">24 - 26 January</h5>
<h4 class="text-primary text-center">Welsh BASS Alpine Championships 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 19th Jan</span></h5>
<p class="text-center"><b style="color:#FD3004">Early Bird prices (&pound;55) until 12th January then late entry fee (&pound;75)</b><br/><br/>WELSH BASS ALPINE CHAMPIONSHIPS 2024 &ndash; CHAMPERY, SWITZERLAND&rsquo;S GATEWAY TO THE PORTES DU SOLEIL SKI REGION</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3730" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3935" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" class="img-fluid" style="width: 100%;" alt="Highwoods Country Park" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 28th January</h5>
<h4 class="text-primary text-center">Highwoods Country Park</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 27th Jan</span></h5>
<p class="text-center">Regional Colour Coded event including ESSOL (Essex &amp; Suffolk School League)</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3935" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3987" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/devon_banner.png" class="img-fluid" style="width: 100%;" alt="Mutters Moor" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 28th January</h5>
<h4 class="text-primary text-center">Mutters Moor</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 21st Jan</span></h5>
<p class="text-center">Colour coded event around Mutters Moor heathland for both experienced and beginner orienteers.<br/><br/>Late entries permitted if maps are available.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3987" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3923" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/bkolong.png" class="img-fluid" style="width: 100%;" alt="The Concorde Chase Weekend" />
</div>
<div class="modal-body">
<h5 class="text-center">27 - 28 Jan 2024</h5>
<h4 class="text-primary text-center">The Concorde Chase Weekend</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 24th Jan</span></h5>
<p class="text-center">Come join us for a weekend of orienteering hosted by Berkshire Orienteers. <br/><br/>The Urban race on Saturday is at Birch Hill, based at South Hill Park - a lovely location offering excellent facilities including a cafe and bar.<br/><br/>The Forest race on Sunday is at Barossa and Poors Allotment with Assembly and Download based at Collingwood College in Camberley.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3923" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3926" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/armyathletics.jpg" class="img-fluid" style="width: 100%;" alt="Inter-Corps Cross Country Championships 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 31st January</h5>
<h4 class="text-primary text-center">Inter-Corps Cross Country Championships 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 30th Jan</span></h5>
<p class="text-center">This is a closed competition. Corps team managers will be invited to nominate their teams and will be given a passcode to get access.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3926" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3738" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/havoc.jpg" class="img-fluid" style="width: 100%;" alt="HAVOC-SOS 2023/24 Winter Series No.8 - Hornchurch East" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 7th February</h5>
<h4 class="text-primary text-center">HAVOC-SOS 2023/24 Winter Series No.8 - Hornchurch East</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 10th Jan</span></h5>
<p class="text-center">Mid week street event</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3738" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel4000" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/SOCfull.png" class="img-fluid" style="width: 100%;" alt="Micheldever Wood - SCOA League" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 11th February</h5>
<h4 class="text-primary text-center">Micheldever Wood - SCOA League</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries open 1st Jan</span></h5>
<p class="text-center">Forest orienteering near Winchester</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=4000" onclick="this.innerHTML = 'Connecting . . .';return true;">More Information</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3863" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/quantock.jpg" class="img-fluid" style="width: 100%;" alt="Street Series 4 - Dunster" />
</div>
<div class="modal-body">
<h5 class="text-center">Thursday 15th February</h5>
<h4 class="text-primary text-center">Street Series 4 - Dunster</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 14th Feb</span></h5>
<p class="text-center">A picturesque village on the edge of Exmoor near Minehead.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3863" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3693" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/ridgerunners.jpg" class="img-fluid" style="width: 100%;" alt="Caerphilly Trail 5K and 10K" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 18th February</h5>
<h4 class="text-primary text-center">Caerphilly Trail 5K and 10K</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 13th Feb</span></h5>
<p class="text-center">Whether you&rsquo;re looking for a thrilling fast race to push you on multi-terrain (there is a great downhill single-track!), a serene morning on the trails or a race to start your trail running adventures - this race has something for you.<br/> <br/>Both routes will be fully marked so you can relax and enjoy the beautiful countryside around Caerphilly. You will pass through fields, wood ...</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3693" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3815" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/essexstragglers.jpg" class="img-fluid" style="width: 100%;" alt="HAVOC-SOS Mid-week Winter Series No9 Hatfield Peverel" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 21st February</h5>
<h4 class="text-primary text-center">HAVOC-SOS Mid-week Winter Series No9 Hatfield Peverel</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Mid week street event</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3815" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3948" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/sn.png" class="img-fluid" style="width: 100%;" alt="SN Saturday Series 2023#5: Hindhead" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 24th February</h5>
<h4 class="text-primary text-center">SN Saturday Series 2023#5: Hindhead</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries open 14th Jan</span></h5>
<p class="text-center">A range of courses increasing in length and complexity for all the family.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3948" onclick="this.innerHTML = 'Connecting . . .';return true;">More Information</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3881" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/welly2024banner2.jpg" class="img-fluid" style="width: 100%;" alt="Welly Trail Race 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 25th February</h5>
<h4 class="text-primary text-center">Welly Trail Race 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 22nd Feb</span></h5>
<p class="text-center">Choose between The Chester House 7 Mile / Half Marathon / New 20 Mile distances. An exciting race where you will need to plan ahead and be prepared. Key navigation points will be marked, but runners will need to download the maps - the challenge is finding your way around the course!</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3881" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3739" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/havoc.jpg" class="img-fluid" style="width: 100%;" alt="HAVOC-SOS 2023/24 Winter Series No.10 - TBC" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 6th March</h5>
<h4 class="text-primary text-center">HAVOC-SOS 2023/24 Winter Series No.10 - TBC</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Mid week street event</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3739" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3974" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/brutalbanner.png" class="img-fluid" style="width: 100%;" alt="Brutal - Chawton" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 9th March</h5>
<h4 class="text-primary text-center">Brutal - Chawton</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 7th Mar</span></h5>
<p class="text-center">We are visiting this exciting venue again. Overloaded with all the Brutal elements you love - water, mud and hills! This venue features a canicross option if you want to run with your dog.<br/><br/>This route combines the excellent features on Brick Kiln Farm and the steep-sided valley within Chawton Forest.<br/> <br/>The farm has an amazing section of woods used for 4x4 events so the ground i ...</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3974" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3864" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/quantock.jpg" class="img-fluid" style="width: 100%;" alt="Street Series 5 - Galmington" />
</div>
<div class="modal-body">
<h5 class="text-center">Thursday 14th March</h5>
<h4 class="text-primary text-center">Street Series 5 - Galmington</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 13th Mar</span></h5>
<p class="text-center">Streets and footpaths in this suburb of Taunton.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3864" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3767" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/hendy.jpg" class="img-fluid" style="width: 100%;" alt="Hendy Eastleigh 10K 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 24th March</h5>
<h4 class="text-primary text-center">Hendy Eastleigh 10K 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 28th Feb</span></h5>
<p class="text-center">The event is renowned as a fast, flat course and as the home of the PB is an ideal opportunity to record personal and seasons best times. We were delighted to be named in Runners World top ten 10K races in 2019.</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3767" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3878" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/hendy.jpg" class="img-fluid" style="width: 100%;" alt="Hendy Eastleigh Fun Run 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 24th March</h5>
<h4 class="text-primary text-center">Hendy Eastleigh Fun Run 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 20th Mar</span></h5>
<p class="text-center">Hendy Eastleigh Fun Run 2024 - run 1.2km around Fleming Park</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3878" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3930" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="Barry Buddon FAST Half Marathon" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 28th April</h5>
<h4 class="text-primary text-center">Barry Buddon FAST Half Marathon</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 27th Apr</span></h5>
<p class="text-center">The flattest Half Marathon in Scotland, run completely on private &amp; closed roads.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3930" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3977" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/brutalbanner.png" class="img-fluid" style="width: 100%;" alt="Brutal - Ower Challenge!" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 4th May</h5>
<h4 class="text-primary text-center">Brutal - Ower Challenge!</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 2nd May</span></h5>
<p class="text-center"><b>The Format</b><br/><br/>The course loop will be somewhere in the region of 4km. The challenge is to complete as many laps as you can within 4 hours. You can do this either on your own, as a pair or a team of 3 or 4. The pairs and teams will hand over in between each lap. This event is canicross friendly.<br/><br/>The kids option will allow them to run a single lap at any point during the 4 ...</p>
<p class="text-center"><i class="fas fa-car"></i> Car Sharing available</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3977" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3973" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/hurstbourne5.png" class="img-fluid" style="width: 100%;" alt="HBT Fun Run" />
</div>
<div class="modal-body">
<h5 class="text-center">Saturday 4th May</h5>
<h4 class="text-primary text-center">HBT Fun Run</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 2nd May</span></h5>
<p class="text-center">A 2Km (ish) fun run in the heart of the beautiful North Wessex Downs.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3973" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3953" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff 5k & 10k Obstacle Course Challenge FIFE, Scotland. May 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 12th May</h5>
<h4 class="text-primary text-center">MacTuff 5k & 10k Obstacle Course Challenge FIFE, Scotland. May 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 11th May</span></h5>
<p class="text-center">5k &amp; 10k Obstacle Course Challenge for Adults</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3953" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3938" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff Kids Obstacle Course Challenge. FIFE Scotland May 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 12th May</h5>
<h4 class="text-primary text-center">MacTuff Kids Obstacle Course Challenge. FIFE Scotland May 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 11th May</span></h5>
<p class="text-center">Obstacle course challenge for children aged 5-16 participating with adult guidance.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3938" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3991" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff Really Muddy 5k & 10k ABERDEEN May 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 19th May</h5>
<h4 class="text-primary text-center">MacTuff Really Muddy 5k & 10k ABERDEEN May 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 18th May</span></h5>
<p class="text-center">5k &amp; 10k Really Muddy Run Challenge for Adults</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3991" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3990" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff Really Muddy Kids ABERDEEN May 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 19th May</h5>
<h4 class="text-primary text-center">MacTuff Really Muddy Kids ABERDEEN May 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 11th May</span></h5>
<p class="text-center">Obstacle course challenge for children aged 5-16 participating with adult guidance.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3990" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3994" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff Really Muddy 5k & 10k LONDON SOUTH EAST June 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 9th June</h5>
<h4 class="text-primary text-center">MacTuff Really Muddy 5k & 10k LONDON SOUTH EAST June 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 8th Jun</span></h5>
<p class="text-center">5k &amp; 10k Really Muddy Run Challenge for Adults</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3994" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3993" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/mactuff.jpg" class="img-fluid" style="width: 100%;" alt="MacTuff Really Muddy Kids LONDON SOUTH EAST June 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 9th June</h5>
<h4 class="text-primary text-center">MacTuff Really Muddy Kids LONDON SOUTH EAST June 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 1st Jun</span></h5>
<p class="text-center">Obstacle course challenge for children aged 5-16 participating with adult guidance.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3993" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3924" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/runningmania.jpg" class="img-fluid" style="width: 100%;" alt="Exbury Gardens 10K 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Sunday 23rd June</h5>
<h4 class="text-primary text-center">Exbury Gardens 10K 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries close 16th Jun</span></h5>
<p class="text-center">Welcome to the newest and one of the south's most picturesque 10k's based at the beautiful Exbury Gardens in the New Forest. Your run, on this flat/undulating course, starts in the stunning gardens and takes you through glorious countryside to the scenic Lepe beach with panoramic views across the Solent to the Isle of Wight. You will then continue your journey back to the fini ...</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3924" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3980" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/portsmouthjoggers.png" class="img-fluid" style="width: 100%;" alt="PJC Summer Cross Country 2024" />
</div>
<div class="modal-body">
<h5 class="text-center">Wednesday 17th July</h5>
<h4 class="text-primary text-center">PJC Summer Cross Country 2024</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries are open!</span></h5>
<p class="text-center">Wednesday 17th July at 7 pm. Approx 5 mile cross country route through Queen Elizabeth Country Park which includes chip timing.</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3980" onclick="this.innerHTML = 'Connecting . . .';return true;">Information and Sign Up</a></span>
</div>
</div>
</div>
</div>
</div>
<div class="modal fade" id="panel3806" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered border-primary" role="document">
<div class="modal-content">
<div class="modal-header bg-white m-0 p-0 border-0">
<img src="https://racesignup.co.uk/lib/logos/clywdian.jpg" class="img-fluid" style="width: 100%;" alt="Cilcain Mountain Race" />
</div>
<div class="modal-body">
<h5 class="text-center">Monday 26th August</h5>
<h4 class="text-primary text-center">Cilcain Mountain Race</h4>
<h5 class="text-center"><span class="badge badge-dark rounded-0">Entries open 1st Jan</span></h5>
<p class="text-center">Cilcain Mountain Race AS PM<br/><br/>1pm Start from St.Marys Church, Cilcain Show, Clwydian Range, North Wales<br/>Reg from 10am</p>
<div class="clearfix">
<span class="float-left"><button type="button" class="btn btn-secondary float-left" data-dismiss="modal">Close</button></span>
<span class="float-right"><a name="submitButton" class="btn btn-primary float-right" href="/site/event.php?eventid=3806" onclick="this.innerHTML = 'Connecting . . .';return true;">More Information</a></span>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="container">
<h2 class="mt-4 text-dark">See what our customers are saying . . .</h2>
<div class="progress rounded-0 mb-3" style="height: 4px;"><div class="progress-bar bg-dark" role="progressbar" style="width: 100%"></div></div>
<div class="row">
<div class="col-md-4 mb-4">
<div class="card h-100 rounded-0 border-dark p-2">
<div class="card-body">
<img class="mb-1" src="//racesignup.co.uk/lib/icons/bigquotes.png" width="40">
<h5>Excellent entry system</h5>
<span>Excellent entry system, good support and prompt payment.</span>
</div>
<div class="card-footer bg-white border-0">
<div class="d-flex flex-row align-items-center">
<img class="rounded-circle" src="//racesignup.co.uk/lib/icons/customer.png" width="40">
<div class="ml-2">Julian</div>
</div>
</div>
</div>
</div>
<div class="col-md-4 mb-4">
<div class="card h-100 rounded-0 border-dark p-2">
<div class="card-body">
<img class="mb-1" src="//racesignup.co.uk/lib/icons/bigquotes.png" width="40">
<h5>Slick and easy to use</h5>
<span>Very slick service allowing for complex requirements (different competitor types, courses, start windows etc). Registration for subsequent races is very quick as all details are stored.</span>
</div>
<div class="card-footer bg-white border-0">
<div class="d-flex flex-row align-items-center">
<img class="rounded-circle" src="//user-images.trustpilot.com/5f6bb449d41eaa2893083c23/73x73.png" width="40">
<div class="ml-2">Matthias M</div>
</div>
</div>
</div>
</div>
<div class="col-md-4 mb-4">
<div class="card h-100 rounded-0 border-dark p-2">
<div class="card-body">
<img class="mb-1" src="//racesignup.co.uk/lib/icons/bigquotes.png" width="40">
<h5>Agile and responsive</h5>
<span>Agile and responsive to our developing expectations. A great job. Thank you.</span>
</div>
<div class="card-footer bg-white border-0">
<div class="d-flex flex-row align-items-center">
<img class="rounded-circle" src="//racesignup.co.uk/lib/icons/customer.png" width="40">
<div class="ml-2">Chris H - Chairman AOA</div>
</div>
</div>
</div>
</div>
</div>
<div class="row m-3">
<div class="col-md-12">
</div>
</div>
</div>
<footer class="py-2 bg-dark text-white d-print-none">
<div class="container">
<div class="row">
<div class="col-md-9">
<nav><a class="text-white" href="/">Events</a> | <a class="text-white" href="//race-results.info">Results</a> | <a class="text-white" href="/site/about.php">About</a> | <a class="text-white" href="/site/legal.php">Terms</a> | <a class="text-white" href="//raceadmin.racesignup.co.uk">Race Admin</a> |</nav>
<p class="small py-2">&copy; Racesignup Ltd 2023</p>
</div>
<div class="col-md-3">
</div>
</div>
</div>
</footer>
<script src="https://racesignup.co.uk/site/vendor/jquery/jquery.min.js"></script>
<script src="https://racesignup.co.uk/site/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">
 window.cookieconsent_options = {"message":"This website uses cookies to ensure you get the best experience on our website","dismiss":"Got it!","learnMore":"More info","link":"https://racesignup.co.uk/site/policy/cookie.php","theme":"dark-top"};
</script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.9/cookieconsent.min.js"></script>
<script>
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});
</script>

<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f34f88e048cbf50"></script>
<script type="text/javascript">
  
  
  jQuery(document).ready(function($) {
});
  
  
  
    $(document).ready(function() {
      // executes when HTML-Document is loaded and DOM is ready
      $( ".card" ).hover(
        function() {
          $(this).addClass('shadow').css('cursor', 'pointer'); 
        }, function() {
          $(this).removeClass('shadow');
        }
      );
    });
// GO when enter pressed in postcode
    var input = document.getElementById("postcode");
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("gobtn").click();
      }
    });
    function setpostcode(){
      input = document.getElementById("postcode");
      postcode = input.value.toUpperCase();
      urlParam = '?postcode='.concat(postcode);
      
      if(document.getElementById("pcsave").checked){
        urlParam = urlParam + '&pcsave=1';
      }else{
        urlParam = urlParam + '&pcsave=0';
      }
      
      window.location.href = location.protocol + '//' + location.host + location.pathname + urlParam;
    }
  </script>
</body>
</html>
`;
