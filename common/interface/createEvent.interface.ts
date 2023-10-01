import { TicketType } from "@/redux/features/create_event/modalSlice";

export interface IEvent {
  name: string;
  formatId: number;
  topicId: number;
  coverUrl: string;
  isPublic: boolean;
  eventStartDateTime: string;
  eventEndDateTime: string;
  address: string;
  cityId: number;
  provinceId: number;
  latitude: string;
  longitude: string;
  description: string;
  isTermsAndConditions: boolean;
  termAndCondition: string;
  isFullName: boolean;
  isEmail: boolean;
  isPhoneNumber: boolean;
  isIdentityNumber: boolean;
  isDob: boolean;
  isGender: boolean;
  maxPerbuy: number;
  isOneEmailOneTransaction: boolean;
  isOneTicketOneData: boolean;
  eventTickets: {
    name: string;
    description: string;
    type: TicketType.PAID | TicketType.MIN_PRICE | TicketType.FREE;
    price: number;
    quantity: number;
  }[];
}
