import type { FilePreviewType } from './FilePreviewType';
type CardWithDeleteOverlayProps = {
    item: FilePreviewType;
    disabled?: boolean;
    onDelete: (item: FilePreviewType) => void;
};
export declare const FilePreview: (props: CardWithDeleteOverlayProps) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=FilePreview.d.ts.map