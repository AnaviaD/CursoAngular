import { ItemResponse } from "../Interface/GiphyResponse.interface";
import { myGif } from "../Interface/myGif.interface";

export class giphyMapper{
  static GiphyItemToGif(item: ItemResponse): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static GiphyArrayToGifArray(items: ItemResponse[]): myGif[]{
    return items.map(this.GiphyItemToGif)
  }
}
