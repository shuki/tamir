select
DATE_FORMAT(`date`, '%d/%m/%Y')  as `תאריך`,
CASE
    WHEN weekday(`date`) = 6      THEN 'א'
    WHEN weekday(`date`) = 0      THEN 'ב'
    WHEN weekday(`date`) = 1      THEN 'ג'
    WHEN weekday(`date`) = 2      THEN 'ד'
    WHEN weekday(`date`) = 3      THEN 'ה'
    WHEN weekday(`date`) = 4      THEN 'ו'
    WHEN weekday(`date`) = 5      THEN 'ש'
END as `יום`,
dormitory_name as `מסגרת`,
house_name as `בית`,
if(shift_types is null or find_in_set(1, shift_types) = 0, 'חסר', null) as `בוקר`,
if(shift_types is null or find_in_set(2, shift_types) = 0, 'חסר', null) as `צהריים`,
if(shift_types is null or find_in_set(3, shift_types) = 0, 'חסר', null) as `לילה`



from
(
select x.`date`,
dormitory.name as dormitory_name,
house.id as house_id,
house.name as house_name,
group_concat(shift_summary.`type` order by shift_summary.`type` separator ',') as shift_types,
length(group_concat(shift_summary.`type` order by shift_summary.`type` separator ',')) as shift_length,
group_concat(jset_list.name order by tid separator ',') as shifts 
from
(
SELECT @row := @row + 1 as id, @date := DATE_ADD(current_date(), INTERVAL -@row DAY) as `date`
FROM 
(select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 6 union select 7 union select 8 union select 9) t,
(SELECT @row:= 0) t3 where @row < 7
) x
left join house on true
left join dormitory on house.parent = dormitory.id
left join shift_summary
on shift_summary.`date` = x.`date` and shift_summary.house = house.id
left join jset_list on jset_list.`type` = 'shift_type' and  shift_summary.`type` = jset_list.tid 
group by x.`date`, house.id
order by dormitory.name, house.name, x.`date` desc
) y
where shift_length is null or shift_length < 5