"use client";

import { IEvent } from "@/common/interface/createEvent.interface";
import { setEvent } from "@/redux/features/create_event/createEventSlice";
import {
  fetchCities,
  fetchProvinces,
} from "@/redux/features/create_event/masterDataSlice";
import { closeLocation } from "@/redux/features/create_event/modalSlice";
import { fetchAddressSuggestions } from "@/redux/features/open_street_map/openStreetMapSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import lodash from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import * as Yup from "yup";

export default function GetLocationModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modalCreateEvent.isOpenLocation
  );
  const masterData = useSelector((state: RootState) => state.masterData);
  const event = useSelector((state: RootState) => state.createEvent);
  const addressSuggestion = useSelector(
    (state: RootState) => state.openStreetMap.data
  );
  const dispatch = useDispatch<AppDispatch>();
  const OpenStreetMapLoaderNoSSR = useMemo(
    () =>
      dynamic(() => import("@/components/openStreetMap/OpenStreetMap"), {
        ssr: false,
      }),
    []
  );
  const [isListItemClicked, setIsListItemClicked] = useState(false);
  const [currentAddressEvent, setCurrentAddressEvent] = useState("change");

  const LocationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    cityId: Yup.string().required("City is required"),
    provinceId: Yup.string().required("Province is required"),
    latitude: Yup.string().required("Latitude is required"),
    longitude: Yup.string().required("Longitude is required"),
  });

  const handleSave = () => {
    const prevEvent = event;
    const newEvent: IEvent = {
      ...prevEvent,
      address: formik.values.address,
      cityId: parseInt(formik.values.cityId),
      provinceId: parseInt(formik.values.provinceId),
      latitude: formik.values.latitude,
      longitude: formik.values.longitude,
    };
    dispatch(setEvent(newEvent));
    dispatch(closeLocation());
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      cityId: "",
      provinceId: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: LocationSchema,
    onSubmit: handleSave,
  });

  const [addressValue] = useDebounce(formik.values.address, 1000);

  useEffect(() => {
    dispatch(fetchProvinces());
    formik.setFieldValue("cityId", "");
  }, []);

  useEffect(() => {
    if (currentAddressEvent === "click") return;
    dispatch(fetchAddressSuggestions(addressValue));
    setIsListItemClicked(false);
  }, [addressValue]);

  const getAddressSuggestions = () => {
    if (addressSuggestion.length > 0)
      return addressSuggestion.map((address: any) => {
        return (
          <ListItem
            key={address.place_id}
            id={address.place_id}
            value={address.place_id}
            p={2}
            bgColor={"white"}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={(e) => handleSuggestionClick(e.currentTarget.value)}
          >
            <Text>{address.display_name}</Text>
          </ListItem>
        );
      });
    else return null;
  };

  const getProvinces = () => {
    return masterData.provinces.map((province) => {
      return (
        <option key={province.id} value={province.id}>
          {province.name}
        </option>
      );
    });
  };

  const getCities = () => {
    if (masterData.cities.length > 0) {
      return masterData.cities.map((city) => {
        return (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        );
      });
    } else {
      return null;
    }
  };

  const handleChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    formik.setFieldValue("cityId", "");
    formik.setFieldValue("provinceId", e.target.value);
    dispatch(fetchCities(parseInt(e.target.value)));
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    formik.setFieldValue("cityId", e.target.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    setCurrentAddressEvent("change");
  };

  const handleSuggestionClick = (placeId: any) => {
    const addressObj = lodash.find(addressSuggestion, {
      place_id: placeId,
    }) as any;
    formik.setFieldValue("address", addressObj.display_name);
    formik.setFieldValue("latitude", addressObj.lat);
    formik.setFieldValue("longitude", addressObj.lon);

    const prevEvent = event;
    const newEvent: IEvent = {
      ...prevEvent,
      latitude: addressObj.lat,
      longitude: addressObj.lon,
    };

    dispatch(setEvent(newEvent));

    setIsListItemClicked(true);
    setCurrentAddressEvent("click");
  };

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          dispatch(closeLocation());
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader> </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl my={2}>
                <FormLabel>Nama Alamat</FormLabel>
                <Input
                  placeholder='Nama Alamat'
                  type='text'
                  tabIndex={1}
                  onChange={handleChangeInput}
                />

                <FormLabel>Provinsi</FormLabel>
                <Select
                  placeholder='Pilih Lokasi'
                  tabIndex={2}
                  onChange={handleChangeProvince}
                >
                  {getProvinces()}
                </Select>
                <FormLabel>Kota/Kabupaten</FormLabel>
                <Select
                  placeholder='Pilih Lokasi'
                  tabIndex={3}
                  onChange={handleChangeCity}
                >
                  {getCities()}
                </Select>
                <FormLabel>Lokasi</FormLabel>
                <Input
                  name='address'
                  placeholder='Masukkan Lokasi'
                  type='text'
                  tabIndex={4}
                  value={formik.values.address}
                  onChange={handleChangeInput}
                />
                <div
                  style={{ position: "relative", zIndex: 90, width: "400px" }}
                >
                  {addressSuggestion.length > 0 && !isListItemClicked && (
                    <List
                      mt={2}
                      borderWidth='1px'
                      borderColor='gray.200'
                      borderRadius='md'
                      height={"fit-content"}
                      style={{
                        position: "absolute",
                        display: "block",
                        top: "100%",
                        zIndex: 90,
                      }}
                    >
                      {getAddressSuggestions()}
                    </List>
                  )}
                </div>
              </FormControl>
            </ModalBody>
            <Box height={"300px"}>
              <OpenStreetMapLoaderNoSSR />
            </Box>
            <ModalFooter>
              <Button
                tabIndex={5}
                variant={"strongWhite"}
                colorScheme='blue'
                mr={3}
                onClick={() => {
                  dispatch(closeLocation());
                }}
              >
                Batal
              </Button>
              <VStack gap={0}>
                <Button variant='strongBlue' tabIndex={4} type='submit'>
                  Simpan
                </Button>
              </VStack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
