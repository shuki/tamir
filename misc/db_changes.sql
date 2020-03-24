-- 2019-08-14
ALTER TABLE `jset_table`
	ADD COLUMN `export_source` TEXT NULL DEFAULT NULL AFTER `source`,
	ADD COLUMN `comments` TEXT NULL DEFAULT NULL AFTER `system`;

