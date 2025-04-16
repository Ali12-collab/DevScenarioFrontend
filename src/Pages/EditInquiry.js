import React from 'react';
import GenericForm from '../Components/GenericForm';
import { inquiryFormConfig } from '../Config/FormConfig';
import { getInquiryById, updateInquiry } from '../Services/InquiryServices';

const EditInquiry = () => (
  <GenericForm
    entity="Inquiry"
    fields={inquiryFormConfig}
    onSubmit={() => {}}
    apiCalls={{ get: getInquiryById, edit: updateInquiry }}
  />
);

export default EditInquiry;