import technologies from './technologiesType';

type UserType={
    id:string,
    name:string,
    username:string,
    technologies:technologies[]
}
const user=[] as UserType[];
export  {UserType,user};