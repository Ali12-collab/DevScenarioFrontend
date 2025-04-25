import React from 'react';
import GenericForm from '../Components/GenericForm';
import { statusLevelFormConfig } from '../Config/FormConfig'
import { createStatusLevel } from '../Services/StatusLevelServices';
import '../Styling/CreateStatusLevel.css'; // Import your CSS file for styling

const CreateStatusLevel = () => (
  <GenericForm
    entity="Status Level"
    fields={statusLevelFormConfig}
    onSubmit={() => {}}
    apiCalls={{ add: createStatusLevel }}
  />
);

export default CreateStatusLevel;
