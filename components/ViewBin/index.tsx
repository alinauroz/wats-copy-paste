import React from 'react';
import { gql, useQuery } from 'urql';

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
      <div className="flex justify-center items-center h-96">Loading ...</div>
    );
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="">
        <p className="text-white py-2 text-3xl font-semibold mt-10">View Bin</p>
        <div className="my-4 flex justify-center items-center">
          <img
            src={`https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg`}
            className="w-full md:w-4/5"
          />
        </div>
        <div className="my-8">
          <textarea
            disabled
            className="border-none w-full h-96 text-white text-lg rounded-lg p-4 focus:outline-[#0f3955] focus:border-none bg-[#0f3955]"
            placeholder={data?.bin?.text}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewBin;
