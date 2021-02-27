export default function SubmitButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <button className={`submit-button ${className}`} type="submit">
      {text}
    </button>
  );
}
