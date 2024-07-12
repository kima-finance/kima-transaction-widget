export default function useAllowance({ setApproving }: {
    setApproving: any;
}): {
    isApproved: boolean;
    poolAddress: string;
    approve: () => Promise<void>;
};
