"use client";

import ContractResults from "./_components/contract-results";
import { useRouter, useParams } from 'next/navigation'; 

export default function ContractPage() {
  const params = useParams();
  const { id } = params;

  return <ContractResults contractId={id} />;
}