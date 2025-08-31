export interface DocumentFormInterface {
    selectedTemplate: string | null;
    documentName: string;
    applyDigitalSignature: boolean;
}

export const handleGenerateDocument = (form: DocumentFormInterface) => {
    alert(
        "Documents Generation Logic Here, Accepted the form data and displayed in console.",
    );
    console.info(form);
    return;
};
