'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { gql, useMutation } from 'urql';

const CREATE_BIN = gql`
  mutation Mutation($texts: [String!]) {
    createBin(texts: $texts) {
      createdOn
      i_id
      id
      text
    }
  }
`;

function CreateBin() {
  const [texts, setTexts] = useState<string[]>([]);
  const [{ fetching, data }, createBin] = useMutation(CREATE_BIN);
  const [value, setValue] = useState('');
  const router = useRouter();

  const submit = () => {
    if (texts.length === 0) {
      //replace alert with toast.error
      window.alert('No text found');
    }
    createBin({ texts }).then(({ data }) => {
      setValue('');
      if (data?.createBin?.length === 1) {
        router.push(`/b/${data?.createBin?.[0]?.i_id}`);
      }
    });
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
            onChange={(e) => {
              setTexts([e.target.value]);
              setValue(e.target.value);
            }}
            value={value}
          />
        </div>
        <div>
          Or choose a file to bulk paste |{' '}
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <input
            type="button"
            className="bg-gray-200 mt-2 p-4"
            onClick={submit}
            value={'Create'}
          />
        </div>
      </div>
      {data?.createBin?.length > 1 && (
        <>
          <p>Links:</p>
          <p>
            DELETE THIS MESSAGE: LINKS ONLY APPEAR WHEN U BULK ADD USING FILE
          </p>
          <ul>
            {data?.createBin?.map((bin: { i_id: string }) => {
              return (
                <li key={bin.i_id}>
                  <Link href={`/b/${bin.i_id}`}>{bin.i_id}</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default CreateBin;
