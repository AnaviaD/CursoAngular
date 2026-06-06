import { GiphyItem } from "../interfaces/giphy.interfaces";
import { myGif } from "../interfaces/myGif.interfaces";

export class GifMapper{
  static mapGiphyItemToGif(item: GiphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyArrayToGifArray(items: GiphyItem[]): myGif[]
  {
    return items.map(this.mapGiphyItemToGif)
  }
}
