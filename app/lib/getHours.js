import dayjs from '../components/dayjs';

export default function getHours(){
	return dayjs().hour();
}