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
  React.useEffect(() => {
    document.title = 'View Bin';
  });

  const [{ fetching, data }] = useQuery({
    query: GET_BIN,
    variables: {
      binId: binId,
    },
  });

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-96 text-white font-bold">
        Loading ...
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="">
        <div className="my-8 flex justify-center items-center">
          <img
            src={`https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg`}
            className="w-full md:w-4/5"
          />
        </div>
        <div className="w-full h-96 text-white text-lg my-8 rounded-lg p-4 bg-[#0f3955]">
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
