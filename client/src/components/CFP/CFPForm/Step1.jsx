import React from 'react';
import FormField, {SPACING} from '../../FormField';

const StepOne = ({user}) => (
  <div>
    <h4 className="mb-0">Public information</h4>
    <p className="font-size-sm text-gray-600">
      The following information will be presented on the website
    </p>
    <form>
      <FormField
        id="fullname"
        label="Full name"
        required={true}
        placeholder="Your name"
        value={user.name}
        className={SPACING}
      />
      <FormField
        id="oneLiner"
        label="One Liner"
        value={user.oneLiner}
        maxLength={100}
        className={SPACING}
        subtitle="Maximum 100 characters"
        placeholder="COBOL developer at Acme Corp"
      />
    </form>
  </div>
)

export default StepOne;
