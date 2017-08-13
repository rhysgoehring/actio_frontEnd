const TEXT_LIMIT = 116;


export default function truncateText(text){
  let limit = TEXT_LIMIT;
  if(text.length > limit){
    while(text[limit] !== ' '){
      limit --;
    }
    let res = text.slice(0,limit) + '...';
    return res
  }
  return text;
}
