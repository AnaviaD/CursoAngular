import { itemResponse } from "../interface/giphyResponse.interface";
import { myGif } from "../interface/myGif.interface";

export class giphyMapper{
  static giphyItemToGif(item: itemResponse):myGif{
    return{
      id:     item.id,
      title:  item.title,
      url:    item.images.original.url
    }
  }

  static giphyArrayToGif(items: itemResponse[]):myGif[]{
    return items.map(this.giphyItemToGif)
  }
}
