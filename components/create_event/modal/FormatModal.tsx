import { IEvent } from "@/common/interface/createEvent.interface";
import { setEvent } from "@/redux/features/create_event/createEventSlice";
import {
  fetchFormats,
  fetchTopics,
} from "@/redux/features/create_event/masterDataSlice";
import { closeFormat } from "@/redux/features/create_event/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
export default function GetFormatModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modalCreateEvent.isOpenFormat
  );
  const event = useSelector((state: RootState) => state.createEvent);
  const masterData = useSelector((state: RootState) => state.masterData);
  const dispatch = useDispatch<AppDispatch>();
  const [formats, setFormats] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isDisabledSave, setIsDisabledSave] = useState<boolean>(true);
  useEffect(() => {
    dispatch(fetchFormats())
      .unwrap()
      .then((res) => {
        setFormats(res.data);
      });
    dispatch(fetchTopics())
      .unwrap()
      .then((res) => {
        setTopics(res.data);
      });
  }, [dispatch]);
  const FormatSchema = Yup.object().shape({
    formatId: Yup.string().required("Format is required"),
    topicId: Yup.string().required("Topic is required"),
  });

  const handleSave = () => {
    const prevEvent = event;
    const newEvent: IEvent = {
      ...prevEvent,
      formatId: parseInt(formik.values.formatId),
      topicId: parseInt(formik.values.topicId),
    };

    dispatch(setEvent(newEvent));
    dispatch(closeFormat());
  };

  const formik = useFormik({
    initialValues: {
      formatId: "",
      topicId: "",
    },
    validationSchema: FormatSchema,
    onSubmit: handleSave,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };
  useEffect(() => {
    if (formik.isValid) {
      setIsDisabledSave(false);
    } else {
      setIsDisabledSave(true);
    }
  }, [formik.isValid]);
  useEffect(() => {
    formik.resetForm();
    if (event.formatId) {
      formik.setFieldValue("formatId", event.formatId.toString());
    }
    if (event.topicId) {
      formik.setFieldValue("topicId", event.topicId.toString());
    }
    setIsDisabledSave(!(event.formatId && event.topicId));
  }, [isOpen]);

  useEffect(() => {
    console.log("debug-formik", formik.values);
  }, []);
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          dispatch(closeFormat());
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader> </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Format</FormLabel>
                <Select
                  name='formatId'
                  placeholder='Pilih Format'
                  tabIndex={1}
                  onChange={handleChange}
                  defaultValue={formik.values.formatId}
                >
                  {masterData.formats.map((format: any) => (
                    <option key={format.id} value={format.id}>
                      {format.name}
                    </option>
                  ))}
                </Select>
                <FormLabel>Topik</FormLabel>
                <Select
                  name='topicId'
                  placeholder='Pilih Topik'
                  tabIndex={2}
                  onChange={handleChange}
                  defaultValue={formik.values.topicId}
                >
                  {masterData.topics.map((topic: any) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </Select>
                <FormLabel>Tags</FormLabel>
                <InputGroup>
                  <InputRightElement cursor={"pointer"}>
                    <BsPlusLg />
                  </InputRightElement>
                  <Input placeholder='Tags' type='text' tabIndex={3} />
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                variant='strongWhite'
                mr={3}
                onClick={() => {
                  dispatch(closeFormat());
                }}
              >
                Batal
              </Button>
              <Button
                name='save'
                isDisabled={isDisabledSave}
                variant='strongBlue'
                type='submit'
              >
                Simpan
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
