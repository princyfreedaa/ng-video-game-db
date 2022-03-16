export interface Game{
  id: number;
  background_image: string;
  name:string;
  released:string;
  metacriticUrl: string;
  website:string;
  description:string;
  metacritic:string;
  genres:Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  platforms:Array<platforms>;
  publishers: Array<Publisher>;
  ratings:Array<Rating>;
  screenshots:Array<screenshots>;
  trailors:Array<Trailors>;
}
export interface APIResponse<T>{
  results: Array<T>;
}
interface Genre{
  name:string;
}
interface ParentPlatform{
  platform:{
    name:string;
  }

}
interface Publisher{
  name:string;
}
interface Rating{
 id:number;
 count:number;
 title:string;
}
interface screenshots{
  image:string;
}
interface platforms{
  name:string;
}
interface Trailors{
 data:{
   max:string;
 }
}
