import { GiphyItem, GiphyResponse } from "../interfaces/giphy.interface";
import { myGif } from "../interfaces/myGif.interface";

export class GiffMapper{
  static giphyItemToGfItem(item: GiphyItem): myGif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyArrayToGifArray(items: GiphyItem[]):myGif[]{
    return items.map(this.giphyItemToGfItem)
  }
}
