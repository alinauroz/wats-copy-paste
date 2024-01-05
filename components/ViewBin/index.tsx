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
        <input
          className="border-none text-white w-full text-lg rounded-lg p-4 focus:outline-[#0f3955] focus:border-none bg-[#0f3955] mb-2"
          placeholder="Add sample ad here"
        />
        <textarea
          disabled
          // rows={15}
          // cols={120}
          className="border-none w-full h-96 text-white text-lg rounded-lg p-4 focus:outline-[#0f3955] focus:border-none bg-[#0f3955]"
          // className='lg:w-[1000px] h-[200px] border-none text-white rounded-lg p-3 focus:outline-[#0f3955] focus:border-none bg-[#0f3955]'
          placeholder={data?.bin?.text}
        />
      </div>

      {/* <div className="h-96 bg-[#0f3955] text-white rounded mt-10 p-4">
        {data?.bin?.text}
      </div> */}
    </div>
  );
}

export default ViewBin;
