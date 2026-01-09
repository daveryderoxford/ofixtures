export const siEntriesFile = `
<!DOCTYPE html>

<html xmlns="https://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="content-language" content="en-GB" />

	<title>SiEntries - Events List</title>
	<meta name="description" content="SiEntries is an Online Entries and Memberships System designed to simplify entering and administering any type of event which uses pre-entries." />
	<meta name="copyright" content="SiEntries Ltd." />
	<meta name="author" content="SiEntries Ltd." />
	<meta name="robots" content="all" />

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

	<link rel="stylesheet" href="https://www.sientries.co.uk/common/jquery/DataTables-1.10.20/datatables.min.css" type="text/css" />
	<link rel="stylesheet" href="https://www.sientries.co.uk/common/jquery/jquery-ui-1.12.1/jquery-ui.min.css" type="text/css" />
	<link rel="stylesheet" href="https://www.sientries.co.uk/common/openlayers-5/ol.css" type="text/css" />
	<link rel="stylesheet" href="https://www.sientries.co.uk/skins/sientries_new/fonts/stylesheet.css?ver=2" type="text/css" />
	<link rel="stylesheet" href="https://www.sientries.co.uk/skins/sientries_new/fontawesome/css/all.min.css?ver=2" type="text/css" />

	<link rel="stylesheet" href="https://www.sientries.co.uk/skins/sientries_new/screen.css?ver=241" type="text/css" media="all" />
	<link rel="stylesheet" href="https://www.sientries.co.uk/skins/sientries_new/print.css?ver=241" type="text/css" media="print" />

	<script type="text/javascript">
		var JscriptPath = 'https://www.sientries.co.uk';
	</script>

	<script type="text/javascript" src="https://www.sientries.co.uk/common/jquery/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/jquery/DataTables-1.10.20/datatables.min.js"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/jquery/jquery-ui-1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/libphonenumber-js/bundle/libphonenumber-max.js?ver=1.9.10"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/openlayers-5/ol.js"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/behaviours_pk.js?ver=27"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/val_form_data_pk.js?ver=46"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/common_fns_pk.js?ver=40"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/payment_fns_pk.js?ver=18"></script>
	<script type="text/javascript" src="https://www.sientries.co.uk/common/mkh_custom_sorts_pk.js?ver=14"></script>

	<link rel="icon" href="https://www.sientries.co.uk/favicon.ico?v=7" type="image/x-icon" />
	<link rel="shortcut icon" sizes="196x196" href="https://www.sientries.co.uk/android-256x256.png?v=4">
	<link rel="shortcut icon" sizes="192x192" href="https://www.sientries.co.uk/android-192x192.png?v=4">
	<link rel="shortcut icon" sizes="128x128" href="https://www.sientries.co.uk/android-128x128.png?v=4">
	<link rel="shortcut icon" href="https://www.sientries.co.uk/favicon.ico?v=7" type="image/x-icon" />

	<link rel="image_src" type="image/png" href="https://www.sientries.co.uk/images/sientries-logo-sm.png" />

	<meta property="og:site_name" content="SiEntries" />
	<meta property="og:title" content="Events List" />	<meta property="og:image" content="https://www.sientries.co.uk/images/sientries-logo-sm.png" />
	<meta property="og:description" content="SiEntries is an Online Entries and Memberships System designed to simplify entering and administering any type of event which uses pre-entries." />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@sientries" />
	<meta name="twitter:title" content="Events List" />	<meta name="twitter:image" content="https://www.sientries.co.uk/images/sientries-logo-sm.png" />
	<meta name="twitter:description" content="SiEntries is an Online Entries and Memberships System designed to simplify entering and administering any type of event which uses pre-entries." />

	<meta name="application-name" content="SiEntries">
	<meta name="msapplication-TileColor" content="#ffffff"/>
	<meta name="msapplication-square70x70logo" content="mstile-tiny.png">
	<meta name="msapplication-square150x150logo" content="mstile-square.png">
	<meta name="msapplication-wide310x150logo" content="mstile-wide.png">
	<meta name="msapplication-square310x310logo" content="mstile-large.png">

			<script type="text/javascript" src="https://maps-api-ssl.google.com/maps/api/ko&callback=Function.prototype"></script>
		<script type="text/javascript" src="https://www.sientries.co.uk/common/idx_index_filter_pk.js?ver=46"></script>

	<script type="text/javascript">

					var f_lat = '';
			var f_lng = '';
			var old_elocn = '';
		
		$(document).ready(function()
		{
			idx_initiatePage('H', '');

							
									// Google Maps is still needed for the Geocoding lookup!
					geocoder = new google.maps.Geocoder();
									});

	</script>



</head>
<body id="no-js"><script>document.body.id="js"</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-LKFWDLCFBP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LKFWDLCFBP', {
    cookie_domain: '.sientries.co.uk',
    cookie_flags: 'SameSite=None;Secure',
  });
</script>

<div id="page_header">
	<div class="auto_margin_header">
		<a href="https://www.sientries.co.uk/index.php" title="Click to go to the SiEntries Events List" id="sientries_logo"><strong>Si</strong>Entries<span class="smaller">Online Entries System</span></a>
		<div id="nav">
			<ul>
				<li><span class="menu_item"><a href="https://www.sientries.co.uk/index.php?page=L" title="Display a list of all current events"><i class="fa fa-list" aria-hidden="true"></i> Events List</a></span></li>
				<li><span class="menu_item"><a href="https://www.sientries.co.uk/index.php?page=M" title="Display a map of all current events"><i class="fa fa-map-marker-alt" aria-hidden="true"></i> Events Map</a></span></li>
				<li><span class="menu_item"><a href="https://www.sientries.co.uk/membership.php" title="Display a list of all current memberships"><i class="fa fa-users" aria-hidden="true"></i> Memberships</a></span></li>
				<li><span class="menu_item"><a href="https://www.sientries.co.uk/new_event.php" title="Find out how to add your event or membership to SiEntries"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Your Event</a></span></li>
				<li><span class="menu_item"><a href="https://www.sientries.co.uk/help.php" title="View help and tips on using SiEntries"><i class="fa fa-question-circle" aria-hidden="true"></i> Help</a></span></li>
			</ul>
		</div>
		<div id="header_follow">
			<div id="header_follow_block">
				<div id="header_follow_text">Follow <span id="header_follow_large">SiEntries</span><span id="header_follow_small">us</span></div>
				<div id="header_follow_links">
					<a href="https://twitter.com/SiEntries" target="_blank" title="Follow us on Twitter"><span class="header_follow_icon"><i class="fab fa-twitter" aria-hidden="true"></i></span></a>
					<a href="https://www.facebook.com/SiEntries/" target="_blank" title="Follow us on Facebook"><span class="header_follow_icon"><i class="fab fa-facebook" aria-hidden="true"></i></span></a>
					<a href="https://www.instagram.com/sientries/" target="_blank" title="Follow us on Instagram"><span class="header_follow_icon"><i class="fab fa-instagram" aria-hidden="true"></i></span></a>
				</div>
			</div>
		</div>
	</div>

	<div class="header_follow_colour"></div>
	<div class="clear"></div>
</div>

<div id="container">

		<div class="screen-bg-image" style="background-image: url('https://www.sientries.co.uk/images/header_slides/R2.jpg');">
		<div class="auto_margin_header">
			<div class="header-caption">
				<h2><span style="color: #FFFFFF"><span class="large_text">Find your perfect event</span></span></h2>
									<div class="cap_buttons">
													<a href="https://www.sientries.co.uk/index.php?page=L&amp;af=eg_R:Y" class="cap_button">Running &amp; Walking</a>
							<a href="https://www.sientries.co.uk/index.php?page=L&amp;af=eg_C:Y" class="cap_button orange_bg">Cycling</a>
							<a href="https://www.sientries.co.uk/index.php?page=L&amp;af=eg_W:Y" class="cap_button blue_bg">Watersports</a>
							<a href="https://www.sientries.co.uk/index.php?page=L&amp;af=eg_M:Y" class="cap_button purple_bg">Multisport</a>
											</div>
													<a href="https://www.sientries.co.uk/about_sientries.php?page=L" class="cap_about_button">About SiEntries</a>
							</div>
		</div>
	</div>

<div class="auto_margin_container">
<div id="container_a">

	<div class="panel-left-header panel-left-header-public" id="leftOptions"><i class="fa fa-bars menu-icon" aria-hidden="true"></i> SiEntries Options <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
	<div class="panel-left-detail" id="leftOptionsT">
		<ul class="menu">
			<li><a href="https://www.sientries.co.uk/index.php?page=L" title="Displays a list of all current events">Events List</a></li>
			<li><a href="https://www.sientries.co.uk/index.php?page=M" title="Displays a map of all current events">Events Map</a></li>
			<li><a href="https://www.sientries.co.uk/membership.php" title="Displays a list of all current memberships">Memberships List</a></li>
			<li><a href="https://www.sientries.co.uk/new_event.php" title="Find out how to add your event or membership to SiEntries">Add Your Event / Membership</a></li>
			<li><a href="https://www.sientries.co.uk/help.php" title="View help and tips on using SiEntries">Help</a></li>
		</ul>
	</div>

						<div class="panel-left-header panel-left-header-public" id="leftLogReg"><i class="fa fa-user menu-icon" aria-hidden="true"></i> Login / Register <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
			<div class="panel-left-clean" id="leftLogRegT">
				<div class="panel-left-clean-padding">
					<form method="post" action="https://www.sientries.co.uk/login/p_panel_login.php" id="panel-login" class="panel-form" onsubmit="return validate_loginform();">
						<div><label for="llogin">Email Address</label></div>
						<div class="type-input"><input type="text" name="llogin" id="llogin" value="" size="24" maxlength="255" title="Please enter either the email address you used to register for SiEntries or your SiEntries ID. Note that email addresses are NOT case sensitive." /></div>
						<div><label for="lpassword">Password</label></div>
						<div class="type-input"><input type="password" name="lpassword" id="lpassword" value="" size="24" maxlength="20" title="Please enter your existing password. Passwords can be any combination of letters, number or symbols between 6 and 20 characters in length. Note that passwords ARE case sensitive." /></div>
						<div class="type-save_details-wrap">
							<div class="type-tickbox"><input type="checkbox" name="lcheck" id="lcheck" value="Y" class="form-checkbox" title="Tick this box to automatically log in to SiEntries next time you access the site from this computer. Doing so will create a cookie on your device, so please see our Privacy Policy for more information about our use of cookies. This option should only be set if you are the sole user of this computer, otherwise anybody else who uses this PC will also be able to access and change your entry details." /></div>
							<div class="type-ticklabel"><label for="lcheck">Remember Me</label></div>
						</div>
						<div>
							<input type="submit" name="btn_login" id="btn_login" value="LOG IN" class="button button-large button-forward" onclick="ButtonLogin=true" />
							<input type="submit" name="btn_register" id="btn_register" value="REGISTER HERE" class="button button-small button-edit" onclick="ButtonLogin=false" />
							<input type="submit" name="btn_reissue" id="btn_reissue" value="REISSUE PASSWORD" class="button button-small button-backward" onclick="ButtonLogin=false" />
						</div>
					</form>
				</div>
			</div>
			
			<div class="panel-left-padding"></div>
		<div class="panel-left-header panel-left-header-public" id="leftFilter"><i class="fa fa-search" aria-hidden="true"></i> Filter Events <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
		<div class="panel-left-clean" id="leftFilterT">
			<div class="panel-left-clean-padding">
													<div class="index_button_div"><a href="https://www.sientries.co.uk/anytime" title="Displays a list of all anytime Events"><div class="button button-small index_anytime">Anytime Events List</div></a></div>
													<div class="index_button_div"><a href="https://www.sientries.co.uk/orienteering" title="Displays a list of all British Orienteering events"><div class="button button-small index_orienteering">British Orienteering List</div></a></div>
								<hr />
				<form method="get" action="https://www.sientries.co.uk/index.php" id="filter-form" name="filter-form" class="panel-form" >
					<div><label for="ename">Event Name</label></div>
					<div class="type-input"><input type="text" name="ename" id="ename" value="" size="24" maxlength="40" autocomplete="ename" title="To search for a specific event enter all or part of the event name here." onfocus="idx_ename_focus()" onblur="idx_ename_blur()" /></div>
					<div>Event Date</div>
					<div class="type-input"><label for="efrom"></label><input type="text" name="efrom" id="efrom" value="" size="13" maxlength="13" autocomplete="efrom" title="To search for events on or after a specific date enter from date here." onfocus="idx_efrom_focus()" onchange="idx_efrom_change()" /><label for="eto"></label><input type="text" name="eto" id="eto" value="" size="13" maxlength="13" autocomplete="off" title="To search for events on or before a specific date enter from date here." onfocus="idx_eto_focus()" onchange="idx_eto_change()" /></div>
											<div>Specific Location</div>
						<div class="type-input"><label for="edist"></label><input type="text" name="edist" id="edist" value="" size="3" maxlength="5" autocomplete="edist" title="To find events passing within a given distance of a location or post code then please enter the mileage here." onfocus="idx_edist_focus()" onblur="idx_edist_blur()" /><label for="elocn"></label><input type="text" name="elocn" id="elocn" value="" size="19" maxlength="40" autocomplete="off" title="To find events passing within a given distance of a location or post code then please enter the location (e.g. 'Salisbury, Hampshire') or a post code (e.g. 'SP1 2EJ') here." onfocus="idx_elocn_focus()" onblur="idx_elocn_blur()" /></div>
						<div class="clear"></div>

													<div class="sub_toggler dropdown_reveal">Event Type Filter <i class="fa fa-chevron-down down" aria-hidden="true"></i></div>
							<div class="sub_toggle_box toggle_initial_show">
								<div class="toggle_padding">
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type_event_group"><label for="eg_R"></label><input type="checkbox" name="eg_R" id="eg_R" class="form-checkbox" value="Y" onclick="idx_event_group_set('R');" title="Tick this box if you want to show Walking / Running events." /></div>
											<div class="etg_reveal dropdown_reveal  filter_expandable">
												<div class="type-text"><span class="text_eg_R">Walking / Running</span></div>
												<div class="type-dropdown"><i class="fa fa-chevron-down down" aria-hidden="true"></i></div>										</div>
											</div>
																				<div class="etg_hidden_content toggle_initial_show">
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_AL" id="et_R_AL" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Athletics Meet events." /></div>
														<div class="type-text"><label for="et_R_AL">Athletics Meet</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_CA" id="et_R_CA" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Canicross events." /></div>
														<div class="type-text"><label for="et_R_CA">Canicross</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_FR" id="et_R_FR" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Fell / Hill Race events." /></div>
														<div class="type-text"><label for="et_R_FR">Fell / Hill Race</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_MM" id="et_R_MM" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" checked="checked" title="Tick this box if you want to show Mountain Marathon events." /></div>
														<div class="type-text"><label for="et_R_MM">Mountain Marathon</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_OR" id="et_R_OR" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" checked="checked" title="Tick this box if you want to show Orienteering events." /></div>
														<div class="type-text"><label for="et_R_OR">Orienteering</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_RR" id="et_R_RR" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Road Race events." /></div>
														<div class="type-text"><label for="et_R_RR">Road Race</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_WR" id="et_R_WR" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Running / Walking events." /></div>
														<div class="type-text"><label for="et_R_WR">Running / Walking</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_TR" id="et_R_TR" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Trail Race events." /></div>
														<div class="type-text"><label for="et_R_TR">Trail Race</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_UL" id="et_R_UL" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Ultra Running events." /></div>
														<div class="type-text"><label for="et_R_UL">Ultra Running</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_R_LD" id="et_R_LD" class="form-checkbox" value="Y" onclick="idx_event_type_set('R');" title="Tick this box if you want to show Walking events." /></div>
														<div class="type-text"><label for="et_R_LD">Walking</label></div>
													</div>
												</div>
																				</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type_event_group"><label for="eg_C"></label><input type="checkbox" name="eg_C" id="eg_C" class="form-checkbox" value="Y" onclick="idx_event_group_set('C');" title="Tick this box if you want to show Cycling events." /></div>
											<div class="etg_reveal dropdown_reveal  filter_expandable">
												<div class="type-text"><span class="text_eg_C">Cycling</span></div>
												<div class="type-dropdown"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>										</div>
											</div>
																				<div class="etg_hidden_content">
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_CR" id="et_C_CR" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show Cycle Race events." /></div>
														<div class="type-text"><label for="et_C_CR">Cycle Race</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_CY" id="et_C_CY" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show Cycling events." /></div>
														<div class="type-text"><label for="et_C_CY">Cycling</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_CX" id="et_C_CX" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show Cyclo-cross events." /></div>
														<div class="type-text"><label for="et_C_CX">Cyclo-cross</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_CS" id="et_C_CS" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show Cyclosportive events." /></div>
														<div class="type-text"><label for="et_C_CS">Cyclosportive</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_GR" id="et_C_GR" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show Gravel events." /></div>
														<div class="type-text"><label for="et_C_GR">Gravel</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_MB" id="et_C_MB" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show Mountain Bike events." /></div>
														<div class="type-text"><label for="et_C_MB">Mountain Bike</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_ED" id="et_C_ED" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show MTB Enduro events." /></div>
														<div class="type-text"><label for="et_C_ED">MTB Enduro</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_C_TQ" id="et_C_TQ" class="form-checkbox" value="Y" onclick="idx_event_type_set('C');" title="Tick this box if you want to show MTB Orienteering events." /></div>
														<div class="type-text"><label for="et_C_TQ">MTB Orienteering</label></div>
													</div>
												</div>
																				</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type_event_group"><label for="eg_W"></label><input type="checkbox" name="eg_W" id="eg_W" class="form-checkbox" value="Y" onclick="idx_event_group_set('W');" title="Tick this box if you want to show Water Sports events." /></div>
											<div class="etg_reveal dropdown_reveal  filter_expandable">
												<div class="type-text"><span class="text_eg_W">Water Sports</span></div>
												<div class="type-dropdown"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>										</div>
											</div>
																				<div class="etg_hidden_content">
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_W_KY" id="et_W_KY" class="form-checkbox" value="Y" onclick="idx_event_type_set('W');" title="Tick this box if you want to show Kayaking / Canoeing events." /></div>
														<div class="type-text"><label for="et_W_KY">Kayaking / Canoeing</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_W_RW" id="et_W_RW" class="form-checkbox" value="Y" onclick="idx_event_type_set('W');" title="Tick this box if you want to show Rowing events." /></div>
														<div class="type-text"><label for="et_W_RW">Rowing</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_W_SL" id="et_W_SL" class="form-checkbox" value="Y" onclick="idx_event_type_set('W');" title="Tick this box if you want to show Sailing events." /></div>
														<div class="type-text"><label for="et_W_SL">Sailing</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_W_SW" id="et_W_SW" class="form-checkbox" value="Y" onclick="idx_event_type_set('W');" title="Tick this box if you want to show Swimming events." /></div>
														<div class="type-text"><label for="et_W_SW">Swimming</label></div>
													</div>
												</div>
																				</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type_event_group"><label for="eg_M"></label><input type="checkbox" name="eg_M" id="eg_M" class="form-checkbox" value="Y" onclick="idx_event_group_set('M');" title="Tick this box if you want to show Multisport events." /></div>
											<div class="etg_reveal dropdown_reveal  filter_expandable">
												<div class="type-text"><span class="text_eg_M">Multisport</span></div>
												<div class="type-dropdown"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>										</div>
											</div>
																				<div class="etg_hidden_content">
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_M_AR" id="et_M_AR" class="form-checkbox" value="Y" onclick="idx_event_type_set('M');" title="Tick this box if you want to show Adventure Race events." /></div>
														<div class="type-text"><label for="et_M_AR">Adventure Race</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_M_TA" id="et_M_TA" class="form-checkbox" value="Y" onclick="idx_event_type_set('M');" title="Tick this box if you want to show Duathlon / Triathlon events." /></div>
														<div class="type-text"><label for="et_M_TA">Duathlon / Triathlon</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_M_SR" id="et_M_SR" class="form-checkbox" value="Y" onclick="idx_event_type_set('M');" title="Tick this box if you want to show SwimRun events." /></div>
														<div class="type-text"><label for="et_M_SR">SwimRun</label></div>
													</div>
												</div>
																				</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type_event_group"><label for="eg_O"></label><input type="checkbox" name="eg_O" id="eg_O" class="form-checkbox" value="Y" onclick="idx_event_group_set('O');" title="Tick this box if you want to show Other events." /></div>
											<div class="etg_reveal dropdown_reveal  filter_expandable">
												<div class="type-text"><span class="text_eg_O">Other</span></div>
												<div class="type-dropdown"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>										</div>
											</div>
																				<div class="etg_hidden_content">
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_O_CH" id="et_O_CH" class="form-checkbox" value="Y" onclick="idx_event_type_set('O');" title="Tick this box if you want to show Challenge events." /></div>
														<div class="type-text"><label for="et_O_CH">Challenge</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_O_WK" id="et_O_WK" class="form-checkbox" value="Y" onclick="idx_event_type_set('O');" title="Tick this box if you want to show Course / Workshop events." /></div>
														<div class="type-text"><label for="et_O_WK">Course / Workshop</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_O_MT" id="et_O_MT" class="form-checkbox" value="Y" onclick="idx_event_type_set('O');" title="Tick this box if you want to show Motorcycle Trials events." /></div>
														<div class="type-text"><label for="et_O_MT">Motorcycle Trials</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_O_SC" id="et_O_SC" class="form-checkbox" value="Y" onclick="idx_event_type_set('O');" title="Tick this box if you want to show Social events." /></div>
														<div class="type-text"><label for="et_O_SC">Social</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="et_O_TK" id="et_O_TK" class="form-checkbox" value="Y" onclick="idx_event_type_set('O');" title="Tick this box if you want to show Talk events." /></div>
														<div class="type-text"><label for="et_O_TK">Talk</label></div>
													</div>
												</div>
																				</div>
																				</div>
																	</div>
							</div>
							<div class="clear"></div>
						
													<div class="sub_toggler dropdown_reveal">Location Filter <i class="fa fa-chevron-down" aria-hidden="true"></i></div>
							<div class="sub_toggle_box locations">
								<div class="toggle_padding">
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_1"></label><input type="checkbox" name="co_1" id="co_1" class="form-checkbox" value="Y" onclick="idx_country_set('1');" checked="checked" title="Tick this box if you want to show events located in England." /></div>
											<div class="etg_reveal dropdown_reveal  filter_expandable">
												<div class="type-text"><span class="co_1">England</span></div>
												<div class="type-dropdown"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>											</div>
										</div>
																				<div class="etg_hidden_content">
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_1" id="rg_1_1" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in South West." /></div>
														<div class="type-text"><label for="rg_1_1">South West</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_2" id="rg_1_2" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in South East." /></div>
														<div class="type-text"><label for="rg_1_2">South East</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_3" id="rg_1_3" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in London." /></div>
														<div class="type-text"><label for="rg_1_3">London</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_4" id="rg_1_4" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in East of England." /></div>
														<div class="type-text"><label for="rg_1_4">East of England</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_5" id="rg_1_5" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in East Midlands." /></div>
														<div class="type-text"><label for="rg_1_5">East Midlands</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_6" id="rg_1_6" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in West Midlands." /></div>
														<div class="type-text"><label for="rg_1_6">West Midlands</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_7" id="rg_1_7" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in Yorkshire & Humber." /></div>
														<div class="type-text"><label for="rg_1_7">Yorkshire & Humber</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_8" id="rg_1_8" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in North West." /></div>
														<div class="type-text"><label for="rg_1_8">North West</label></div>
													</div>
												</div>
																						<div class="toggle_padding">
													<div class="filter_tickbox">
														<div class="type_event_group"><input type="checkbox" name="rg_1_9" id="rg_1_9" class="form-checkbox" value="Y" onclick="idx_region_set('1');" checked="checked" title="Tick this box if you want to show located in North East." /></div>
														<div class="type-text"><label for="rg_1_9">North East</label></div>
													</div>
												</div>
																				</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_2"></label><input type="checkbox" name="co_2" id="co_2" class="form-checkbox" value="Y" onclick="idx_country_set('2');" checked="checked" title="Tick this box if you want to show events located in Scotland." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_2">Scotland</span></div>
																							</div>
										</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_3"></label><input type="checkbox" name="co_3" id="co_3" class="form-checkbox" value="Y" onclick="idx_country_set('3');" checked="checked" title="Tick this box if you want to show events located in Wales." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_3">Wales</span></div>
																							</div>
										</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_4"></label><input type="checkbox" name="co_4" id="co_4" class="form-checkbox" value="Y" onclick="idx_country_set('4');" checked="checked" title="Tick this box if you want to show events located in Northern Ireland." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_4">Northern Ireland</span></div>
																							</div>
										</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_5"></label><input type="checkbox" name="co_5" id="co_5" class="form-checkbox" value="Y" onclick="idx_country_set('5');" checked="checked" title="Tick this box if you want to show events located in Republic of Ireland." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_5">Republic of Ireland</span></div>
																							</div>
										</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_7"></label><input type="checkbox" name="co_7" id="co_7" class="form-checkbox" value="Y" onclick="idx_country_set('7');" checked="checked" title="Tick this box if you want to show events located in Isle of Man." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_7">Isle of Man</span></div>
																							</div>
										</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_8"></label><input type="checkbox" name="co_8" id="co_8" class="form-checkbox" value="Y" onclick="idx_country_set('8');" checked="checked" title="Tick this box if you want to show events located in Channel Islands." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_8">Channel Islands</span></div>
																							</div>
										</div>
																				</div>
																			<div class="etg_wrap">
										<div class="filter_tickbox">
											<div class="etg_tick type-options"><label for="co_6"></label><input type="checkbox" name="co_6" id="co_6" class="form-checkbox" value="Y" onclick="idx_country_set('6');" checked="checked" title="Tick this box if you want to show events located in Other / Non-Geographic." /></div>
											<div class="etg_reveal dropdown_reveal ">
												<div class="type-text"><span class="co_6">Other / Non-Geographic</span></div>
																							</div>
										</div>
																				</div>
																	</div>
							</div>
							<div class="clear"></div>
											
					
					
					<div class="type-tickbox-wrap">
						<div class="type-tickbox"><input type="checkbox" name="only_open" id="only_open" class="form-checkbox" value="Y" title="Tick this box if you want to show events that are currently open for entries." /></div>
						<div class="type-ticklabel"><label for="only_open">Only Show Open Events</label></div>
						<div class="clear"></div>
						<div class="type-tickbox"><input type="checkbox" name="save_prefs" id="save_prefs" class="form-checkbox" value="Y" title="If you want to save your filter preferences for next time you visit SiEntries then please tick this box. Doing so will create a cookie on your device, so please see our Privacy Policy for more information about our use of cookies." /></div>
						<div class="type-ticklabel"><label for="save_prefs">Save Filter to My Profile</label></div>
						<div class="clear"></div>
					</div>
										<div class="find-wrap" id="find-wrap"><a href="javascript: idx_set_filter('H', 'L', true, 'B');"><div class="button button-find button-transfer">FILTER EVENTS <i class="fas" aria-hidden="true"></i></div></a></div>
					<div class="find-wrap clear-wrap" id="clear-wrap"><a href="javascript: idx_reset_filter('H', 'L', true, 'R');"><div class="button button-find button-cancel">Show All <i class="fas" aria-hidden="true"></i></div></a></div>
				</form>

			</div>
		</div>
	

	
</div>

<div id="container_b">
	<div id="container_bp">

		<div class="clear"></div>
		<div id="container_d">
			<div id="container_dp">

	<div class="events_list_header">
		<div class="elh_left">
			<h1><span class="event_count_events" id="event_count_events">33 Events</span><span class="event_total_events" id="event_total_events"><span class="js-code"><a href="javascript: idx_reset_filter('H', 'L', false, 'S');">Show<span class="no_small"> all</span> 699 <i class="fas fa-redo" aria-hidden="true"></i></a></span><span class="no-js-code"><a href="https://www.sientries.co.uk/index.php?page=L&amp;all=Y">Show<span class="no_small"> all</span> 699 <i class="fas fa-redo" aria-hidden="true"></i></a></span></span></h1>
		</div>
		<div class="elh_right">
			<div class="left">
				<div class="elh_text_list selected"><a href="https://www.sientries.co.uk/index.php?page=L" title="Displays a list of all current events">LIST</a></div>
				<div class="map_list_switch">
					<div class="list_icon mls_icon selected">
						<a href="https://www.sientries.co.uk/index.php?page=L" title="Displays a list of all current events"><i class="fa fa-list" aria-hidden="true"></i></a>
					</div>
				</div>
			</div>
			<div class="left">
				<div class="elh_text_map"><a href="https://www.sientries.co.uk/index.php?page=M" title="Displays a map of all current events">MAP</a></div>
				<div class="map_list_switch">
					<div class="map_icon mls_icon">
						<a href="https://www.sientries.co.uk/index.php?page=M" title="Displays a map of all current events"><i class="fa fa-map-marker-alt" aria-hidden="true"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="clear"></div>


			<div id="index_table">
										<div class="month_breaker">January <span>2024</span></div>
				<div class="month_wrap">

													<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_edit"><span class="eti_day">Mon</span> <span class="eti_num">1</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786" title="The 23rd New Year Cracker! Start the New Year as you mean to go, with a choice of odds & evens or classic score. The venue will be the interesting mix of mature woodland and fast open areas at Sizergh Castle, near Kendal.">SROC 23rd New Year Cracker</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786" title="Entries Closed - SROC 23rd New Year Cracker"><div class="eti_button button-edit"><span class="eti_link_text">Entries Closed</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>The 23rd New Year Cracker! Start the New Year as you mean to go, with a choice of odds & evens or classic score. The venue will be the interesting mix of mature woodland and fast open areas at Sizergh Castle, near Kendal.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786" title="SROC 23rd New Year Cracker">FIND OUT MORE &raquo;</a><a href="https://www.sroc.org" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/SROC_1964" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/groups/SouthRibbleOC/about/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-edit"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12786" title="Entries Closed - SROC 23rd New Year Cracker"><span class="eti_link_text">Entries Closed</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">6</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/4.svg" alt="East of England" title="East of England" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12791" title="Welcome to one of our 'Saturday series' events on a new area for orienteering. Beginners are very welcome and there are courses for all standards.">HH Hockeridge</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12791" title="Entries Open - HH Hockeridge"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Welcome to one of our 'Saturday series' events on a new area for orienteering. Beginners are very welcome and there are courses for all standards.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12791" title="HH Hockeridge">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.herts-orienteering.club/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/hertsorienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://instagram.com/hhorienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/instagram.svg" alt="Instagram" title="Instagram" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/HertfordshireOrienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12791" title="Entries Open - HH Hockeridge"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">6</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12766" title="North West Night League Event – Dockney Parrock is a relatively small and varied area, criss crossed with several paths and walls.">LOC NW Night League - Dockney Parrock</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12766" title="Entries Open - LOC NW Night League - Dockney Parrock"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>North West Night League Event – Dockney Parrock is a relatively small and varied area, criss crossed with several paths and walls.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12766" title="LOC NW Night League - Dockney Parrock">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.lakeland-orienteering.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandorienteeringclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12766" title="Entries Open - LOC NW Night League - Dockney Parrock"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">7</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/10.svg" alt="Scotland" title="Scotland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12837" title="STAG’s very popular SCORE Events returns in 2024 with the same challenging format.  WE do what WE do as it is GOOD for US and GOOD for YOU!">STAG Score 1+ Strathclyde Country Park</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12837" title="Entries Open - STAG Score 1+ Strathclyde Country Park"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>STAG’s very popular SCORE Events returns in 2024 with the same challenging format.  WE do what WE do as it is GOOD for US and GOOD for YOU!</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12837" title="STAG Score 1+ Strathclyde Country Park">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.stag-orienteering.co.uk/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/STAGglasgow" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/STAGOrienteering" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12837" title="Entries Open - STAG Score 1+ Strathclyde Country Park"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">10</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12889" title="An event in the 2024 Night Terrain Series of five events.">LOC Night Terrain 1 - Kendal Golf Course</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12889" title="Entries Open - LOC Night Terrain 1 - Kendal Golf Course"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>An event in the 2024 Night Terrain Series of five events.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12889" title="LOC Night Terrain 1 - Kendal Golf Course">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.lakeland-orienteering.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandorienteeringclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12889" title="Entries Open - LOC Night Terrain 1 - Kendal Golf Course"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">13</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/2.svg" alt="South East" title="South East" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12871" title="A friendly orienteering event designed primarily for newcomers to the sport, and for those wanting an opportunity to practise and improve their orienteering skills.">TVOC Saturday Series - Brill Common</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12871" title="Entries Open - TVOC Saturday Series - Brill Common"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>A friendly orienteering event designed primarily for newcomers to the sport, and for those wanting an opportunity to practise and improve their orienteering skills.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12871" title="TVOC Saturday Series - Brill Common">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://tvoc.org.uk/events/brill-jan-24/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/tvoclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/tvoclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12871" title="Entries Open - TVOC Saturday Series - Brill Common"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">14</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12697" title="Local urban orienteering event in Penrith as part of the North West Urban League.">BL Penrith Urban (NWUL)</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12697" title="Entries Open - BL Penrith Urban (NWUL)"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Local urban orienteering event in Penrith as part of the North West Urban League.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12697" title="BL Penrith Urban (NWUL)">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://borderlinersorienteering.org/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/BL_Orienteering" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/506586129368586" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12697" title="Entries Open - BL Penrith Urban (NWUL)"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">14</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/10.svg" alt="Scotland" title="Scotland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12839" title="STAG’s very popular SCORE Events returns in 2024 with the same challenging format.  WE do what WE do as it is GOOD for US and GOOD for YOU!">STAG Score 2+ Parkhill Wood, Lochwinnoch</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12839" title="Entries Open - STAG Score 2+ Parkhill Wood, Lochwinnoch"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>STAG’s very popular SCORE Events returns in 2024 with the same challenging format.  WE do what WE do as it is GOOD for US and GOOD for YOU!</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12839" title="STAG Score 2+ Parkhill Wood, Lochwinnoch">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.stag-orienteering.co.uk/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/STAGglasgow" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/STAGOrienteering" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12839" title="Entries Open - STAG Score 2+ Parkhill Wood, Lochwinnoch"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">17</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/10.svg" alt="Scotland" title="Scotland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12742" title="Northern Night Cup event 2.  All welcome. Pre entries only. Two courses on offer: Long and Short both TD5.">NNC 2 Burgie Arboretum (Rescheduled)</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12742" title="Entries Open - NNC 2 Burgie Arboretum (Rescheduled)"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Northern Night Cup event 2.  All welcome. Pre entries only. Two courses on offer: Long and Short both TD5.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12742" title="NNC 2 Burgie Arboretum (Rescheduled)">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.mor.scot" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/MoravianOClub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://instagram.com/moravian_orienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/instagram.svg" alt="Instagram" title="Instagram" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/MoravianOclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12742" title="Entries Open - NNC 2 Burgie Arboretum (Rescheduled)"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">17</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12817" title="This Street-O event, centred in East Lancashire, uses either 1:10000 or 1:12500 scale OpenOrienteeringMap. Choose your score course with either a 60 or 75 minute time limit.  20 penalty points will be deducted for every minute you are late returning.">PFO Street-O Reedsholme (1/10)</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12817" title="Entries Open - PFO Street-O Reedsholme (1/10)"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>This Street-O event, centred in East Lancashire, uses either 1:10000 or 1:12500 scale OpenOrienteeringMap. Choose your score course with either a 60 or 75 minute time limit.  20 penalty points will be deducted for every minute you are late returning.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12817" title="PFO Street-O Reedsholme (1/10)">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.pfo.org.uk/events/reedsholme-2024-01-17" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/pendleorienteer" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/25131703513" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12817" title="Entries Open - PFO Street-O Reedsholme (1/10)"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">20</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12942" title="Level D local orienteering event at Coombs Wood near Armathwaite.">BL Coombs Wood Local</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12942" title="Entries Open - BL Coombs Wood Local"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Level D local orienteering event at Coombs Wood near Armathwaite.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12942" title="BL Coombs Wood Local">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://borderlinersorienteering.org/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/BL_Orienteering" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/506586129368586" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12942" title="Entries Open - BL Coombs Wood Local"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">21</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/9.svg" alt="North East" title="North East" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12885" title="A classic moorland orienteering event centred on Lordenshaw.  Longer courses also visit the lower slopes of Simonside Moor.  The area offers fine views and plenty of interesting rock detail.">NATO Simonside and Lordenshaw</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12885" title="Entries Open - NATO Simonside and Lordenshaw"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>A classic moorland orienteering event centred on Lordenshaw.  Longer courses also visit the lower slopes of Simonside Moor.  The area offers fine views and plenty of interesting rock detail.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12885" title="NATO Simonside and Lordenshaw">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.newcastleorienteering.org.uk/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/NATO_orienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/NandTO" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12885" title="Entries Open - NATO Simonside and Lordenshaw"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_edit"><span class="eti_day">Sun</span> <span class="eti_num">21</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/10.svg" alt="Scotland" title="Scotland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12840" title="Entries for this event are currently suspended until a check is made on the condition of the area in the first week of January 2024.">STAG Score 3+ Douglas Estate, Lesmahagow</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12840" title="Entries Closed - STAG Score 3+ Douglas Estate, Lesmahagow"><div class="eti_button button-edit"><span class="eti_link_text">Entries Closed</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Entries for this event are currently suspended until a check is made on the condition of the area in the first week of January 2024.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12840" title="STAG Score 3+ Douglas Estate, Lesmahagow">FIND OUT MORE &raquo;</a><a href="http://www.stag-orienteering.co.uk/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/STAGglasgow" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/STAGOrienteering" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-edit"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12840" title="Entries Closed - STAG Score 3+ Douglas Estate, Lesmahagow"><span class="eti_link_text">Entries Closed</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">24</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12890" title="An event in the 2024 Night Terrain Series of five events.">LOC Night Terrain 2 - Birkrigg</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12890" title="Entries Open - LOC Night Terrain 2 - Birkrigg"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>An event in the 2024 Night Terrain Series of five events.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12890" title="LOC Night Terrain 2 - Birkrigg">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.lakeland-orienteering.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandorienteeringclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12890" title="Entries Open - LOC Night Terrain 2 - Birkrigg"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Fri</span> <span class="eti_num">26</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/10.svg" alt="Scotland" title="Scotland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12403" title="EUOC invites you to its annual festival of orienteering in the heart of Scotland’s capital. The weekend includes an Elite mixed sprint relay, a night sprint at The Inch, A WRE sprint at South Queensferry, Bughtlin Urban/Sprint and the traditional ceilidh!">Edinburgh Big Weekend</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12403" title="Entries Open - Edinburgh Big Weekend"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>EUOC invites you to its annual festival of orienteering in the heart of Scotland’s capital. The weekend includes an Elite mixed sprint relay, a night sprint at The Inch, A WRE sprint at South Queensferry, Bughtlin Urban/Sprint and the traditional ceilidh!</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12403" title="Edinburgh Big Weekend">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://bw.euoc.co.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/EUOCLegends" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://instagram.com/bigweekend2024" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/instagram.svg" alt="Instagram" title="Instagram" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/EUOCLegends" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12403" title="Entries Open - Edinburgh Big Weekend"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Fri</span> <span class="eti_num">26</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/10.svg" alt="Scotland" title="Scotland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12426" title="EUOC invites you to its annual festival of orienteering in the heart of Scotland’s capital. The weekend includes an Elite mixed sprint relay, a night sprint at The Inch, A WRE sprint at South Queensferry, Bughtlin Urban/Sprint and the traditional ceilidh!">Edinburgh Big Weekend - 2x2 MSR</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12426" title="Entries Open - Edinburgh Big Weekend - 2x2 MSR"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>EUOC invites you to its annual festival of orienteering in the heart of Scotland’s capital. The weekend includes an Elite mixed sprint relay, a night sprint at The Inch, A WRE sprint at South Queensferry, Bughtlin Urban/Sprint and the traditional ceilidh!</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12426" title="Edinburgh Big Weekend - 2x2 MSR">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://bw.euoc.co.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/EUOCLegends" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://instagram.com/bigweekend2024" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/instagram.svg" alt="Instagram" title="Instagram" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/EUOCLegends" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12426" title="Entries Open - Edinburgh Big Weekend - 2x2 MSR"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">27</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/12.svg" alt="Northern Ireland" title="Northern Ireland" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12883" title="LVO Score Championships Sat 27th Jan at 11:30 - Woodburn Presbyterian Church, Carrickfergus.">LVO Score Champs 2024</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12883" title="Entries Open - LVO Score Champs 2024"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>LVO Score Championships Sat 27th Jan at 11:30 - Woodburn Presbyterian Church, Carrickfergus.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12883" title="LVO Score Champs 2024">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://lvo.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/LVOrienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/LVOrienteers" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12883" title="Entries Open - LVO Score Champs 2024"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">27</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12836" title="Spring Series event 2024. This event is for novices, progressing navigators and seasoned orienteers.  No entries on the day.">PFO Towneley Park</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12836" title="Entries Open - PFO Towneley Park"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Spring Series event 2024. This event is for novices, progressing navigators and seasoned orienteers.  No entries on the day.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12836" title="PFO Towneley Park">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.pfo.org.uk/events/towneley-park-2024-01-27" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/pendleorienteer" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/25131703513" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12836" title="Entries Open - PFO Towneley Park"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">31</span> <span class="eti_month">Jan</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12891" title="An event in the 2024 Night Terrain Series of five events.">LOC Night Terrain 3 - Cunswick Scar</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12891" title="Entries Open - LOC Night Terrain 3 - Cunswick Scar"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>An event in the 2024 Night Terrain Series of five events.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12891" title="LOC Night Terrain 3 - Cunswick Scar">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.lakeland-orienteering.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandorienteeringclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12891" title="Entries Open - LOC Night Terrain 3 - Cunswick Scar"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
												</div>
							<div class="month_breaker">February <span>2024</span></div>
				<div class="month_wrap">

													<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">4</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/7.svg" alt="Yorkshire & Humber" title="Yorkshire & Humber" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12838" title="Hardcastle Crags Day Regional:  Offering colour coded courses for all standards of orienteer from experts to novices.  No cash entries on the day.">EPOC/PFO Hardcastle Crags Regional</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12838" title="Entries Open - EPOC/PFO Hardcastle Crags Regional"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Hardcastle Crags Day Regional:  Offering colour coded courses for all standards of orienteer from experts to novices.  No cash entries on the day.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12838" title="EPOC/PFO Hardcastle Crags Regional">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.pfo.org.uk/events/hardcastle-crags-regional-2024-02-04" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/pendleorienteer" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/25131703513" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12838" title="Entries Open - EPOC/PFO Hardcastle Crags Regional"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">7</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12892" title="An event in the 2024 Night Terrain Series of five events.">LOC Night Terrain 4 - Summerhouse Knott</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12892" title="Entries Open - LOC Night Terrain 4 - Summerhouse Knott"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>An event in the 2024 Night Terrain Series of five events.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12892" title="LOC Night Terrain 4 - Summerhouse Knott">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.lakeland-orienteering.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandorienteeringclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12892" title="Entries Open - LOC Night Terrain 4 - Summerhouse Knott"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">10</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12495" title="British Night Orienteering Championships 2024 will be held at Hawse End on the west shore of Derwent Water in the Lake District. The area features mainly runnable deciduous woodland with a path network and some contour and rock detail.">WCOC British Night Championships</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12495" title="Entries Open - WCOC British Night Championships"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>British Night Orienteering Championships 2024 will be held at Hawse End on the west shore of Derwent Water in the Lake District. The area features mainly runnable deciduous woodland with a path network and some contour and rock detail.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12495" title="WCOC British Night Championships">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.britishorienteering.org.uk/site/bnc2024" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/WCOC2014" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/165760043481944" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12495" title="Entries Open - WCOC British Night Championships"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">14</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/5.svg" alt="East Midlands" title="East Midlands" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12923" title="Fight the Night returns for its 12th year, with 4 events running on consecutive Wednesday evenings in February. This series is suitable for everyone from novice to experienced orienteers. Collect as many of the 20 controls as you can in the time limit.">LOG Fight the Night 2 Birchwood</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12923" title="Entries Open - LOG Fight the Night 2 Birchwood"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Fight the Night returns for its 12th year, with 4 events running on consecutive Wednesday evenings in February. This series is suitable for everyone from novice to experienced orienteers. Collect as many of the 20 controls as you can in the time limit.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12923" title="LOG Fight the Night 2 Birchwood">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.logonline.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/Lincoln-Orienteering-Group-LOG-158657164184904/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12923" title="Entries Open - LOG Fight the Night 2 Birchwood"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Thu</span> <span class="eti_num">15</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12863" title="This Street-O event, centred in East Lancashire, uses either 1:10000 or 1:12500 scale OpenOrienteeringMap. Choose your score course with either a 60 or 75 minute time limit.  20 penalty points will be deducted for every minute you are late returning.">PFO Street-O Ramsbottom (2/10)</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12863" title="Entries Open - PFO Street-O Ramsbottom (2/10)"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>This Street-O event, centred in East Lancashire, uses either 1:10000 or 1:12500 scale OpenOrienteeringMap. Choose your score course with either a 60 or 75 minute time limit.  20 penalty points will be deducted for every minute you are late returning.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12863" title="PFO Street-O Ramsbottom (2/10)">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.pfo.org.uk/events/ramsbottom-2024-02-15" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/pendleorienteer" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/25131703513" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12863" title="Entries Open - PFO Street-O Ramsbottom (2/10)"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">21</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12893" title="An event in the 2024 Night Terrain Series of five events.">LOC Night Terrain 5 - Stockbird Head</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12893" title="Entries Open - LOC Night Terrain 5 - Stockbird Head"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>An event in the 2024 Night Terrain Series of five events.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12893" title="LOC Night Terrain 5 - Stockbird Head">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.lakeland-orienteering.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandorienteeringclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12893" title="Entries Open - LOC Night Terrain 5 - Stockbird Head"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">21</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/5.svg" alt="East Midlands" title="East Midlands" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12924" title="Fight the Night returns for its 12th year, with 4 events running on consecutive Wednesday evenings in February. This series is suitable for everyone from novice to experienced orienteers. Collect as many of the 20 controls as you can in the time limit.">LOG Fight the Night 3 Lincoln West End</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12924" title="Entries Open - LOG Fight the Night 3 Lincoln West End"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Fight the Night returns for its 12th year, with 4 events running on consecutive Wednesday evenings in February. This series is suitable for everyone from novice to experienced orienteers. Collect as many of the 20 controls as you can in the time limit.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12924" title="LOG Fight the Night 3 Lincoln West End">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.logonline.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/Lincoln-Orienteering-Group-LOG-158657164184904/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12924" title="Entries Open - LOG Fight the Night 3 Lincoln West End"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">25</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/5.svg" alt="East Midlands" title="East Midlands" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12926" title="EMOA Champs event at Chambers Wood. We’re offering the full set of EM championship courses covering all 5 technical difficulties. The event will use a newly updated and expanded map by Richard Parkin. Courses from White through to Black, see full details.">LOG - East Midlands Championships</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12926" title="Entries Open - LOG - East Midlands Championships"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>EMOA Champs event at Chambers Wood. We’re offering the full set of EM championship courses covering all 5 technical difficulties. The event will use a newly updated and expanded map by Richard Parkin. Courses from White through to Black, see full details.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12926" title="LOG - East Midlands Championships">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.logonline.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/Lincoln-Orienteering-Group-LOG-158657164184904/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12926" title="Entries Open - LOG - East Midlands Championships"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Wed</span> <span class="eti_num">28</span> <span class="eti_month">Feb</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/5.svg" alt="East Midlands" title="East Midlands" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12925" title="Fight the Night returns for its 12th year, with 4 events running on consecutive Wednesday evenings in February. This series is suitable for everyone from novice to experienced orienteers. Collect as many of the 20 controls as you can in the time limit.">LOG Fight the Night 4 Lincoln Central</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12925" title="Entries Open - LOG Fight the Night 4 Lincoln Central"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>Fight the Night returns for its 12th year, with 4 events running on consecutive Wednesday evenings in February. This series is suitable for everyone from novice to experienced orienteers. Collect as many of the 20 controls as you can in the time limit.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12925" title="LOG Fight the Night 4 Lincoln Central">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.logonline.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/Lincoln-Orienteering-Group-LOG-158657164184904/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12925" title="Entries Open - LOG Fight the Night 4 Lincoln Central"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
												</div>
							<div class="month_breaker">March <span>2024</span></div>
				<div class="month_wrap">

													<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sun</span> <span class="eti_num">24</span> <span class="eti_month">Mar</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/2.svg" alt="South East" title="South East" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12809" title="A friendly orienteering event offering a range of courses, from those suitable for newcomers through to ones providing challenge for experienced orienteers.">TVOC Chiltern Challenge inc SCOA Champs</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12809" title="Entries Open - TVOC Chiltern Challenge inc SCOA Champs"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>A friendly orienteering event offering a range of courses, from those suitable for newcomers through to ones providing challenge for experienced orienteers.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12809" title="TVOC Chiltern Challenge inc SCOA Champs">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://tvoc.org.uk/events/chiltern-challenge-2024/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/tvoclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/tvoclub" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12809" title="Entries Open - TVOC Chiltern Challenge inc SCOA Champs"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
									<div class="event_table_item altbg">
						<div class="eti_wrap">
							<div class="eti_date ets_backward"><span class="eti_day">Fri</span> <span class="eti_num">29</span> <span class="eti_month">Mar</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11938" title="The East and West Midlands Orienteering Associations (EMOA and WMOA) welcome you to the JK, the UK's premier annual multi-day orienteering competition. The sprint event is at Loughborough University and the forest races are on Beaudesert.">JK2024 - Individual (3 days)</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11938" title="Opens 07/01 - JK2024 - Individual (3 days)"><div class="eti_button button-backward"><span class="eti_link_text">Opens 07/01</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>The East and West Midlands Orienteering Associations (EMOA and WMOA) welcome you to the JK, the UK's premier annual multi-day orienteering competition. The sprint event is at Loughborough University and the forest races are on Beaudesert.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11938" title="JK2024 - Individual (3 days)">FIND OUT MORE &raquo;</a><a href="http://www.thejk.org.uk" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/thejkfestival" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/thejkfestival" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-backward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11938" title="Opens 07/01 - JK2024 - Individual (3 days)"><span class="eti_link_text">Opens 07/01</span></a></div>
								</div>
							</div>
						</div>
					</div>
												</div>
							<div class="month_breaker">April <span>2024</span></div>
				<div class="month_wrap">

													<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_backward"><span class="eti_day">Mon</span> <span class="eti_num">1</span> <span class="eti_month">Apr</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/OR.svg?ver=2" alt="Orienteering" title="Orienteering" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/5.svg" alt="East Midlands" title="East Midlands" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12445" title="The East and West Midlands Orienteering Associations (EMOA and WMOA) welcome you to the JK, the UK's premier annual multi-day orienteering competition. The sprint event is at Loughborough University and the forest races are on Beaudesert.">JK2024 - Relay</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12445" title="Opens 07/01 - JK2024 - Relay"><div class="eti_button button-backward"><span class="eti_link_text">Opens 07/01</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>The East and West Midlands Orienteering Associations (EMOA and WMOA) welcome you to the JK, the UK's premier annual multi-day orienteering competition. The sprint event is at Loughborough University and the forest races are on Beaudesert.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12445" title="JK2024 - Relay">FIND OUT MORE &raquo;</a><a href="http://www.thejk.org.uk/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/thejkfestival" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/thejkfestival" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-backward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12445" title="Opens 07/01 - JK2024 - Relay"><span class="eti_link_text">Opens 07/01</span></a></div>
								</div>
							</div>
						</div>
					</div>
												</div>
							<div class="month_breaker">May <span>2024</span></div>
				<div class="month_wrap">

													<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">4</span> <span class="eti_month">May</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/MM.svg?ver=2" alt="Mountain Marathon" title="Mountain Marathon" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11508" title="The SCARPA Great Lakeland 3Day is a 3-day supported mountain journey through the Lake District. Choose between 6 courses, get your overnight kit transported to camp and enjoy a friendly and relaxed atmosphere. Also... complimentary cake and hot drinks!">SCARPA Great Lakeland 3Day 2024</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11508" title="Entries Open - SCARPA Great Lakeland 3Day 2024"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>The SCARPA Great Lakeland 3Day is a 3-day supported mountain journey through the Lake District. Choose between 6 courses, get your overnight kit transported to camp and enjoy a friendly and relaxed atmosphere. Also... complimentary cake and hot drinks!</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11508" title="SCARPA Great Lakeland 3Day 2024">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="https://www.greatlakeland3day.com/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/GreatLakeland3D" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://instagram.com/GreatLakeland3Day" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/instagram.svg" alt="Instagram" title="Instagram" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/GreatLakeland3Day" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=11508" title="Entries Open - SCARPA Great Lakeland 3Day 2024"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
												</div>
							<div class="month_breaker">July <span>2024</span></div>
				<div class="month_wrap">

													<div class="event_table_item">
						<div class="eti_wrap">
							<div class="eti_date ets_forward"><span class="eti_day">Sat</span> <span class="eti_num">6</span> <span class="eti_month">Jul</span></div>
							<div class="eti_type etp_running"><img src="https://www.sientries.co.uk/images/event_icons/MM.svg?ver=2" alt="Mountain Marathon" title="Mountain Marathon" width="24" height="26" /></div>
							<div class="eti_type eti_map"><img src="https://www.sientries.co.uk/images/region_icons/8.svg" alt="North West" title="North West" height="28" /></div>
							<div class="eti_title"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12647" title="The Saunders Lakeland Mountain Marathon is a two-day mountain navigation competition that is held annually in the Lake District for teams of two runners. The event has 7 courses of varying lengths and technical difficulty and involves an overnight camp.">Saunders Lakeland Mountain Marathon</a>
							<div class="eti_reveal dropdown_reveal"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>
							<div class="eti_status"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12647" title="Entries Open - Saunders Lakeland Mountain Marathon"><div class="eti_button button-forward"><span class="eti_link_text">Entries Open</span></div></a></div>
						</div>
						<div class="eti_hidden_content">
							<div class="eti_hc_padding">
								<div>The Saunders Lakeland Mountain Marathon is a two-day mountain navigation competition that is held annually in the Lake District for teams of two runners. The event has 7 courses of varying lengths and technical difficulty and involves an overnight camp.</div>
																	<div class="eth_link"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12647" title="Saunders Lakeland Mountain Marathon">FIND OUT MORE<span class="no_small"> AND ENTER</span> &raquo;</a><a href="http://www.slmm.org.uk/" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/website.svg" alt="Website" title="Website" class="socialicon" width="24" height="24" /></a><a href="https://twitter.com/lakelandMM" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/twitter.svg" alt="Twitter" title="Twitter" class="socialicon" width="24" height="24" /></a><a href="https://www.facebook.com/lakelandMM" target="_blank"><img src="https://www.sientries.co.uk/images/social_icons/facebook.svg" alt="Facebook" title="Facebook" class="socialicon" width="24" height="24" /></a></div>
																<div class="center">
									<div class="button eth_button button-forward"><a href="https://www.sientries.co.uk/event.php?elid=Y&amp;event_id=12647" title="Entries Open - Saunders Lakeland Mountain Marathon"><span class="eti_link_text">Entries Open</span></a></div>
								</div>
							</div>
						</div>
					</div>
												</div>
							</div>
	


		</div>

		<div class="clear"></div>
	</div>
	<div class="clear"></div>
</div>

</div>
<div class="clear"></div>

<div id="page_footer">
	<div id="footer_bar"></div>

	<div class="auto_margin_footer">
		<div id="footerLeft">
			<a href="https://www.sientries.co.uk/index.php" title="Click to go to the SiEntries Events List" id="sientries_logo_footer"><strong>Si</strong>Entries <span class="smaller">Online Entries System</span></a>
		</div>

		<div id="footerRight">
			<ul class="footerMenu">
				<li><a href="https://www.sientries.co.uk/index.php" title="Displays a list of all current events"><i class="fa fa-home" aria-hidden="true"></i> Home</a></li>
				<li><a href="https://www.sientries.co.uk/help.php" title="View help and tips on using SiEntries"><i class="fa fa-question-circle" aria-hidden="true"></i> Help</a></li>
				<li><a href="https://www.sientries.co.uk/terms.php" title="View the website Terms of Use which apply to SiEntries"><i class="fa fa-align-left" aria-hidden="true"></i> Terms</a></li>
				<li><a href="https://www.sientries.co.uk/privacy.php" title="View the privacy policy which applies to using SiEntries"><i class="fa fa-lock" aria-hidden="true"></i> Privacy</a></li>
				<li><a href="https://www.sientries.co.uk/cookies.php" title="View the Privacy Cookies which applies to using SiEntries"><i class="fa fa-life-ring" aria-hidden="true"></i> Cookies</a></li>
			</ul>
			<div class="copyright"><a href="https://www.sientries.co.uk/about_sientries.php" title="Find out who we are and what we do">About SiEntries <i class="far fa-copyright"></i></a></div>
		</div>
	</div>

</div>

</div>
</div>

</body>
</html>
`;
