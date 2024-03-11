export default function useAllowance({ setApproving }: {
    setApproving: any;
}): {
    isApproved: boolean;
    approve: () => Promise<void>;
};
