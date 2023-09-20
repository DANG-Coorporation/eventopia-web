import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { removeNote, selectNotes } from "@/app/redux/noteState/noteSlice";

const HomePage = (): JSX.Element => {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const deleteNote = (noteId: string) => {
    dispatch(removeNote(noteId));
  };

  const renderNotes = notes.map((note) => (
    <div
      key={note.id}
      style={{
        margin: "10px",
      }}
    >
      <h1>{note.heading}</h1>
      <p>{note.content}</p>
      <button
        onClick={() => deleteNote(note.id)}
        style={{
          border: "1px solid black",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        Delete Note
      </button>
    </div>
  ));

  return <div>{renderNotes}</div>;
};

export default HomePage;
