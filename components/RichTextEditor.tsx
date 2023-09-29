import { Box } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichTextEditor() {
  return (
    <>
      <Box w='100%'>
        <Editor
          apiKey='lxezcq3kep8iys6wpxrpllmsvoznj9o183sk99ul222heoyk'
          onInit={(evt, editor) =>
            console.log("Editor is ready to use!", editor)
          }
          initialValue={"<p>Deskripsi kan eventmu</p>"}
          // onKeyUp={handleEditorChange}
          // onChange={handleEditorChange}
          // onClick={handleEditorChange}
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