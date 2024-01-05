'use client';
import React, { useState } from 'react';
import { gql, useMutation } from 'urql';

const CREATE_BIN = gql`
  mutation Mutation($texts: [String!]) {
    createBin(texts: $texts) {
      createOn
      i_id
      id
      text
    }
  }
`;

function CreateBin() {
  const [texts, setTexts] = useState<string[]>([]);
  const [{ fetching }, createBin] = useMutation(CREATE_BIN);

  const submit = () => {
    if (texts.length === 0) {
      //replace alert with toast.error
      window.alert('No text found');
    }
    createBin({ texts });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const fileContent: string = e.target.result as string;
          const texts: string[] = fileContent
            .split('\n')
            .map((line) => line.trim());
          setTexts(texts);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      {/* Main Part */}
      <div>
        <div>
          <textarea
            placeholder="Your content"
            onChange={(e) => setTexts([e.target.value])}
          />
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <input type="button" onClick={submit} value={'Create'} />
        </div>
      </div>
    </div>
  );
}

export default CreateBin;
