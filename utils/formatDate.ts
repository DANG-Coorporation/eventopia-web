import moment from 'moment';

const formatDate = (date: string) => {
  const isToday = moment(date).isSame(moment(), 'day');
  const isTomorrow = moment(date).isSame(moment().add(1, 'day'), 'day');
  const isYesterday = moment(date).isSame(moment().subtract(1, 'day'), 'day');

  if (isToday) {
    return `Today at ${moment(date).format('h:mm a')}`;
  } else if (isTomorrow) {
    return `Tomorrow at ${moment(date).format('h:mm a')}`;
  } else if (isYesterday) {
    return `Yesterday at ${moment(date).format('h:mm a')}`;
  } else {
    return moment(date).format('lll');
  }
};

export default formatDate;
