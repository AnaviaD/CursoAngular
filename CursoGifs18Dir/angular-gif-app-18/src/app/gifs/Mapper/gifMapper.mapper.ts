import { giphyItem, GiphyResponse } from "../interfaces/giphyResponse.interface";
import { myGif } from "../interfaces/myGif.interface";

export class giphyToGifMapper{
  static giphyItemToGif(item: giphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToGifArray(items: giphyItem[]): myGif[]{
    return items.map(this.giphyItemToGif)
  }
}