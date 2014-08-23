<?php 
/*
 * jxset
 * Copyright (c) 2010 - 2013, Shuki Shukrun (shukrun.shuki at gmail.com).
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 include_once("autoload.php");
 $dir_pre = config::jxset;
 jset_session::create();
 jset_page::create(config::jxset, 'he', '', true);
 $user_group = $_SESSION['jset_user_group'];
?>
<link rel="stylesheet" type="text/css" media="screen" href="css/index.css" />
<script src="<?php echo $dir_pre ?>jset/i18n/jset.locale-he.js" type="text/javascript"></script>
<script src="<?php echo $dir_pre ?>jset/i18n/grid.locale-he.js" type="text/javascript"></script>
<title>תמיר - תיעוד , מעקב, ייעול, רישום</title>
<script type="text/javascript">
	<?php echo jset_permission::get_user_attributes_js(); ?>
</script>
<script src="js/defaults.js" type="text/javascript"></script>
<script src="js/patient.js" type="text/javascript"></script>
<script src="js/dormitory.js" type="text/javascript"></script>
<script src="js/worker.js" type="text/javascript"></script>
<script src="js/shift_summary.js" type="text/javascript"></script>
<script src="js/school.js" type="text/javascript"></script>
<script src="js/welfare_office.js" type="text/javascript"></script>
<script src="js/medicine.js" type="text/javascript"></script>
<script src="js/psychiatric_diagnosis.js" type="text/javascript"></script>
<script src="js/medical.js" type="text/javascript"></script>
<script src="js/reporting.js" type="text/javascript"></script>
<script src="js/report.js" type="text/javascript"></script>
<script src="js/index.js" type="text/javascript"></script>
</head>
<body>
	<div> <a href="login.php?signout"><img src="<?php echo $dir_pre ?>jset/img/out.png" title="צא"></a> <a href="<?php echo config::password_page; ?>"><?php echo $_SESSION['jset_user_login']; ?></a> שלום</div>
	<?php if(!$user_group){ ?>
		
		<div style="direction:rtl; text-align:right">  יש להגדיר קבוצת הרשאה למשתמש <?php echo $_SESSION['jset_user_login']; ?> בכדי להשתמש במערכת. </div>

	<?php 
		die;
	}	?>
	<div id="tabs">
		<ul>
			<?php if($user_group != 4){ ?><li><a href="#tabs-1">חניכים</a></li><?php } ?>
			<?php if($user_group <= 2){ ?><li><a href="#tabs-2">מסגרות</a></li><?php } ?>
			<?php if($user_group == 1){ ?><li><a href="#tabs-3">עובדים</a></li><?php } ?>
			<li><a href="#tabs-4">משמרות</a></li>
			<?php if($user_group != 4){ ?><li><a href="#tabs-5">שונות</a></li><?php } ?>
			<?php if($user_group != 4){ ?><li><a href="#tabs-6">רפואי</a></li><?php } ?>
			<?php if($user_group == 1){ ?><li><a href="#tabs-7">דיווחים</a></li><?php } ?>
			<?php if($user_group == 1){ ?><li><a href="#tabs-9">דוחות</a></li><?php } ?>
		</ul>
		<?php if($user_group != 4){ ?>
		<div id="tabs-1">
			<table id="patient" border="1"></table>
		</div>
		<?php } ?>
		<div id="tabs-2">
			<table id="dormitory" border="1"></table>
		</div>
		<div id="tabs-3">
			<table id="worker" border="1"></table>
		</div>
		<div id="tabs-4">
			<table id="shift_summary" border="1"></table>
		</div>
		<?php if($user_group != 4){ ?>
		<div id="tabs-5">
			<table id="school" border="1"></table>
			<table id="welfare_office" border="1"></table>
			<table id="medicine" border="1"></table>
			<table id="psychiatric_diagnosis" border="1"></table>
		</div>
		<?php } ?>
		<div id="tabs-6">
			<table id="medical" border="1"></table>
		</div>
		<div id="tabs-7">
			<table id="reporting_master_table" style="width:98%">
				<tr>
					<td style="vertical-align:top">
						<table id="reporting" border="1"></table>
					</td>
				</tr>
				<tr>	
					<td style="vertical-align:top">
						<table id="reporting_item" border="1"></table>
					</td>
				</tr>
			</table>
		</div>
		<div id="tabs-9">
			<table id="report" border="1"></table>
		</div>
	</div>
</body>
</html>