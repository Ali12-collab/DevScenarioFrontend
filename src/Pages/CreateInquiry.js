import React from 'react';
import GenericForm from '../Components/GenericForm';
import { inquiryFormConfig } from '../Config/FormConfig';
import { createInquiry } from '../Services/InquiryServices';
import '../Styling/GenericForm.css'; // ✅ Make sure to import the styles

const CreateInquiry = () => (
  <div className="generic-form-container">
    <h2 className="generic-form-title">Create New Inquiry</h2>
    <GenericForm
      entity="Inquiry"
      fields={inquiryFormConfig}
      onSubmit={() => {}}
      apiCalls={{ add: createInquiry }}
    />
  </div>
);

export default CreateInquiry;
