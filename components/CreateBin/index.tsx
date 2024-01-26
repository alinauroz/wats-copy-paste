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
  React.useEffect(() => {
    document.title = 'Create Bin';
  });

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

  const handleDownload = () => {
    const currentProtocol = window.location.protocol;
    const currentDomain = window.location.hostname;
    const currentPort = window.location.port;

    const appurl =
      currentPort && currentPort != '80'
        ? `${currentProtocol}://${currentDomain}:${currentPort}/b`
        : `${currentProtocol}://${currentDomain}/b`;

    const fileContent =
      'Link,Text\r\n' +
      (data?.createBin?.map((bin: any) => {
        return `${appurl}/${bin.i_id},${bin.text}`;
      })).join('\r\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    <div className="">
      {/* Main Part */}
      <div className="flex flex-col py-10 w-full px-5 md:px-48">
        <div className="">
          <p className="text-[#eee] py-2 text-3xl font-semibold">Create Bin</p>
          <textarea
            className="w-full h-96 text-[#eee] rounded-lg p-4 bg-[#262626]"
            placeholder="Your content"
            onChange={(e) => {
              setTexts([e.target.value]);
              setValue(e.target.value);
            }}
            value={value}
          />
        </div>
        <div className="flex flex-col py-3 lg:gap-2 gap-5">
          <div className="text-[#eee] text-lg flex flex-col md:flex-row gap-2 items-start">
            <p>Or choose a file to bulk paste |</p>
            <span className="bg-[#262626]">
              <input
                type="file"
                onChange={handleFileChange}
                className="rounded text-[#eee]"
              />
            </span>
          </div>
          <div>
            <input
              type="button"
              className="bg-[#eee]  px-7 py-1 md:px-8 md:py-2 rounded-lg text-lg font-semibold hover:bg-[#ccc] cursor-pointer"
              onClick={submit}
              value={fetching ? '...' : 'Create'}
            />
          </div>
        </div>
      </div>
      {data?.createBin?.length > 1 && (
        <div className="px-5 md:px-48 my-8">
          <p>
            <span className="text-2xl text-[#eee] font-bold my-2">Links</span>
            <span
              className="float-right p-2 rounded text-white bg-[#262626] font-bold hover:bg-[#353535] cursor-pointer"
              onClick={handleDownload}
            >
              Download as CSV
            </span>
          </p>
          <ul>
            {data?.createBin?.map((bin: { text: string; i_id: string }) => {
              return (
                <li key={bin.i_id} className="text-[#eee] my-1">
                  <Link href={`/b/${bin.i_id}`}>
                    {bin.i_id}
                    <span className="mx-2">-</span>
                    <span className="opacity-60">
                      {bin.text.substring(0, 100)} ...
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateBin;
