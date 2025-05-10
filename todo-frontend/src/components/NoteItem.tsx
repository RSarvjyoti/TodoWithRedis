type Props = {
  text: string;
};

const NoteItem = ({ text }: Props) => {
  return (
    <div className="text-sm px-2 py-1 border-b border-gray-200 text-gray-800">
      {text}
    </div>
  );
};

export default NoteItem;