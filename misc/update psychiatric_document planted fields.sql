update psychiatric_document
set document_description = replace(document_description, '#CURRENT_DATE#', date_format(creation_date, '%d/%m/%Y'))
where psychiatric_document.document_description like '%#CUR%';

update psychiatric_document
left join patient on patient.id = psychiatric_document.parent
set document_description = replace(document_description, '#PATIENT_NAME#', concat(patient.first_name, ' ', patient.surename))
where psychiatric_document.document_description like '%#PATIENT_NAME#%';

update psychiatric_document
left join patient on patient.id = psychiatric_document.parent
set document_description = replace(document_description, '#ID_NUMBER#', patient.id_number)
where psychiatric_document.document_description like '%#ID_NUMBER#%';




