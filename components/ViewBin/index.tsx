import React from 'react';
import { gql, useQuery } from 'urql';
import Linkify from 'react-linkify';

const GET_BIN = gql`
  query Query($binId: ID!) {
    bin(id: $binId) {
      createdOn
      i_id
      id
      text
    }
  }
`;

function ViewBin({ binId }: { binId: string }) {
  const [{ fetching, data }] = useQuery({
    query: GET_BIN,
    variables: {
      binId: binId,
    },
  });

  React.useEffect(() => {
    document.title = 'View Bin';
    (window as any).atOptions = {
      key: '1831de1efd564c07fa4da4f551a48208',
      format: 'iframe',
      height: 60,
      width: 468,
      params: {},
    };
    const adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.async = true;
    adScript.src =
      '//doomdefender.com/1831de1efd564c07fa4da4f551a48208/invoke.js';
    const container = document.getElementById('ad-container');
    document.body;
    container?.appendChild(adScript);
    return () => {
      document.body;
      container?.removeChild(adScript);
    };
  }, [fetching]);

  if (fetching) {
    return (
      <div className="flex justify-center text-[#eee] items-center h-96 text-white font-bold">
        Loading ...
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="">
        <div
          className="my-8 flex justify-center items-center"
          id="ad-container"
        ></div>
        <div className="whitespace-pre-wrap w-full min-h-[400px] text-[#eee] text-lg my-8 rounded-lg p-4 bg-[#262626]">
          <WatsLinkify text={data?.bin?.text} />
        </div>
      </div>
    </div>
  );
}

export default ViewBin;

export function WatsLinkify({ text }: { text: string }) {
  return (
    <Linkify
      componentDecorator={(
        decoratedHref: any,
        decoratedText: any,
        key: any
      ) => {
        return (
          <a
            href={decoratedHref}
            key={key}
            target="_blank"
            className="text-[#3366CC] underline"
          >
            {decoratedText}
          </a>
        );
      }}
    >
      {text}
    </Linkify>
  );
}
