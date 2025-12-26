type LabelText = {
  label: string;
  text: string;
};

export function LabelText({ label, text }: LabelText) {
  return (
    <p>
      <span className="font-bold">{label}: </span>

      {text}
    </p>
  );
}
