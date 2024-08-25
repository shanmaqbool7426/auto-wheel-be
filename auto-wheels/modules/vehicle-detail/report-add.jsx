'use client'
import React, { useState } from 'react';
import { Modal, Button, Radio, Text, Textarea } from '@mantine/core';
import {
    ReportFlag

  } from "@/components/Icons";

const ReportModal = ({ opened, onClose }) => {
    const [value, setValue] = useState('');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Let us know what's wrong with this ad."
    >
      <Text size="sm" color="dimmed">
        Note: Please don't use this form to contact the seller.
      </Text>

      <Radio.Group
        name="report"
        value={value}
        onChange={setValue}
        orientation="vertical"
        mt="md"
      >
        <Radio value="duplicate" label="Duplicate: There's already a listing posted just like this one." className='my-1'/>
        <Radio value="spam" label="Spam: It's a Junk Ad." className='my-1'/>
        <Radio value="wrongContactInfo" label="Wrong Contact Info: Contact info is incorrect." className='my-1'/>
        <Radio value="soldAlready" label="Sold Already: The seller has already sold this item." />
        <Radio value="fakeAds" label="Fake Ads: Fake phone number, item doesn't exist, false details etc." className='my-1'/>
        <Radio value="wrongCategory" label="Wrong Category: It doesn't belong in this category." />
        <Radio value="prohibitedContent" label="Prohibited/Explicit Content: It's got abusive language, explicit/adult content etc." className='my-1'/>
        <Radio value="other" label="Other:" className='my-1'/>
      </Radio.Group>

      {value === 'other' && (
        <Textarea
          placeholder="Please specify..."
          mt="md"
          autosize
          minRows={2}
        />
      )}

      <Button fullWidth mt="lg" onClick={onClose}>
        Submit
      </Button>
    </Modal>
  );
};

 



const ReportAdd = () => {
    const [value, setValue] = useState('');

  return (
    <>
    <div className="col-12">
    <div className="card mb-3">
      <div className="card-body gap-2 align-items-center justify-content-center text-uppercase" onClick={()=>setValue(true)}>
        <ReportFlag />
        <h5 className="mb-0 fw-semibold text-primary">
          Report this ad
        </h5>
      </div>
    </div>
  </div> 
  <ReportModal opened={value} onClose={()=>setValue(false)}/>

  </>
  

)
}

export default ReportAdd