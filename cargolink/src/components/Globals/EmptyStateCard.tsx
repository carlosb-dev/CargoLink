type EmptyCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
  onButtonClick?: () => void;
};

function EmptyStateCard({
  title,
  description,
  buttonLabel,
  href,
  onButtonClick,
}: EmptyCardProps) {
  const sharedClasses =
    "inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400 transition";

  return (
    <div className="p-6 flex flex-col items-center justify-center text-center space-y-3">
      <p className="text-base font-semibold text-slate-200">{title}</p>
      <p className="text-sm text-slate-400">{description}</p>
      {href ? (
        <a href={href} className={sharedClasses}>
          {buttonLabel}
        </a>
      ) : (
        <button
          type="button"
          onClick={onButtonClick}
          className={sharedClasses}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyStateCard;
