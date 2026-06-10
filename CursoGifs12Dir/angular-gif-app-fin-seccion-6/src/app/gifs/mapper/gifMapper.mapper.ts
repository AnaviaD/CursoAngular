import { GiphyItem } from "../interfaces/giphy.interface";
import { myGif } from "../interfaces/myGif.interface";

export class GifMapper{

  static mapGiphyToGif(item: GiphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyItemsToMyGifArray(items: GiphyItem[]): myGif[]{
    return items.map(this.mapGiphyToGif)
  }
}
