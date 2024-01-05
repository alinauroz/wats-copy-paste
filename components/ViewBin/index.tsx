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
      <div className="h-96 bg-gray-200 rounded mt-10 p-4">
        {data?.bin?.text}
      </div>
    </div>
  );
}

export default ViewBin;
