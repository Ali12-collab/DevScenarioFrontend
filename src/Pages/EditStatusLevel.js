import React from 'react';
import GenericForm from '../Components/GenericForm';
import { statusLevelFormConfig } from '../Config/FormConfig';
import { getStatusLevelById, updateStatusLevel } from '../Services/StatusLevelServices';

const EditStatusLevel = () => (
  <GenericForm
    entity="Status Level"
    fields={statusLevelFormConfig}
    onSubmit={() => {}}
    apiCalls={{ get: getStatusLevelById, edit: updateStatusLevel }}
  />
);

export default EditStatusLevel;
