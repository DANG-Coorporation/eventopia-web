import { Box } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";

interface IRichTextEditor {
  onChange: (content: string) => void;
  initialValue: string;
}

export default function RichTextEditor(props: IRichTextEditor) {
  return (
    <>
      <Box w='100%'>
        <Editor
          apiKey='lxezcq3kep8iys6wpxrpllmsvoznj9o183sk99ul222heoyk'
          onInit={(_, editor) => {
            console.info("Editor is ready to use!", editor);
          }}
          initialValue={props.initialValue}
          onKeyUp={(_, editor) => {
            props.onChange(editor.getContent());
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Box>
    </>
  );
}
