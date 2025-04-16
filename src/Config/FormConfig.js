export const applicationFormConfig = [
    {
      label: 'Project Name',
      name: 'projectName',
      type: 'text',
      required: true,
    },
    {
      label: 'Project Reference',
      name: 'projectRef',
      type: 'text',
      required: true,
    },
    {
      label: 'Project Location',
      name: 'projectLocation',
      type: 'text',
      required: true,
    },
    {
      label: 'Open Date',
      name: 'openDt',
      type: 'date',
      required: true,
    },
    {
      label: 'Start Date',
      name: 'startDt',
      type: 'date',
      required: true,
    },
    {
      label: 'Completion Date',
      name: 'completedDt',
      type: 'date',
      required: true,
    },
    {
      label: 'Project Value',
      name: 'projectValue',
      type: 'number',
      required: true,
    },
    {
      label: 'Status',
      name: 'appStatus',
      type: 'text',
      required: true,
    },
    {
      label: 'Status ID',
      name: 'statusId',
      type: 'number',
      required: true,
    },
    {
      label: 'Notes',
      name: 'notes',
      type: 'textarea',
    },
  ];
  

  export const statusLevelFormConfig = [
    {
      label: 'Status Name',
      name: 'statusName',
      type: 'text',
      required: true,
    }
  ];
  
  export const inquiryFormConfig = [
    { label: 'Application ID', name: 'applicationId', type: 'number', required: true },
    { label: 'Send To Person', name: 'sendToPerson', type: 'text', required: true },
    { label: 'Send To Role', name: 'sendToRole', type: 'text' },
    { label: 'Send To Person ID', name: 'sendToPersonId', type: 'number' },
    { label: 'Subject', name: 'subject', type: 'text', required: true },
    { label: 'Inquiry', name: 'inquiry', type: 'textarea', required: true },
    { label: 'Response', name: 'response', type: 'textarea' },
    { label: 'Asked Date', name: 'askedDt', type: 'date' },
    { label: 'Completed Date', name: 'completedDt', type: 'date' },
  ];
  