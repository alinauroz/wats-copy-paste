'use client';

import ViewBin from '@/components/ViewBin';

function Page({ params }: { params: { binId: string } }) {
  return <ViewBin binId={params.binId} />;
}

export default Page;
