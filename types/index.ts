export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISlider {
  dots: boolean;
  arrows: boolean;
  className: string;
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  swipeToSlide: boolean;
  centerMode: boolean;
  speed: number;
  currentSlide: number;
  focusOnSelect: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  nextArrow: any;
  prevArrow: any;
  customPaging: any;
  beforeChange: any;
  responsive: any[];
}
