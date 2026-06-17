import { GiphyItem, GiphyResponse } from "../interfaces/GiphyRes.interface";
import { myGif } from "../interfaces/myGif.iterface";

export class GifMapper{
  static giphyItemToGif(item: GiphyItem): myGif{
    return{
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToGifArray(items: GiphyItem[]): myGif[]{
    return items.map(this.giphyItemToGif)
  }
}
