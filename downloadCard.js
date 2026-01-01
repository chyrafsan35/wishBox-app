import { toPng } from 'html-to-image';

export const downloadCard = async () => {
    const card = document.getElementById("export-card");
    if (!card) {
        console.error("Element #export-card not found");
        return;
    }

    try {
        const dataUrl = await toPng(card, { 
            cacheBust: true,
            includeQueryParams: true,
        });

        const link = document.createElement("a");
        link.download = "wish-card.png";
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Download failed:', err);
    }
};