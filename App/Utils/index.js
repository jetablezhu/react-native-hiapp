export function getRemoteAvatar(id) {
  return `https://loremflickr.com/70/70/people?lock=${id}`
}
export function convertJsonObj(data){
	Object.keys(data).forEach(k=>{
		if(data[k]==null)
			 data[k]="";
	});
}
