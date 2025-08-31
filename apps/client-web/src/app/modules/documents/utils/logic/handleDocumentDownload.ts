import { DocumentInterface } from "../dummyDocuments";

export const handleDocumentDownload = (
    id: number,
    data: DocumentInterface[],
    setLoadingIds: React.Dispatch<React.SetStateAction<Set<number>>>,
) => {
    const doc = data.find((d) => d.id === id);
    if (!doc) return;

    alert(`Downloading ${doc.name}`);

    setLoadingIds((prev) => new Set(prev).add(id));

    // Simulate async download
    setTimeout(() => {
        setLoadingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, 2000);
};
