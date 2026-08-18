import { ItemResponse } from "../interface/giphyResponse.interface";
import { myGif } from "../interface/myGif.interface";

export class GiffMapper{
  static giphyToGifItem(item: ItemResponse): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyToGifArray(items: ItemResponse[]): myGif[]{
    return items.map(this.giphyToGifItem)
  }
}
