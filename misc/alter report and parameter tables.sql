ALTER TABLE `report`
	CHANGE COLUMN `userGroup` `userGroup` VARCHAR(100) NULL DEFAULT NULL AFTER `misc`;
	
ALTER TABLE `parameter`
	ADD COLUMN `userGroup` VARCHAR(100) NULL DEFAULT NULL AFTER `control`;
	
-- jset_column
ALTER TABLE `jset_column`
	CHANGE COLUMN `rowlabel` `rowlabel` VARCHAR(2000) NULL DEFAULT NULL AFTER `rowpos`;

	


