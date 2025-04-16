import React from 'react';
import GenericForm from '../Components/GenericForm';
import { statusLevelFormConfig } from '../Config/FormConfig'
import { createStatusLevel } from '../Services/StatusLevelServices';

const CreateStatusLevel = () => (
  <GenericForm
    entity="Status Level"
    fields={statusLevelFormConfig}
    onSubmit={() => {}}
    apiCalls={{ add: createStatusLevel }}
  />
);

export default CreateStatusLevel;
