// import React from 'react'
import { FAQs } from "../components/FAQs";
import { CTA } from "../components/CTA";
import { ContactMe } from "../components/ContactMe";
import { ContactMeHeader } from "../components/ContactMeHeader";
export const Contact = () => {
  return (
    <div className="mt-10">
      <ContactMeHeader />
      <FAQs />
      <ContactMe />
      <CTA />
    </div>
  );
};
