// Document type
export type Document = {
    id: number;
    name: string;
    type: string;
    version: number;
    uploadedBy: string;
    uploadedDate: string;
    uploadedTime: string;
};

const fileTypes = ["PDF", "DOCX", "XLSX", "PPTX", "TXT"];
const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Hank",
];
const words = [
    "Report",
    "Design",
    "Budget",
    "Meeting",
    "Plan",
    "Presentation",
    "Proposal",
    "Summary",
];

// 🔹 deterministic pseudo-random (same seed → same sequence)
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function seededInt(seed: number, min: number, max: number) {
    return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

function formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

function formatTime(date: Date): string {
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${min}`;
}

export function generateDummyDocuments(count: number): Document[] {
    return Array.from({ length: count }, (_, i) => {
        const type = fileTypes[i % fileTypes.length];
        const extension = type.toLowerCase();
        const created = new Date(
            Date.now() - seededInt(i + 1, 0, 15) * 24 * 60 * 60 * 1000,
        );

        // add seeded hours + minutes
        const hours = seededInt(i * 2 + 7, 0, 23);
        const minutes = seededInt(i * 3 + 11, 0, 59);

        created.setHours(hours, minutes, 0, 0);

        return {
            id: i + 1,
            name: `${words[i % words.length]}-${i + 1}.${extension}`,
            type,
            version: seededInt(i + 1, 1, 5),
            uploadedBy: firstNames[i % firstNames.length],
            uploadedDate: formatDate(created),
            uploadedTime: formatTime(created),
        };
    });
}

export const dummyDocuments = generateDummyDocuments(20);
