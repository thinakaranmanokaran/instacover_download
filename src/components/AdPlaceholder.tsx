interface AdPlaceholderProps {
  label: string;
}

const AdPlaceholder = ({ label }: AdPlaceholderProps) => (
  <div className="w-full flex items-center justify-center py-3">
    <div className="w-full max-w-3xl h-[90px] rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center">
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  </div>
);

export default AdPlaceholder;
