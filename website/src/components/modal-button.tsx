export function ModalButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
